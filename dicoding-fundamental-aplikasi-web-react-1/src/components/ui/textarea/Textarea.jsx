import styles from "./Textarea.module.css";

export default function Textarea({
  placeholder = "",
  value = "",
  title = "",
  required = false,
  onChange,
  ...props
}) {
  return (
    <div className={`${styles["textarea-group"]}`}>
        <label className={`${styles.label}`}>
            {title} {required && <span className={styles.required}>*</span>}
        </label>
        <textarea
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`${styles.textarea}`}
            required={required}
            {...props}
        />
    </div>
  );
}