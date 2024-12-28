import React, { useState, useEffect } from "react";
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";

const NoteApp = () => {
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "catatan"), orderBy("date", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setNotes(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const addNote = async () => {
    if (content.trim()) {
      try {
        await addDoc(collection(db, "catatan"), {
          content,
          date: new Date(),
        });
        setContent("");
      } catch (error) {
        console.error("Error adding note:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center py-8">
      <h1 className="text-4xl font-bold mb-6 text-gray-800 font-handwriting">
        My Notes
      </h1>
      <div className="mb-6 w-full max-w-lg bg-paper bg-cover bg-no-repeat p-4 rounded-lg shadow-lg">
        <textarea
          className="w-full h-32 p-4 border border-dashed rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500 font-handwriting text-gray-800 bg-transparent placeholder:text-[#6b4423]"
          placeholder="Write your note here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{
            backgroundImage:
              "linear-gradient(to bottom, rgba(255, 255, 255, 0.7) 50%, rgba(255, 255, 255, 0) 50%)",
            backgroundSize: "100% 2.5rem",
          }}
        />
        <button
          className="mt-3 w-full px-4 py-2 bg-[#6b4423] text-white rounded-lg shadow hover:bg-[#5a3820] font-handwriting"
          onClick={addNote}
        >
          Send
        </button>
      </div>
      <div className="w-full max-w-lg grid grid-cols-2 gap-4">
        {notes.map((note) => (
          <div
            key={note.id}
            className="flex flex-col justify-between items-center p-4 border border-gray-300 bg-paper bg-cover rounded-lg shadow relative text-center"
            style={{
              minHeight: "auto", // Tinggi minimum
              height: "auto", // Penyesuaian otomatis
            }}
          >
            <p className="text-gray-800 font-handwriting text-lg">
              {note.content}
            </p>
            <span className="text-xs text-gray-500 font-sans mt-2">
              {new Date(note.date.toDate()).toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoteApp;
