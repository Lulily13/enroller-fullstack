export default function MeetingsList({ meetings, onDelete, onRegister, onUnregister, username, onEdit }) {
    return (
        <table>
            <thead>
            <tr>
                <th>Nazwa spotkania</th>
                <th>Opis</th>
                <th>Uczestnicy</th>
                <th>Akcje</th>
            </tr>
            </thead>
            <tbody>
            {
                meetings.map((meeting) => (
                    <tr key={meeting.id}>
                        <td>{meeting.title}</td>
                        <td>{meeting.description}</td>
                        <td>{meeting.participants?.length || 0}</td>
                        <td className="meeting-list-buttons">
                            {meeting.participants?.some(p => p.login === username) ? (
                                <button className="meeting-list-button unregister" onClick={() => onUnregister(meeting)}>Wypisz
                                    się</button>
                            ) : (
                                <button className="meeting-list-button" onClick={() => onRegister(meeting)}>Zapisz
                                    się</button>
                            )}
                            <button className="meeting-list-button" onClick={() => onEdit(meeting)}>Edytuj spotkanie</button>
                            <button className="meeting-list-button delete" onClick={() => onDelete(meeting)}>Usuń
                                spotkanie
                            </button>
                        </td>
                    </tr>
                ))
            }
            </tbody>
        </table>
    );
}

