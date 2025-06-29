import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { showFormattedDate } from "../utils/format-date";
import { useLanguage } from "../hooks/useLanguage";
import Button from "../components/ui/button";
import { useNotes } from "../hooks/useNotes";

export default function NoteDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getNoteById } = useNotes();
  const { t } = useLanguage();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNote = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await getNoteById(id);
        if (result.success) {
          setNote(result.data);
        } else {
          setError("Note not found");
        }
      } catch (err) {
        setError("Failed to load note");
        console.error("Error fetching note:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchNote();
    }
  }, [id, getNoteById]);

  const handleBackToHome = () => {
    navigate("/");
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>{t("loadingNote")}</p>
        </div>
      </div>
    );
  }

  if (error || !note) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h1>Note Not Found</h1>
        <p>{t("noteNotFound")}</p>
        <Button onClick={handleBackToHome}>{t("backToHome")}</Button>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "800px",
        margin: "0 auto",
        backgroundColor: "var(--color-background)",
        color: "var(--color-text-primary)",
        minHeight: "100vh",
      }}
    >
      <div style={{ marginBottom: "20px" }}>
        <Button onClick={handleBackToHome} variant="secondary">
          ← {t("back")}
        </Button>
      </div>

      <article>
        <header
          style={{
            marginBottom: "20px",
            borderBottom: "1px solid var(--color-border)",
            paddingBottom: "15px",
          }}
        >
          <h1
            style={{
              fontSize: "2rem",
              marginBottom: "10px",
              color: "var(--color-text-primary)",
            }}
          >
            {note.title}
          </h1>
          <p
            style={{
              color: "var(--color-text-secondary)",
              fontSize: "0.9rem",
            }}
          >
            {t("createdOn")}: {showFormattedDate(note.createdAt)}
          </p>
          {note.archived && (
            <span
              style={{
                backgroundColor: "var(--color-warning-light)",
                color: "var(--color-warning)",
                padding: "4px 8px",
                borderRadius: "4px",
                fontSize: "0.8rem",
                border: "1px solid var(--color-warning)",
              }}
            >
              {t("archived")}
            </span>
          )}
        </header>

        <div
          style={{
            lineHeight: "1.6",
            fontSize: "1.1rem",
            color: "var(--color-text-primary)",
          }}
        >
          <p style={{ whiteSpace: "pre-wrap" }}>{note.body}</p>
        </div>
      </article>
    </div>
  );
}
