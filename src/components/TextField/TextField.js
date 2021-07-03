import React from "react";
import styles from "./TextField.module.css";

const TextField = ({
  label,
  errorMessage,
  name,
  onChange,
  value,
  ...others
}) => {
  return (
    <div className={styles.textField}>
      {label && <label className={styles.textFieldLabel}>{label}</label>}
      <input
        name={name}
        className={styles.inputField}
        onChange={onChange}
        value={value}
        {...others}
      />
      {errorMessage && (
        <div className={styles.errorMessage}>{errorMessage}</div>
      )}
    </div>
  );
};

export default TextField;
