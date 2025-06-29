import Button from "../ui/button";
import Input from "../ui/input";
import Textarea from "../ui/textarea/Textarea";
import { useLanguage } from "../../hooks/useLanguage";
import "./NoteForm.css";
import { useState } from "react";

export default function NoteForm({ onSubmit, onCancel }) {
  const { t } = useLanguage();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const maxTitleLength = 50;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() && body.trim()) {
      onSubmit({ title: title.trim(), body: body.trim() });
    }
  };

  const handleReset = () => {
    setTitle("");
    setBody("");
    if (onCancel) onCancel();
  };

  const handleTitleLength = (e) => {
    const inputTitle = e.target.value;
    if (inputTitle.length <= maxTitleLength) {
      setTitle(inputTitle);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="note-form">
        <div className="input-wrapper">
          <Input
            title={t("title")}
            placeholder={t("titlePlaceholder")}
            value={title}
            onChange={handleTitleLength}
            required
          />
          <div className="note-form__title-length">
            <span
              className={`note-form__title-length--${
                title.length >= maxTitleLength ? "error" : "normal"
              }`}
            >
              {title.length}/{maxTitleLength}
            </span>
          </div>
        </div>
        <Textarea
          title={t("description")}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder={t("descriptionPlaceholder")}
          required
        />
        <div className="note-form__actions">
          <Button type="submit">{t("saveNote")}</Button>
          <Button type="button" variant="secondary" onClick={handleReset}>
            {t("reset")}
          </Button>
        </div>
      </div>
    </form>
  );
}
