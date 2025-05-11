// Komponent MeetingsList
export default function MeetingsList({ meetings, onDelete }) {
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
                        </td>
                    </tr>
                ))
            }
            </tbody>
        </table>
    );
}

