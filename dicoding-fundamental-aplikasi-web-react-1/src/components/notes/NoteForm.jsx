import Button from "../ui/button";
import Input from "../ui/input";
import Textarea from "../ui/textarea/Textarea";
import "./NoteForm.css";
import { useState } from "react";

export default function NoteForm({ onSubmit, onCancel }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const maxTitleLength = 50;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() && description.trim()) {
      onSubmit({ title: title.trim(), description: description.trim() });
    }
  };

  const handleReset = () => {
    setTitle("");
    setDescription("");
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
            title="Judul"
            placeholder="Judul catatanmu"
            value={title}
            onChange={handleTitleLength}
            required
          />
          <div className="note-form__title-length">
            <span className={`note-form__title-length--${title.length >= maxTitleLength ? 'error' : 'normal'}`}>
              {title.length}/{maxTitleLength}
            </span>
          </div>
        </div>
        <Textarea
          title="Deskripsi"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Jelaskan catatanmu disini!"
          required
        />
        <div className="note-form__actions">
          <Button type="submit">Simpan Catatan</Button>
          <Button type="button" variant="secondary" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </div>
    </form>
  );
}
