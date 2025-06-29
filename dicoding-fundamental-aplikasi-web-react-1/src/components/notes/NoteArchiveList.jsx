import "./NoteList.css";
import NoteItem from "./NoteItem";
import Input from "../ui/input";
import { useLanguage } from "../../hooks/useLanguage";

export function NoteArchiveList({
  notes = [],
  onDelete,
  onArchive,
  searchTerm = "",
  onSearchChange,
}) {
  const { t } = useLanguage();

  const safeNotes = Array.isArray(notes) ? notes : [];
  const archivedNotes = safeNotes.filter((note) => note.archived);

  const filteredNotes = archivedNotes.filter(
    (note) =>
      note.title && note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (event) => {
    if (onSearchChange) {
      onSearchChange(event.target.value);
    }
  };

  if (archivedNotes.length === 0) {
    return (
      <div>
        <p>{t("noArchivedNotes")}</p>
      </div>
    );
  }

  return (
    <>
      <Input
        placeholder={t("searchArchive")}
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <ul className="note-list">
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note) => (
            <NoteItem
              key={note.id}
              note={note}
              onDelete={onDelete}
              onArchive={onArchive}
            />
          ))
        ) : (
          <li>
            <p>
              {t("noSearchResults")} "{searchTerm}"
            </p>
          </li>
        )}
      </ul>
    </>
  );
}
