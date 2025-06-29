import { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext();

const translations = {
  id: {
    notesApp: "Aplikasi Catatan",
    createNote: "Buat Catatan Baru",
    activeNotes: "Catatan Aktif",
    archive: "Arsip",
    search: "Cari",
    searchActiveNotes: "Cari catatan aktif",
    searchArchive: "Cari arsip",
    back: "Kembali",

    title: "Judul",
    description: "Deskripsi",
    titlePlaceholder: "Judul catatanmu",
    descriptionPlaceholder: "Jelaskan catatanmu disini!",
    saveNote: "Simpan Catatan",
    reset: "Reset",

    delete: "Hapus",
    unarchive: "Aktifkan",
    
    noActiveNotes: "Tidak memiliki catatan aktif",
    noArchivedNotes: "Tidak memiliki arsip catatan",
    noSearchResults: "Tidak ada catatan yang sesuai dengan pencarian",
    noteNotFound: "Catatan yang Anda cari tidak ditemukan.",
    backToHome: "Kembali ke Beranda",
    loadingNote: "Memuat catatan...",
    createdOn: "Dibuat pada:",
    archived: "Diarsipkan",
    
    login: "Masuk",
    register: "Daftar",
    logout: "Keluar",
    email: "Email",
    password: "Kata Sandi",
    name: "Nama",
    confirmPassword: "Konfirmasi Kata Sandi",

    language: "Bahasa",
    indonesian: "Bahasa Indonesia",
    english: "English",
  },
  en: {
    notesApp: "Notes App",
    createNote: "Create New Note",
    activeNotes: "Active Notes",
    archive: "Archive",
    search: "Search",
    searchActiveNotes: "Search active notes",
    searchArchive: "Search archive",
    back: "Back",
    
    title: "Title",
    description: "Description",
    titlePlaceholder: "Your note title",
    descriptionPlaceholder: "Describe your note here!",
    saveNote: "Save Note",
    reset: "Reset",

    delete: "Delete",
    unarchive: "Activate",

    noActiveNotes: "No active notes",
    noArchivedNotes: "No archived notes",
    noSearchResults: "No notes match your search",
    noteNotFound: "The note you are looking for was not found.",
    backToHome: "Back to Home",
    loadingNote: "Loading note...",
    createdOn: "Created on:",
    archived: "Archived",

    login: "Login",
    register: "Register",
    logout: "Logout",
    email: "Email",
    password: "Password",
    name: "Name",
    confirmPassword: "Confirm Password",

    language: "Language",
    indonesian: "Bahasa Indonesia",
    english: "English",
  },
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("language") || "id";
  });

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
  };

  const t = (key) => {
    return translations[language][key] || key;
  };

  const value = {
    language,
    changeLanguage,
    t,
    translations: translations[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
