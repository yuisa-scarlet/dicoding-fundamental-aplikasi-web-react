import Tabs from "../ui/tabs";
import { NoteActiveList } from "./NoteActiveList";
import { NoteArchiveList } from "./NoteArchiveList";

import "./NotesApp.css";

export default function NotesApp({
  notes,
  onDelete,
  onArchive,
  searchTerm = "",
  onSearchChange,
  activeTab = "active",
  onTabChange,
}) {
  const tabs = [
    {
      label: "Catatan Aktif",
      content: (
        <NoteActiveList
          notes={notes}
          onDelete={onDelete}
          onArchive={onArchive}
          searchTerm={searchTerm}
          onSearchChange={onSearchChange}
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
          searchTerm={searchTerm}
          onSearchChange={onSearchChange}
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
      <h1>Notes App</h1>
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
