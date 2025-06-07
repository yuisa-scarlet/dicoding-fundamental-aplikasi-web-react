import Tabs from "../ui/tabs";
import { NoteActiveList } from "./NoteActiveList";
import { NoteArchiveList } from "./NoteArchiveList";

import "./NotesApp.css";

export default function NotesApp({ notes, onDelete, onArchive }) {
  const tabs = [
    {
      label: "Catatan Aktif",
      content: (
        <NoteActiveList
          notes={notes}
          onDelete={onDelete}
          onArchive={onArchive}
        />
      ),
    },
    {
      label: "Arsip",
      content: (
        <NoteArchiveList
          notes={notes}
          onDelete={onDelete}
          onArchive={onArchive}
        />
      ),
    },
  ];

  return (
    <div className="notes-app">
      <h1>Notes App</h1>
      <div className="notes-container">
        <Tabs tabs={tabs} />
      </div>
    </div>
  );
}
