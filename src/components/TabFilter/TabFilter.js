import React from "react";
import styles from "./TabFilter.module.css";

const TabFilter = ({ tabs, activeTab, onTabClick }) => {
  return (
    <div className={styles.tabFilter}>
      {tabs.map((tab) => (
        <div
          className={`${styles.filterItem} ${
            tab === activeTab ? styles.filterActive : ""
          }`}
          key={tab}
          onClick={() => onTabClick(tab)}
        >
          {tab}
        </div>
      ))}
    </div>
  );
};

export default TabFilter;
