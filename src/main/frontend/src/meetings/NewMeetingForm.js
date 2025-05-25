import { useState, useEffect } from "react";

export default function NewMeetingForm({ onSubmit, initialData }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title || '');
            setDescription(initialData.description || '');
        }
    }, [initialData]);

    function submit(event) {
        event.preventDefault();
        onSubmit({ title, description });
    }

    return (
        <form onSubmit={submit}>
            <h3>{initialData ? "Edytuj spotkanie" : "Dodaj nowe spotkanie"}</h3>
            <label>Nazwa</label>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <label>Opis</label>
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <button>{initialData ? "Zapisz zmiany" : "Dodaj"}</button>
        </form>
    );
}
