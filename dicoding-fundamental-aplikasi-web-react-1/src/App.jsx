import "./App.css";

import NotesApp from "./components/notes/NotesApp";
import NoteForm from "./components/notes/NoteForm";
import Modal from "./components/ui/modal";
import Sidebar from "./components/sidebar";

import { useState } from "react";
import { useNotes } from "./hooks/useNotes";
import { useAuth } from "./hooks/useAuth";

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    activeNotes,
    archivedNotes,
    loading,
    error,
    addNote,
    deleteNote,
    archiveNote,
    unarchiveNote,
  } = useNotes();
  const { isAuthenticated } = useAuth();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const submitNote = async (note) => {
    const result = await addNote({
      title: note.title,
      body: note.description,
    });

    if (result.success) {
      setIsModalOpen(false);
    }
  };

  const handleDeleteNote = async (id) => {
    await deleteNote(id);
  };

  const handleArchiveNote = async (id) => {
    const isInActive = activeNotes.some((note) => note.id === id);
    const isInArchived = archivedNotes.some((note) => note.id === id);

    if (isInActive) {
      await archiveNote(id);
    } else if (isInArchived) {
      await unarchiveNote(id);
    }
  };

  const allNotes = [...activeNotes, ...archivedNotes];

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="app">
      <Sidebar onOpenModal={handleOpenModal} />
      <NotesApp
        notes={allNotes}
        onDelete={handleDeleteNote}
        onArchive={handleArchiveNote}
        loading={loading}
        error={error}
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
