import { useState } from "react";

export const useSkillsToggle = () => {
  const [showAllLanguages, setShowAllLanguages] = useState(false);
  const [showAllDataEng, setShowAllDataEng] = useState(false);
  const [showAllMLAI, setShowAllMLAI] = useState(false);
  const [showAllDevTools, setShowAllDevTools] = useState(false);

  return {
    showAllLanguages,
    setShowAllLanguages,
    showAllDataEng,
    setShowAllDataEng,
    showAllMLAI,
    setShowAllMLAI,
    showAllDevTools,
    setShowAllDevTools,
  };
};