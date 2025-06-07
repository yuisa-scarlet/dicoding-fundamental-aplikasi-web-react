import styles from "./Modal.module.css";

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = "medium",
}) {
  if (!isOpen) return null;

  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles["modal-overlay"]} onClick={handleOverlay}>
      <div className={`${styles["modal-content"]} ${styles[`modal-${size}`]}`}>
        <div className={styles["modal-header"]}>
          <h2>{title}</h2>
          <button className={styles["modal-close"]} onClick={onClose}>
            &times;
          </button>
        </div>
        <div className={styles["modal-body"]}>{children}</div>
      </div>
    </div>
  );
}
