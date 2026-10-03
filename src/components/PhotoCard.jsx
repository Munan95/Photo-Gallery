// The API's own image URLs (via.placeholder.com) are often unreachable,
// so images come from picsum.photos, seeded by photo id.
export const getImageUrl = (photo, size = 400) =>
  `https://picsum.photos/seed/${photo.id}/${size}/${size}`

export default function PhotoCard({ photo, onView }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-black/20 bg-white transition duration-200 hover:-translate-y-1 hover:border-gray-400 hover:shadow-xl dark:border-white/25 dark:bg-black dark:hover:border-white dark:hover:shadow-white/10">
      <img
        src={getImageUrl(photo)}
        alt={photo.title}
        loading="lazy"
        className="aspect-square w-full bg-neutral-200 object-cover dark:bg-neutral-800"
      />
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex flex-wrap gap-2 text-xs font-semibold">
          <span className="rounded-full border border-gray-400 px-2.5 py-1 dark:border-white">
            Photo ID: {photo.id}
          </span>
          <span className="rounded-full border border-gray-400 px-2.5 py-1 dark:border-white">
            Album ID: {photo.albumId}
          </span>
        </div>
        <h2 className="line-clamp-2 text-sm font-medium capitalize">{photo.title}</h2>
        <button
          onClick={() => onView(photo)}
          className="mt-auto rounded-lg bg-black py-2 text-sm font-semibold text-white hover:opacity-80 dark:bg-white dark:text-black"
        >
          View Details
        </button>
      </div>
    </article>
  )
}
