import "./App.css";

import NotesApp from "./components/notes/NotesApp";
import NoteForm from "./components/notes/NoteForm";
import Modal from "./components/ui/modal";
import Sidebar from "./components/sidebar";

import { useState } from "react";
import { getInitialData } from "./utils/initial-data";
import { generateId } from "./utils/generate-id";

export default function App() {
  const [notes, setNotes] = useState(() => getInitialData());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const submitNote = (note) => {
    const newNote = {
      id: generateId(),
      title: note.title,
      body: note.description,
      archived: false,
      createdAt: new Date().toISOString(),
    };
    setNotes([newNote, ...notes]);
    setIsModalOpen(false);
  };

  const handleDeleteNote = (id) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  const handleArchiveNote = (id) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, archived: !note.archived } : note
      )
    );
  };

  return (
    <div className="app">
      <Sidebar onOpenModal={handleOpenModal} />
      <NotesApp
        notes={notes}
        onDelete={handleDeleteNote}
        onArchive={handleArchiveNote}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Buat Catatan Baru"
        size="medium"
      >
        <NoteForm onSubmit={submitNote} onClose={handleCloseModal} />
      </Modal>
    </div>
  );
}
