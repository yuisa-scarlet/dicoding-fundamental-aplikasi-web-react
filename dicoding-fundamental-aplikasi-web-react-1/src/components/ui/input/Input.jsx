import styles from "./Input.module.css";

export default function Input({
  type = "text",
  placeholder = "",
  value = "",
  title = "",
  required = false,
  onChange,
  ...props
}) {
  return (
    <div className={`${styles["input-group"]}`}>
        <label className={`${styles.label}`}>
            {title} {required && <span className={styles.required}>*</span>}
        </label>
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`${styles.input}`}
            required={required}
            {...props}
        />
    </div>
  );
}