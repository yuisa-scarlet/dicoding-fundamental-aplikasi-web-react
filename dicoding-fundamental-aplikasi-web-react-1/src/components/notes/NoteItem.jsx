import "./NoteItem.css";
import { showFormattedDate } from "../../utils/format-date";
import { useLanguage } from "../../hooks/useLanguage";
import Button from "../ui/button";
import { useNavigate } from "react-router";

export default function NoteItem({ note, onDelete, onArchive }) {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleClick = (e) => {
    if (e.target.closest(".note-item__actions")) {
      return;
    }

    navigate(`/notes/${note.id}`);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(note.id);
  };

  const handleArchive = (e) => {
    e.stopPropagation();
    onArchive(note.id);
  };

  return (
    <li className="note-item" onClick={handleClick}>
      <h2 className="note-title">{note.title}</h2>
      <p className="note-body">{note.body}</p>
      <p className="note-date">{showFormattedDate(note.createdAt)}</p>
      <div className="note-item__actions">
        <Button onClick={handleDelete} variant="danger">
          {t("delete")}
        </Button>
        <Button onClick={handleArchive} variant="secondary">
          {note.archived ? t("unarchive") : t("archive")}
        </Button>
      </div>
    </li>
  );
}
