import NoteItem from "./NoteItem";
import Input from "../ui/input";
import { useLanguage } from "../../hooks/useLanguage";

export function NoteActiveList({
  notes = [],
  onDelete,
  onArchive,
  searchTerm = "",
  onSearchChange,
}) {
  const { t } = useLanguage();

  const safeNotes = Array.isArray(notes) ? notes : [];
  const activeNotes = safeNotes.filter((note) => !note.archived);

  const filteredNotes = activeNotes.filter(
    (note) =>
      note.title && note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (event) => {
    if (onSearchChange) {
      onSearchChange(event.target.value);
    }
  };

  if (activeNotes.length === 0) {
    return (
      <div>
        <p>{t("noActiveNotes")}</p>
      </div>
    );
  }

  return (
    <>
      <Input
        placeholder={t("searchActiveNotes")}
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
