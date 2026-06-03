import { useEffect, useState } from 'react'
import { normalizeCollection } from '../utils/api'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const teamsEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/'

function Teams() {
  const [teams, setTeams] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    fetch(teamsEndpoint)
      .then((response) => response.json())
      .then((payload) => {
        setTeams(normalizeCollection(payload))
        setStatus('ready')
      })
      .catch(() => setStatus('error'))
  }, [])

  if (status === 'loading') {
    return <p className="text-muted">Loading teams...</p>
  }

  if (status === 'error') {
    return <p className="text-danger">Teams are unavailable.</p>
  }

  return (
    <div className="data-grid">
      {teams.map((team) => (
        <article className="data-card" key={team._id ?? team.name}>
          <span className="eyebrow">{team.city}</span>
          <h2>{team.name}</h2>
          <p>{team.motto}</p>
          <dl>
            <div>
              <dt>Members</dt>
              <dd>{team.memberCount}</dd>
            </div>
            <div>
              <dt>Weekly goal</dt>
              <dd>{team.weeklyGoalMinutes} min</dd>
            </div>
          </dl>
        </article>
      ))}
    </div>
  )
}

export default Teams
