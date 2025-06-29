import { useState, useEffect, useCallback } from "react";
import {
  getActiveNotes,
  getArchivedNotes,
  getNote,
  addNote as apiAddNote,
  deleteNote as apiDeleteNote,
  archiveNote as apiArchiveNote,
  unarchiveNote as apiUnarchiveNote,
} from "../utils/notes-manager";

export const useNotes = () => {
  const [activeNotes, setActiveNotes] = useState([]);
  const [archivedNotes, setArchivedNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchActiveNotes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getActiveNotes();
      if (!result.error) {
        setActiveNotes(result.data);
      } else {
        setError("Failed to fetch active notes");
      }
    } catch (err) {
      setError("Failed to fetch active notes");
      console.error("Error fetching active notes:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchArchivedNotes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getArchivedNotes();
      if (!result.error) {
        setArchivedNotes(result.data);
      } else {
        setError("Failed to fetch archived notes");
      }
    } catch (err) {
      setError("Failed to fetch archived notes");
      console.error("Error fetching archived notes:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchAllNotes = useCallback(async () => {
    await Promise.all([fetchActiveNotes(), fetchArchivedNotes()]);
  }, [fetchActiveNotes, fetchArchivedNotes]);

  const addNote = useCallback(
    async (noteData) => {
      setLoading(true);
      setError(null);
      try {
        const result = await apiAddNote(noteData);
        if (!result.error) {
          await fetchActiveNotes();
          return { success: true, data: result.data };
        } else {
          setError("Failed to add note");
          return { success: false };
        }
      } catch (err) {
        setError("Failed to add note");
        console.error("Error adding note:", err);
        return { success: false };
      } finally {
        setLoading(false);
      }
    },
    [fetchActiveNotes]
  );

  const deleteNote = useCallback(
    async (id) => {
      setLoading(true);
      setError(null);
      try {
        const result = await apiDeleteNote(id);
        if (!result.error) {
          await fetchAllNotes();
          return { success: true };
        } else {
          setError("Failed to delete note");
          return { success: false };
        }
      } catch (err) {
        setError("Failed to delete note");
        console.error("Error deleting note:", err);
        return { success: false };
      } finally {
        setLoading(false);
      }
    },
    [fetchAllNotes]
  );

  const archiveNote = useCallback(
    async (id) => {
      setLoading(true);
      setError(null);
      try {
        const result = await apiArchiveNote(id);
        if (!result.error) {
          await fetchAllNotes();
          return { success: true };
        } else {
          setError("Failed to archive note");
          return { success: false };
        }
      } catch (err) {
        setError("Failed to archive note");
        console.error("Error archiving note:", err);
        return { success: false };
      } finally {
        setLoading(false);
      }
    },
    [fetchAllNotes]
  );

  const unarchiveNote = useCallback(
    async (id) => {
      setLoading(true);
      setError(null);
      try {
        const result = await apiUnarchiveNote(id);
        if (!result.error) {
          await fetchAllNotes();
          return { success: true };
        } else {
          setError("Failed to unarchive note");
          return { success: false };
        }
      } catch (err) {
        setError("Failed to unarchive note");
        console.error("Error unarchiving note:", err);
        return { success: false };
      } finally {
        setLoading(false);
      }
    },
    [fetchAllNotes]
  );

  const getNoteById = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const result = await getNote(id);
      if (!result.error) {
        return { success: true, data: result.data };
      } else {
        setError("Failed to fetch note");
        return { success: false, data: null };
      }
    } catch (err) {
      setError("Failed to fetch note");
      console.error("Error fetching note:", err);
      return { success: false, data: null };
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllNotes();
  }, [fetchAllNotes]);

  return {
    activeNotes,
    archivedNotes,
    loading,
    error,
    addNote,
    deleteNote,
    archiveNote,
    unarchiveNote,
    getNoteById,
    refreshNotes: fetchAllNotes,
    refreshActiveNotes: fetchActiveNotes,
    refreshArchivedNotes: fetchArchivedNotes,
  };
};
