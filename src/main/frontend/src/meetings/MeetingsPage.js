import {useEffect, useState} from "react";
import NewMeetingForm from "./NewMeetingForm";
import MeetingsList from "./MeetingsList";

export default function MeetingsPage({username}) {
    const [meetings, setMeetings] = useState([]);
    const [addingNewMeeting, setAddingNewMeeting] = useState(false);

    useEffect(() => {
        const fetchMeetings = async () => {
            const response = await fetch(`/api/meetings`);
            if (response.ok) {
                const meetings = await response.json();
                setMeetings(meetings);
            }
        };
        fetchMeetings();
    }, []);

    async function handleNewMeeting(meeting) {
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
    }

    async function handleDeleteMeeting(meeting) {
        const response = await fetch(`/api/meetings/${meeting.id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            const nextMeetings = meetings.filter(m => m.id !== meeting.id);
            setMeetings(nextMeetings);
        } else if (response.status === 409) {
            alert("Nie można usunąć spotkania – są zapisani uczestnicy.");
        }
    }

    async function handleRegister(meeting) {
        const response = await fetch(`/api/meetings/${meeting.id}/participants/${username}`, {
            method: 'PUT',
        });
        if (response.ok) {
            const updated = await fetch(`/api/meetings`);
            const updatedMeetings = await updated.json();
            setMeetings(updatedMeetings);
        }
    }

    async function handleUnregister(meeting) {
        const response = await fetch(`/api/meetings/${meeting.id}/participants/${username}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            const updated = await fetch(`/api/meetings`);
            const updatedMeetings = await updated.json();
            setMeetings(updatedMeetings);
        }
    }


    return (
        <div>
            <h2>Zajęcia ({meetings.length})</h2>
            {
                addingNewMeeting
                    ? <NewMeetingForm onSubmit={(meeting) => handleNewMeeting(meeting)}/>
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
        </div>
    )
}
