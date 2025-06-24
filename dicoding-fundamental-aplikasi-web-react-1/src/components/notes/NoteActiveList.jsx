import NoteItem from "./NoteItem";
import Input from "../ui/input";

export function NoteActiveList({
  notes,
  onDelete,
  onArchive,
  searchTerm = "",
  onSearchChange,
}) {
  const activeNotes = notes.filter((note) => !note.archived);

  const filteredNotes = activeNotes.filter((note) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (event) => {
    if (onSearchChange) {
      onSearchChange(event.target.value);
    }
  };

  if (activeNotes.length === 0) {
    return (
      <div>
        <p>Tidak memiliki catatan aktif</p>
      </div>
    );
  }

  return (
    <>
      <Input
        placeholder="Cari catatan aktif"
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
            <p>Tidak ada catatan yang sesuai dengan pencarian "{searchTerm}"</p>
          </li>
        )}
      </ul>
    </>
  );
}
