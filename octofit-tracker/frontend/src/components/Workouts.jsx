import { useEffect, useState } from 'react'
import { normalizeCollection } from '../utils/api'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const workoutsEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    fetch(workoutsEndpoint)
      .then((response) => response.json())
      .then((payload) => {
        setWorkouts(normalizeCollection(payload))
        setStatus('ready')
      })
      .catch(() => setStatus('error'))
  }, [])

  if (status === 'loading') {
    return <p className="text-muted">Loading workouts...</p>
  }

  if (status === 'error') {
    return <p className="text-danger">Workouts are unavailable.</p>
  }

  return (
    <div className="data-grid">
      {workouts.map((workout) => (
        <article className="data-card" key={workout._id ?? workout.title}>
          <span className="eyebrow">{workout.focusArea}</span>
          <h2>{workout.title}</h2>
          <p>{workout.recommendedForGoal}</p>
          <dl>
            <div>
              <dt>Difficulty</dt>
              <dd>{workout.difficulty}</dd>
            </div>
            <div>
              <dt>Duration</dt>
              <dd>{workout.durationMinutes} min</dd>
            </div>
            <div>
              <dt>Equipment</dt>
              <dd>{workout.equipment?.join(', ') ?? 'None'}</dd>
            </div>
          </dl>
        </article>
      ))}
    </div>
  )
}

export default Workouts
