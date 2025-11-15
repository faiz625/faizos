import { useState, useEffect } from "react";

export type TabType = "home" | "about" | "projects" | "demos" | "trading" | "photography" | "contact";

export const useNavigation = () => {
  const [activeTab, setActiveTab] = useState<TabType>("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle initial hash and browser navigation
  useEffect(() => {
    const getTabFromHash = (): TabType => {
      const hash = window.location.hash.slice(1); // Remove the '#'
      const validTabs: TabType[] = ["home", "about", "projects", "demos", "trading", "photography", "contact"];
      return validTabs.includes(hash as TabType) ? (hash as TabType) : "home";
    };

    // Set initial tab based on URL hash
    setActiveTab(getTabFromHash());

    // Listen for hash changes (browser back/forward)
    const handleHashChange = () => {
      setActiveTab(getTabFromHash());
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const openTab = (tabKey: TabType) => {
    setActiveTab(tabKey);
    setMobileMenuOpen(false); // Close mobile menu when navigating
    // Update URL hash
    if (tabKey === "home") {
      window.history.pushState(null, "", window.location.pathname);
    } else {
      window.history.pushState(null, "", `#${tabKey}`);
    }
  };

  return {
    activeTab,
    mobileMenuOpen,
    setMobileMenuOpen,
    openTab,
  };
};