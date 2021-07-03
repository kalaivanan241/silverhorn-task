import React from "react";
import styles from "./DeleteUndoMessage.module.css";

const DeleteUndoMessage = ({ handleUndo, setShow }) => {
  React.useEffect(() => {
    const st = setTimeout(() => {
      setShow(false);
    }, 5000);
    return () => {
      clearTimeout(st);
    };
  }, [setShow]);

  return (
    <>
      <div className={styles.deletedMessage}>
        Deleted todo &nbsp; &nbsp;
        <button onClick={handleUndo}>undo</button>
      </div>
    </>
  );
};

export default DeleteUndoMessage;
