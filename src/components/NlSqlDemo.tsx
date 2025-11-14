"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import initSqlJs, { Database, SqlJsStatic } from "sql.js";

// ---------- helpers ----------
type Row = Record<string, any>;
function rowsToCSV(rows: Row[]) {
  if (!rows.length) return "";
  const headers = Object.keys(rows[0]);
  const lines = [headers.join(",")];
  for (const r of rows) {
    lines.push(headers.map((h) => JSON.stringify(r[h] ?? "").replace(/^"|"$/g, "")).join(","));
  }
  return lines.join("\n");
}
function download(name: string, content: string, mime = "text/csv") {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = name; a.click();
  URL.revokeObjectURL(url);
}

// ---------- NL -> SQL (rule-based, expandable) ----------
function parseNLToSQL(nl: string): string {
  const p = nl.toLowerCase().trim();

  // date filters
  const lastN = p.match(/last\s+(\d+)\s*(day|days|week|weeks|month|months)/);
  const topN = p.match(/top\s+(\d+)/);

  // base intents
  if (p.includes("top") && (p.includes("customers") || p.includes("clients"))) {
    const n = topN ? Number(topN[1]) : 10;
    // optional time window
    if (lastN) {
      const nNum = Number(lastN[1]);
      const unit = lastN[2].startsWith("day")
        ? "days"
        : lastN[2].startsWith("week")
        ? "weeks"
        : "months";
      return `
        WITH window AS (
          SELECT date('now', '-${nNum} ${unit}') AS start_date
        )
        SELECT c.customer_id, c.name, ROUND(SUM(oi.quantity*oi.unit_price),2) AS revenue
        FROM orders o
        JOIN order_items oi ON oi.order_id = o.order_id
        JOIN customers c ON c.customer_id = o.customer_id, window
        WHERE o.created_at >= window.start_date
        GROUP BY 1,2
        ORDER BY revenue DESC
        LIMIT ${n};
      `.trim();
    }
    return `
      SELECT c.customer_id, c.name, ROUND(SUM(oi.quantity*oi.unit_price),2) AS revenue
      FROM orders o
      JOIN order_items oi ON oi.order_id = o.order_id
      JOIN customers c ON c.customer_id = o.customer_id
      GROUP BY 1,2
      ORDER BY revenue DESC
      LIMIT ${n};
    `.trim();
  }

  if (p.includes("orders") && (p.includes("last") || p.includes("recent"))) {
    if (lastN) {
      const nNum = Number(lastN[1]);
      const unit = lastN[2].startsWith("day")
        ? "days"
        : lastN[2].startsWith("week")
        ? "weeks"
        : "months";
      return `
        WITH window AS (
          SELECT date('now', '-${nNum} ${unit}') AS start_date
        )
        SELECT o.order_id, o.created_at, c.name AS customer, ROUND(SUM(oi.quantity*oi.unit_price),2) AS total
        FROM orders o
        JOIN order_items oi ON oi.order_id = o.order_id
        JOIN customers c ON c.customer_id = o.customer_id, window
        WHERE o.created_at >= window.start_date
        GROUP BY 1,2,3
        ORDER BY o.created_at DESC;
      `.trim();
    }
  }

  if (p.includes("revenue by") && (p.includes("product") || p.includes("category"))) {
    if (p.includes("category")) {
      return `
        SELECT i.category, ROUND(SUM(oi.quantity*oi.unit_price),2) AS revenue
        FROM order_items oi
        JOIN items i ON i.item_id = oi.item_id
        GROUP BY 1
        ORDER BY revenue DESC;
      `.trim();
    }
    return `
      SELECT i.name AS product, ROUND(SUM(oi.quantity*oi.unit_price),2) AS revenue
      FROM order_items oi
      JOIN items i ON i.item_id = oi.item_id
      GROUP BY 1
      ORDER BY revenue DESC;
    `.trim();
  }

  if (p.includes("average order value") || p.includes("aov")) {
    return `
      WITH order_totals AS (
        SELECT o.order_id, SUM(oi.quantity*oi.unit_price) AS total
        FROM orders o
        JOIN order_items oi ON oi.order_id = o.order_id
        GROUP BY 1
      )
      SELECT ROUND(AVG(total),2) AS avg_order_value FROM order_totals;
    `.trim();
  }

  // default passthrough for users who type raw SQL
  if (p.startsWith("select") || p.startsWith("with")) return nl;

  // generic fallback
  return `
    -- Couldn't confidently parse prompt. Showing template:
    SELECT *
    FROM orders
    LIMIT 50;
  `.trim();
}

// ---------- component ----------
export default function NlSqlDemo() {
  const [sqljs, setSqljs] = useState<SqlJsStatic | null>(null);
  const dbRef = useRef<Database | null>(null);

  const [prompt, setPrompt] = useState("");
  const [sql, setSql] = useState("");
  const [rows, setRows] = useState<Row[]>([]);
  const [error, setError] = useState<string | null>(null);

  // init sql.js and seed a tiny dataset
  useEffect(() => {
    (async () => {
      const SQL = await initSqlJs({
        locateFile: (f: string) => `/sql-wasm.wasm`,
      });
      setSqljs(SQL);
      const db = new SQL.Database();
      dbRef.current = db;

      db.run(`
        PRAGMA foreign_keys = ON;

        CREATE TABLE customers(
          customer_id INTEGER PRIMARY KEY,
          name TEXT,
          region TEXT
        );

        CREATE TABLE orders(
          order_id INTEGER PRIMARY KEY,
          customer_id INTEGER,
          created_at TEXT,
          FOREIGN KEY(customer_id) REFERENCES customers(customer_id)
        );

        CREATE TABLE items(
          item_id INTEGER PRIMARY KEY,
          name TEXT,
          category TEXT
        );

        CREATE TABLE order_items(
          order_id INTEGER,
          item_id INTEGER,
          quantity INTEGER,
          unit_price REAL,
          FOREIGN KEY(order_id) REFERENCES orders(order_id),
          FOREIGN KEY(item_id) REFERENCES items(item_id)
        );
      `);

      // seed data
      const customers = [
        [1, "Aster Labs", "ON"],
        [2, "Nimbus Retail", "BC"],
        [3, "Polar Foods", "QC"],
        [4, "Vector Media", "AB"],
        [5, "Harbor Tech", "ON"],
      ];
      const items = [
        [1, "Widget Alpha", "Hardware"],
        [2, "Widget Beta", "Hardware"],
        [3, "Data Pro Plan", "Subscription"],
        [4, "Support Plus", "Service"],
      ];
      const orders = [
        [101, 1, "2025-10-25"],
        [102, 1, "2025-11-01"],
        [103, 2, "2025-10-28"],
        [104, 3, "2025-10-31"],
        [105, 4, "2025-11-03"],
        [106, 5, "2025-11-05"],
        [107, 2, "2025-11-09"],
      ];
      const orderItems = [
        [101, 1, 2, 199.99],
        [101, 4, 1, 99.0],
        [102, 3, 1, 499.0],
        [103, 2, 3, 149.0],
        [104, 1, 1, 199.99],
        [104, 3, 1, 499.0],
        [105, 4, 2, 99.0],
        [106, 2, 1, 149.0],
        [106, 3, 1, 499.0],
        [107, 1, 5, 199.99],
      ];

      const insert = (stmt: string, data: any[][]) => {
        const s = db.prepare(stmt);
        db.run("BEGIN");
        for (const row of data) s.run(row);
        db.run("COMMIT");
        s.free();
      };

      insert("INSERT INTO customers VALUES (?, ?, ?);", customers);
      insert("INSERT INTO items VALUES (?, ?, ?);", items);
      insert("INSERT INTO orders VALUES (?, ?, ?);", orders);
      insert("INSERT INTO order_items VALUES (?, ?, ?, ?);", orderItems);
    })();
  }, []);

  // derive SQL as user types
  const parsedSQL = useMemo(() => parseNLToSQL(prompt), [prompt]);

  const run = () => {
    setError(null);
    setSql(parsedSQL);
    try {
      const db = dbRef.current;
      if (!db) throw new Error("DB not ready yet. Try again in a second.");
      const res = db.exec(parsedSQL);
      if (!res.length) { setRows([]); return; }
      const { columns, values } = res[0];
      const out = values.map(v => {
        const r: Row = {};
        columns.forEach((c, i) => r[c] = v[i]);
        return r;
      });
      setRows(out);
    } catch (e: any) {
      setRows([]);
      setError(e?.message || String(e));
    }
  };

  const copySQL = async () => {
    await navigator.clipboard.writeText(parsedSQL);
    alert("SQL copied!");
  };
  const exportCSV = () => {
    if (!rows.length) return alert("No rows to export.");
    download("query_results.csv", rowsToCSV(rows));
  };

  return (
    <div className="space-y-3 text-sm">
      <div>
        <label className="block mb-2 font-medium text-gray-800 dark:text-white">Describe your query</label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder='e.g., "top 10 customers by revenue in the last 30 days"'
          className="w-full h-24 rounded-lg bg-gray-100 dark:bg-white/5 border border-gray-300 dark:border-white/10 p-2 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-white/50"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="font-medium text-gray-800 dark:text-white">SQL (editable)</span>
          <div className="flex gap-2">
            <button onClick={copySQL} className="px-3 py-1 rounded bg-gray-200 dark:bg-white/10 border border-gray-300 dark:border-white/10 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-white/15">Copy SQL</button>
            <button onClick={run} className="px-3 py-1 rounded bg-gray-200 dark:bg-white/10 border border-gray-300 dark:border-white/10 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-white/15">Run</button>
          </div>
        </div>
        <textarea
          value={parsedSQL}
          readOnly
          className="w-full h-28 rounded-lg bg-gray-100 dark:bg-black/60 border border-gray-300 dark:border-white/10 p-2 font-mono text-xs text-gray-900 dark:text-white"
        />
      </div>

      {error && <div className="text-red-300 text-xs">Error: {error}</div>}

      <div className="border-t border-white/10 pt-3">
        <div className="flex items-center justify-between">
          <span className="font-medium text-gray-800 dark:text-white">Results</span>
          <button onClick={exportCSV} className="px-3 py-1 rounded bg-gray-200 dark:bg-white/10 border border-gray-300 dark:border-white/10 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-white/15">Export CSV</button>
        </div>
        {!rows.length ? (
          <div className="text-gray-600 dark:text-white/60 mt-2">No results yet. Run a query.</div>
        ) : (
          <div className="overflow-auto mt-2">
            <table className="min-w-full text-xs">
              <thead className="bg-gray-200 dark:bg-white/5">
                <tr>
                  {Object.keys(rows[0]).map((h) => (
                    <th key={h} className="text-left px-2 py-1 border-b border-gray-300 dark:border-white/10 text-gray-800 dark:text-white">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i} className="odd:bg-gray-100 dark:odd:bg-white/5">
                    {Object.keys(rows[0]).map((h) => (
                      <td key={h} className="px-2 py-1 border-b border-gray-300 dark:border-white/10 text-gray-900 dark:text-white">{String(r[h])}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="text-gray-600 dark:text-white/60 text-xs mt-2">
          Demo note: data is synthetic; employer/client confidentiality preserved.
        </div>
      </div>
    </div>
  );
}
