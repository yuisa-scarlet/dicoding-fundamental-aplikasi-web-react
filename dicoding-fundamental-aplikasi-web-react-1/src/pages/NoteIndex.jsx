import NotesApp from "../components/notes/NotesApp";
import NoteForm from "../components/notes/NoteForm";
import Modal from "../components/ui/modal";
import Sidebar from "../components/sidebar";
import { useState, useMemo } from "react";
import { useSearchParams } from "react-router";
import { useLanguage } from "../hooks/useLanguage";
import { useNotes } from "../hooks/useNotes";
import "../App.css";

export default function NoteIndex() {
  const {
    activeNotes,
    archivedNotes,
    addNote,
    deleteNote,
    archiveNote,
    unarchiveNote,
    loading,
    error,
  } = useNotes();

  const { t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const notes = useMemo(() => {
    return [
      ...activeNotes.map((note) => ({ ...note, archived: false })),
      ...archivedNotes.map((note) => ({ ...note, archived: true })),
    ];
  }, [activeNotes, archivedNotes]);

  const searchTerm = searchParams.get("search") || "";
  const activeTab =
    searchParams.get("tab") === "archive" ? "archive" : "active";

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const onSubmitNote = async (noteData) => {
    const result = await addNote(noteData);
    if (result.success) {
      setIsModalOpen(false);
    }
  };

  const handleDeleteNote = async (id) => {
    await deleteNote(id);
  };

  const handleArchiveNote = async (id) => {
    const isArchived = archivedNotes.some((note) => note.id === id);

    if (isArchived) {
      await unarchiveNote(id);
    } else {
      await archiveNote(id);
    }
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="app">
      <Sidebar onOpenModal={handleOpenModal} />
      <NotesApp
        notes={notes}
        onDelete={handleDeleteNote}
        onArchive={handleArchiveNote}
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={t("createNote")}
        size="medium"
      >
        <NoteForm onSubmit={onSubmitNote} onClose={handleCloseModal} />
      </Modal>
    </div>
  );
}
