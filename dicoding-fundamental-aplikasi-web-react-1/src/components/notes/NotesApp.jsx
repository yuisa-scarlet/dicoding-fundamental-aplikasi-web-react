import Tabs from "../ui/tabs";
import { NoteActiveList } from "./NoteActiveList";
import { NoteArchiveList } from "./NoteArchiveList";
import { useLanguage } from "../../hooks/useLanguage";

import "./NotesApp.css";

export default function NotesApp({
  notes,
  onDelete,
  onArchive,
  loading,
  error,
  searchTerm = "",
  onSearchChange,
  activeTab = "active",
  onTabChange,
}) {
  const { t } = useLanguage();

  const tabs = [
    {
      label: t("activeNotes"),
      content: (
        <NoteActiveList
          notes={notes}
          onDelete={onDelete}
          onArchive={onArchive}
          searchTerm={searchTerm}
          onSearchChange={onSearchChange}
          loading={loading}
        />
      ),
    },
    {
      label: t("archive"),
      content: (
        <NoteArchiveList
          notes={notes}
          onDelete={onDelete}
          onArchive={onArchive}
          searchTerm={searchTerm}
          onSearchChange={onSearchChange}
          loading={loading}
        />
      ),
    },
  ];

  const activeTabIndex = activeTab === "archive" ? 1 : 0;

  const handleTabChange = (index) => {
    const tabName = index === 1 ? "archive" : "active";
    if (onTabChange) {
      onTabChange(tabName);
    }
  };

  return (
    <div className="notes-app">
      <h1>{t("notesApp")}</h1>

      {error && (
        <div className="error-banner">
          <p>Error: {error}</p>
        </div>
      )}

      <div className="notes-container">
        <Tabs
          tabs={tabs}
          defaultActiveTab={activeTabIndex}
          activeTab={activeTabIndex}
          onTabChange={handleTabChange}
        />
      </div>
    </div>
  );
}
