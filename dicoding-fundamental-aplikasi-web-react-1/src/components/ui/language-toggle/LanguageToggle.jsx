import { useLanguage } from "../../../hooks/useLanguage";
import styles from "./LanguageToggle.module.css";

export function LanguageToggle() {
  const { language, changeLanguage, t } = useLanguage();

  const handleLanguageChange = () => {
    const newLanguage = language === "id" ? "en" : "id";
    changeLanguage(newLanguage);
  };

  return (
    <button
      className={styles.languageToggle}
      onClick={handleLanguageChange}
      title={t("language")}
      aria-label={t("language")}
    >
      <span className={styles.languageIcon}>🌐</span>
      <span className={styles.languageText}>
        {language === "id" ? "EN" : "ID"}
      </span>
    </button>
  );
}
