import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./NotesList.module.css";

const API_URL = "http://127.0.0.1:8000/api/notes/";

function NoteDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", content: "" });

  useEffect(() => {
    fetch(`${API_URL}${id}/`)
      .then((res) => res.json())
      .then((data) => setForm({ title: data.title, content: data.content }))
      .catch((err) => console.error("Fehler beim Laden", err));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_URL}${id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      if (res.ok) {
        navigate("/notes");
      } else {
        const error = await res.json();
        console.error("Fehler beim Aktualisieren:", error);
      }
    } catch {
      console.error("Netzwerkfehler", err);
    }
  };

  const deleteNote = async () => {
    try {
      const res = await fetch(`${API_URL}${id}/`, {
        method: "DELETE"
      });

      if (res.ok) {
        navigate("/notes");
      } else {
        console.error("Löschen fehlgeschlagen");
      }
    } catch (err) {
      console.error("Fehler beim Löschen:", err);
    }
  };

  return (
    <div className={styles.list}>
    <h1 className={styles.title}>Notiz bearbeiten</h1>

    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Titel"
        required
      />
      <textarea
        name="content"
        value={form.content}
        onChange={handleChange}
        placeholder="Inhalt"
        required
        rows="6"
      />
      <button type="submit">Aktualisieren</button>
      <button type="button" onClick={deleteNote}>Löschen</button>
    </form>
  </div>
  );
}

export default NoteDetail;
