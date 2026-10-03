import { useState, useEffect, useMemo } from 'react'
import PhotoCard, { getImageUrl } from './PhotoCard'

const API_URL = 'https://jsonplaceholder.typicode.com/photos?_limit=100'

export default function PhotoGallery({ query }) {
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [album, setAlbum] = useState('all')
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    let cancelled = false

    fetch(API_URL)
      .then((response) => {
        if (!response.ok) throw new Error(`Request failed (${response.status})`)
        return response.json()
      })
      .then((data) => {
        if (!cancelled) setPhotos(data.slice(0, 100))
      })
      .catch((err) => {
        if (!cancelled) setError(err.message)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  // Close the details modal with Escape
  useEffect(() => {
    if (!selected) return
    const onKey = (e) => e.key === 'Escape' && setSelected(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selected])

  const albums = useMemo(
    () => [...new Set(photos.map((p) => p.albumId))].sort((a, b) => a - b),
    [photos]
  )

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return photos.filter(
      (p) =>
        (album === 'all' || p.albumId === Number(album)) &&
        (!q || p.title.toLowerCase().includes(q) || String(p.id) === q)
    )
  }, [photos, query, album])

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-3 py-20">
        <span className="h-6 w-6 animate-spin rounded-full border-4 border-neutral-300 border-t-gray-400 dark:border-neutral-700 dark:border-t-white" />
        Loading photos…
      </div>
    )
  }

  if (error) {
    return (
      <p className="rounded-lg border border-gray-400 p-4 text-center dark:border-white">
        Could not load photos: {error}
      </p>
    )
  }

  return (
    <>
      {/* Toolbar: album filter + result count */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm">
          Showing <strong>{filtered.length}</strong> of {photos.length} photos
        </p>
        <label className="flex items-center gap-2 text-sm font-medium">
          Album
          <select
            value={album}
            onChange={(e) => setAlbum(e.target.value)}
            className="rounded-lg border border-gray-400 bg-white px-3 py-2 text-black focus:border-gray-400 focus:ring-0 dark:border-white dark:bg-black dark:text-white"
          >
            <option value="all">All albums</option>
            {albums.map((a) => (
              <option key={a} value={a}>
                Album {a}
              </option>
            ))}
          </select>
        </label>
      </div>

      {filtered.length === 0 ? (
        <p className="py-16 text-center">No photos match your search.</p>
      ) : (
        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((photo) => (
            <PhotoCard key={photo.id} photo={photo} onView={setSelected} />
          ))}
        </section>
      )}

      {/* View Details modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setSelected(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            className="relative max-h-full w-full max-w-lg overflow-y-auto rounded-xl border border-black bg-white text-black dark:border-white dark:bg-black dark:text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelected(null)}
              aria-label="Close"
              className="absolute right-3 top-3 h-9 w-9 rounded-full bg-black text-lg leading-none text-white dark:bg-white dark:text-black"
            >
              ×
            </button>
            <img
              src={getImageUrl(selected, 800)}
              alt={selected.title}
              className="aspect-square w-full object-cover"
            />
            <div className="space-y-3 p-5">
              <h3 className="text-lg font-bold capitalize">{selected.title}</h3>
              <dl className="grid grid-cols-2 gap-2 text-sm">
                <dt className="font-semibold">Photo ID</dt>
                <dd>{selected.id}</dd>
                <dt className="font-semibold">Album ID</dt>
                <dd>{selected.albumId}</dd>
              </dl>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
