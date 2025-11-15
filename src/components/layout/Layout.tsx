import React from "react";
import { useNavigation } from "@/hooks/useNavigation";
import { useModal } from "@/hooks/useModal";
import { Navigation } from "@/components/navigation/Navigation";
import { HomeTab } from "@/components/tabs/HomeTab";
import { AboutTab } from "@/components/tabs/AboutTab";
import { ProjectsTab } from "@/components/tabs/ProjectsTab";
import { DemosTab } from "@/components/tabs/DemosTab";
import { TradingTab } from "@/components/tabs/TradingTab";
import { PhotographyTab } from "@/components/tabs/PhotographyTab";
import { ContactTab } from "@/components/tabs/ContactTab";
import { ArchModal, ArchModalContent } from "@/components/modal/ArchModal";
import { ProjectItem } from "@/components/SectionCards";
import Particles from "@/components/Particles";
import ConfidentialFooter from "@/components/ConfidentialFooter";

export const Layout: React.FC = () => {
  const { activeTab, mobileMenuOpen, setMobileMenuOpen, openTab } = useNavigation();
  const { modalState, openModal, closeModal } = useModal();

  const handleProjectClick = async (item: ProjectItem) => {
    if (item.architecture) {
      try {
        const res = await fetch(item.architecture);
        const text = await res.text();
        openModal(item.title + " — Architecture", text);
      } catch (error) {
        console.error("Failed to load architecture document:", error);
      }
    } else if (item.url) {
      window.open(item.url, "_blank");
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "home":
        return <HomeTab openTab={openTab} />;
      case "about":
        return <AboutTab openTab={openTab} />;
      case "projects":
        return <ProjectsTab openTab={openTab} onProjectClick={handleProjectClick} />;
      case "demos":
        return <DemosTab openTab={openTab} />;
      case "trading":
        return <TradingTab openTab={openTab} />;
      case "photography":
        return <PhotographyTab openTab={openTab} />;
      case "contact":
        return <ContactTab openTab={openTab} />;
      default:
        return <HomeTab openTab={openTab} />;
    }
  };

  return (
    <main className="relative min-h-screen">
      <Particles />

      <Navigation
        activeTab={activeTab}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        openTab={openTab}
      />

      {/* Main Content Area */}
      <div className={`min-h-screen px-4 sm:px-6 py-8 sm:py-12 max-w-7xl mx-auto ${activeTab !== "home" ? "pt-24 sm:pt-28" : ""}`}>
        {renderTabContent()}
      </div>

      {/* Architecture Modal */}
      {modalState?.open && (
        <ArchModal
          open={modalState.open}
          title={modalState.title}
          onClose={closeModal}
        >
          <ArchModalContent content={modalState.content} />
        </ArchModal>
      )}

      <ConfidentialFooter />
    </main>
  );
};