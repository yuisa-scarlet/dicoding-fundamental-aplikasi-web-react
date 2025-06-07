import "./NoteItem.css";
import { showFormattedDate } from "../../utils/format-date";
import Button from "../ui/button";

export default function NoteItem({ note, onClick, onDelete, onArchive }) {
  const handleClick = () => {
    if (onClick) {
      onClick(note.id);
    }
  };

  const handleDelete = () => {
    onDelete(note.id);
  };

  const handleArchive = () => {
    onArchive(note.id);
  };

  return (
    <li className="note-item" onClick={handleClick}>
      <h2 className="note-title">{note.title}</h2>
      <p className="note-body">{note.body}</p>
      <p className="note-date">{showFormattedDate(note.createdAt)}</p>
      <div className="note-item__actions">
        <Button onClick={handleDelete} variant="danger">
          Hapus
        </Button>
        <Button onClick={handleArchive} variant="secondary">
          {note.archived ? "Aktifkan" : "Arsipkan"}
        </Button>
      </div>
    </li>
  );
}
