import { useState, useEffect } from "react";
import styles from "./NotesList.module.css";
import { Link } from "react-router-dom";

const API_URL = "http://127.0.0.1:8000/api/notes/";

function NotesList() {
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({ title: "", content: "" });

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      data.reverse();
      setNotes(data);
    } catch (err) {
      console.error("Fehler beim Laden der Notizen:", err);
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();
      if (res.ok) {
        setNotes((prev) => [data, ...prev]);
      } else {
        console.error("Fehlerhafte API-Antwort", data);
      }

      // Formular zurücksetzen
      setForm({ title: "", content: "" });
      setEditingId(null);
    } catch (err) {
      console.error("Fehler beim Speicher:", err);
    }
  }

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  return (
    <div className={styles.list}>
      <h1 className={styles.title}>Notizen ({notes.length})</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Titel"
        />
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          placeholder="Inhalt"
          rows="4"
        />
        <button type="submit">Erstellen</button>
      </form>

      <div className={styles.cards}>
        {notes.map((note) => (
          <Link to={`/notes/${note.id}`}>
            <div key={note.id} className={styles.card}>
              <h3>{note.title}</h3>
              <p>{note.content}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default NotesList;
