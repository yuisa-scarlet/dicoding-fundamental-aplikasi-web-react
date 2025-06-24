import { useParams, useNavigate } from "react-router";
import { showFormattedDate } from "../utils/format-date";
import Button from "../components/ui/button";
import { getNoteById } from "../utils/notes-manager";

export default function NoteDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const note = getNoteById(id);

  const handleBackToHome = () => {
    navigate("/");
  };

  if (!note) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h1>Note Not Found</h1>
        <p>Catatan yang Anda cari tidak ditemukan.</p>
        <Button onClick={handleBackToHome}>Kembali ke Beranda</Button>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <div style={{ marginBottom: "20px" }}>
        <Button onClick={handleBackToHome} variant="secondary">
          ← Kembali
        </Button>
      </div>

      <article>
        <header
          style={{
            marginBottom: "20px",
            borderBottom: "1px solid #eee",
            paddingBottom: "15px",
          }}
        >
          <h1 style={{ fontSize: "2rem", marginBottom: "10px", color: "#333" }}>
            {note.title}
          </h1>
          <p style={{ color: "#666", fontSize: "0.9rem" }}>
            Dibuat pada: {showFormattedDate(note.createdAt)}
          </p>
          {note.archived && (
            <span
              style={{
                backgroundColor: "#f0f0f0",
                padding: "4px 8px",
                borderRadius: "4px",
                fontSize: "0.8rem",
                color: "#666",
              }}
            >
              Diarsipkan
            </span>
          )}
        </header>

        <div style={{ lineHeight: "1.6", fontSize: "1.1rem", color: "#444" }}>
          <p style={{ whiteSpace: "pre-wrap" }}>{note.body}</p>
        </div>
      </article>
    </div>
  );
}
