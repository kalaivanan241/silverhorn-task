import React from "react";
import styles from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={styles.loader}>
      <i className="fa fa-spinner" aria-hidden="true"></i>
    </div>
  );
};

export default Loader;
