declare module 'sql.js' {
  export default function initSqlJs(config?: any): Promise<SqlJsStatic>;
  
  export interface SqlJsStatic {
    Database: typeof Database;
  }
  
  export class Database {
    constructor(data?: Uint8Array);
    run(sql: string, params?: any[]): QueryResults[];
    exec(sql: string): QueryResults[];
    export(): Uint8Array;
    close(): void;
    prepare(sql: string): Statement;
  }
  
  export interface Statement {
    step(): boolean;
    get(params?: any[]): any[];
    getAsObject(params?: any[]): any;
    bind(values?: any[]): boolean;
    reset(): void;
    freemem(): void;
  }
  
  export interface QueryResults {
    columns: string[];
    values: any[][];
  }
}