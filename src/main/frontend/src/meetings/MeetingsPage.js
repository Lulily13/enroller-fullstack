import { useEffect, useState } from "react";
import NewMeetingForm from "./NewMeetingForm";
import MeetingsList from "./MeetingsList";
import "../App.css";

export default function MeetingsPage({ username }) {
    const [meetings, setMeetings] = useState([]);
    const [addingNewMeeting, setAddingNewMeeting] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchMeetings = async () => {
            setLoading(true);
            const response = await fetch(`/api/meetings`);
            if (response.ok) {
                const meetings = await response.json();
                setMeetings(meetings);
            }
            setLoading(false);
        };
        fetchMeetings();
    }, []);

    async function handleNewMeeting(meeting) {
        setLoading(true);
        const response = await fetch('/api/meetings', {
            method: 'POST',
            body: JSON.stringify(meeting),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            const addedMeeting = await response.json();
            setMeetings(prevMeetings => [...prevMeetings, addedMeeting]);
            setAddingNewMeeting(false);
        }
        setLoading(false);
    }

    async function handleDeleteMeeting(meeting) {
        setLoading(true);
        const response = await fetch(`/api/meetings/${meeting.id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            const nextMeetings = meetings.filter(m => m.id !== meeting.id);
            setMeetings(nextMeetings);
        } else if (response.status === 409) {
            alert("Nie można usunąć spotkania – są zapisani uczestnicy.");
        }
        setLoading(false);
    }

    async function handleRegister(meeting) {
        setLoading(true);
        const response = await fetch(`/api/meetings/${meeting.id}/participants/${username}`, {
            method: 'PUT',
        });
        if (response.ok) {
            const updated = await fetch(`/api/meetings`);
            const updatedMeetings = await updated.json();
            setMeetings(updatedMeetings);
        }
        setLoading(false);
    }

    async function handleUnregister(meeting) {
        setLoading(true);
        const response = await fetch(`/api/meetings/${meeting.id}/participants/${username}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            const updated = await fetch(`/api/meetings`);
            const updatedMeetings = await updated.json();
            setMeetings(updatedMeetings);
        }
        setLoading(false);
    }

    return (
        <div>
            <h2>Zajęcia ({meetings.length})</h2>

            {loading && (
                <div style={{ textAlign: "center", padding: "20px" }}>
                    <div className="lds-dual-ring"></div>
                    <p>Ładowanie danych...</p>
                </div>
            )}

            {!loading && (
                <>
                    {
                        addingNewMeeting
                            ? <NewMeetingForm onSubmit={(meeting) => handleNewMeeting(meeting)} />
                            : <button onClick={() => setAddingNewMeeting(true)}>Dodaj nowe spotkanie</button>
                    }
                    {meetings.length > 0 &&
                        <MeetingsList
                            meetings={meetings}
                            username={username}
                            onDelete={handleDeleteMeeting}
                            onRegister={handleRegister}
                            onUnregister={handleUnregister}
                        />
                    }
                </>
            )}
        </div>
    );
}

