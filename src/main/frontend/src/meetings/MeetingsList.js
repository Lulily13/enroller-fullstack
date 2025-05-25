export default function MeetingsList({ meetings, onDelete, onRegister, onUnregister, username }) {
    return (
        <table>
            <thead>
            <tr>
                <th>Nazwa spotkania</th>
                <th>Opis</th>
                <th>Akcje</th>
            </tr>
            </thead>
            <tbody>
            {
                meetings.map((meeting) => (
                    <tr key={meeting.id}>
                        <td>{meeting.title}</td>
                        <td>{meeting.description}</td>
                        <td>
                            <button onClick={() => onDelete(meeting)}>Usuń spotkanie</button>
                            {meeting.participants?.some(p => p.login === username) ? (
                                <button onClick={() => onUnregister(meeting)}>Wypisz się</button>
                            ) : (
                                <button onClick={() => onRegister(meeting)}>Zapisz się</button>
                            )}
                        </td>
                    </tr>
                ))
            }
            </tbody>
        </table>
    );
}

