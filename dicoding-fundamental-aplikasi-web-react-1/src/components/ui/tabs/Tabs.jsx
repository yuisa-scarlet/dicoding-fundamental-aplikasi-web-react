import styles from "./Tabs.module.css";

import { useState, useEffect } from "react";

export function Tabs({ tabs, defaultActiveTab = 0, onTabChange, activeTab }) {
  const [internalActiveTab, setInternalActiveTab] = useState(defaultActiveTab);

  const currentActiveTab =
    activeTab !== undefined ? activeTab : internalActiveTab;

  useEffect(() => {
    if (activeTab === undefined) {
      setInternalActiveTab(defaultActiveTab);
    }
  }, [defaultActiveTab, activeTab]);

  const handleTabClick = (index) => {
    if (activeTab === undefined) {
      setInternalActiveTab(index);
    }
    if (onTabChange) {
      onTabChange(index, tabs[index]);
    }
  };

  return (
    <div className={`${styles.tabs}`}>
      <div className={`${styles["tabs-header"]}`}>
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`${styles["tab-button"]} ${
              currentActiveTab === index ? styles.active : ""
            }`}
            onClick={() => handleTabClick(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className={styles["tabs-content"]}>
        {tabs[currentActiveTab] && tabs[currentActiveTab].content}
      </div>
    </div>
  );
}
