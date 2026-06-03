import { useEffect, useState } from 'react'
import { normalizeCollection, formatDate } from '../utils/api'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const activitiesEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/'

function Activities() {
  const [activities, setActivities] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    fetch(activitiesEndpoint)
      .then((response) => response.json())
      .then((payload) => {
        setActivities(normalizeCollection(payload))
        setStatus('ready')
      })
      .catch(() => setStatus('error'))
  }, [])

  if (status === 'loading') {
    return <p className="text-muted">Loading activities...</p>
  }

  if (status === 'error') {
    return <p className="text-danger">Activities are unavailable.</p>
  }

  return (
    <div className="data-grid">
      {activities.map((activity) => (
        <article className="data-card" key={activity._id ?? `${activity.username}-${activity.activityDate}`}>
          <span className="eyebrow">{formatDate(activity.activityDate)}</span>
          <h2>{activity.type}</h2>
          <p>{activity.notes}</p>
          <dl>
            <div>
              <dt>Athlete</dt>
              <dd>{activity.username}</dd>
            </div>
            <div>
              <dt>Duration</dt>
              <dd>{activity.durationMinutes} min</dd>
            </div>
            <div>
              <dt>Calories</dt>
              <dd>{activity.caloriesBurned}</dd>
            </div>
          </dl>
        </article>
      ))}
    </div>
  )
}

export default Activities
