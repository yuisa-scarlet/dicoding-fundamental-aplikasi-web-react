import React from "react";
import { getInitialData } from "./initial-data";
import { generateId } from "./generate-id";

let notesData = getInitialData();
let listeners = [];

export const subscribeToNotes = (callback) => {
  listeners.push(callback);
  return () => {
    listeners = listeners.filter((listener) => listener !== callback);
  };
};

const notifyListeners = () => {
  listeners.forEach((callback) => callback(notesData));
};

// GET all notes
export const getNotes = () => {
  return notesData;
};

// GET single note by id
export const getNoteById = (id) => {
  return notesData.find((note) => note.id == id);
};

// POST new note
export const addNote = (noteData) => {
  const newNote = {
    id: generateId(),
    title: noteData.title,
    body: noteData.description,
    archived: false,
    createdAt: new Date().toISOString(),
  };
  notesData = [newNote, ...notesData];
  notifyListeners();
  return newNote;
};

// DELETE note
export const deleteNote = (id) => {
  notesData = notesData.filter((note) => note.id != id);
  notifyListeners();
};

export const toggleArchiveNote = (id) => {
  notesData = notesData.map((note) =>
    note.id == id ? { ...note, archived: !note.archived } : note
  );
  notifyListeners();
};

// HOOK auto-refresh notes
export const useNotes = () => {
  const [notes, setNotes] = React.useState(getNotes);

  React.useEffect(() => {
    const unsubscribe = subscribeToNotes(setNotes);
    return unsubscribe;
  }, []);

  return {
    notes,
    addNote,
    deleteNote,
    toggleArchiveNote,
    getNoteById,
  };
};
