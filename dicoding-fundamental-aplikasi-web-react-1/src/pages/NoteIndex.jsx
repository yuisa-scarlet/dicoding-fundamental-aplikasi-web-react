import NotesApp from "../components/notes/NotesApp";
import NoteForm from "../components/notes/NoteForm";
import Modal from "../components/ui/modal";
import Sidebar from "../components/sidebar";
import { useState } from "react";
import { useSearchParams } from "react-router";
import { useNotes } from "../utils/notes-manager";
import "../App.css";

export default function NoteIndex() {
  const { notes, addNote, deleteNote, toggleArchiveNote } = useNotes();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const searchTerm = searchParams.get("search") || "";
  const activeTab =
    searchParams.get("tab") === "archive" ? "archive" : "active";

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const onSubmitNote = (note) => {
    addNote(note);
    setIsModalOpen(false);
  };

  const handleSearchChange = (newSearchTerm) => {
    const newParams = new URLSearchParams(searchParams);
    if (newSearchTerm.trim()) {
      newParams.set("search", newSearchTerm);
    } else {
      newParams.delete("search");
    }
    setSearchParams(newParams);
  };

  const handleTabChange = (tab) => {
    const newParams = new URLSearchParams(searchParams);
    if (tab === "archive") {
      newParams.set("tab", "archive");
    } else {
      newParams.delete("tab");
    }
    setSearchParams(newParams);
  };

  return (
    <div className="app">
      <Sidebar onOpenModal={handleOpenModal} />
      <NotesApp
        notes={notes}
        onDelete={deleteNote}
        onArchive={toggleArchiveNote}
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Buat Catatan Baru"
        size="medium"
      >
        <NoteForm onSubmit={onSubmitNote} onClose={handleCloseModal} />
      </Modal>
    </div>
  );
}
