import { useEffect, useState } from 'react'
import { normalizeCollection, formatDate } from '../utils/api'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const usersEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/'

function Users() {
  const [users, setUsers] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    fetch(usersEndpoint)
      .then((response) => response.json())
      .then((payload) => {
        setUsers(normalizeCollection(payload))
        setStatus('ready')
      })
      .catch(() => setStatus('error'))
  }, [])

  if (status === 'loading') {
    return <p className="text-muted">Loading users...</p>
  }

  if (status === 'error') {
    return <p className="text-danger">Users are unavailable.</p>
  }

  return (
    <div className="data-grid">
      {users.map((user) => (
        <article className="data-card" key={user._id ?? user.username}>
          <span className="eyebrow">{user.team}</span>
          <h2>{user.displayName ?? user.username}</h2>
          <p>{user.fitnessGoal}</p>
          <dl>
            <div>
              <dt>Email</dt>
              <dd>{user.email}</dd>
            </div>
            <div>
              <dt>Joined</dt>
              <dd>{formatDate(user.joinedAt)}</dd>
            </div>
          </dl>
        </article>
      ))}
    </div>
  )
}

export default Users
