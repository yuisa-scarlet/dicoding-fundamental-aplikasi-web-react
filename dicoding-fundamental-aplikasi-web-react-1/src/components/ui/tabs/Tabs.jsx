import styles from "./Tabs.module.css";

import { useState } from "react";

export function Tabs({ tabs, defaultActiveTab = 0, onTabChange }) {
  const [activeTab, setActiveTab] = useState(defaultActiveTab);

  const handleTabClick = (index) => {
    setActiveTab(index);
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
              activeTab === index ? styles.active : ""
            }`}
            onClick={() => handleTabClick(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className={styles["tabs-content"]}>
        {tabs[activeTab] && tabs[activeTab].content}
      </div>
    </div>
  );
}
