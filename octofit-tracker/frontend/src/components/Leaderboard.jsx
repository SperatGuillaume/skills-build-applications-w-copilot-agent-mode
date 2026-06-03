import { useEffect, useState } from 'react'
import { normalizeCollection } from '../utils/api'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const leaderboardEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    fetch(leaderboardEndpoint)
      .then((response) => response.json())
      .then((payload) => {
        setEntries(normalizeCollection(payload))
        setStatus('ready')
      })
      .catch(() => setStatus('error'))
  }, [])

  if (status === 'loading') {
    return <p className="text-muted">Loading leaderboard...</p>
  }

  if (status === 'error') {
    return <p className="text-danger">Leaderboard is unavailable.</p>
  }

  return (
    <div className="table-responsive surface">
      <table className="table align-middle mb-0">
        <thead>
          <tr>
            <th scope="col">Rank</th>
            <th scope="col">Athlete</th>
            <th scope="col">Team</th>
            <th scope="col">Points</th>
            <th scope="col">Minutes</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry._id ?? entry.username}>
              <td>#{entry.rank}</td>
              <td>{entry.username}</td>
              <td>{entry.team}</td>
              <td>{entry.points}</td>
              <td>{entry.weeklyMinutes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Leaderboard
