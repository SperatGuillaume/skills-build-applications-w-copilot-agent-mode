export function normalizeCollection(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (!payload || typeof payload !== 'object') {
    return []
  }

  const collectionKeys = ['results', 'data', 'items', 'docs']

  for (const key of collectionKeys) {
    if (Array.isArray(payload[key])) {
      return payload[key]
    }
  }

  if (payload.data && typeof payload.data === 'object') {
    return normalizeCollection(payload.data)
  }

  return []
}

export function formatDate(value) {
  if (!value) {
    return 'Not recorded'
  }

  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value))
}
