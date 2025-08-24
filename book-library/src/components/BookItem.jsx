function getAuthors(volumeInfo) {
  if (!volumeInfo?.authors?.length) return "Unknown";
  return volumeInfo.authors.join(", ");
}

export default function BookItem({ book, onAdd, onRemove, inWishlist }) {
  const v = book.volumeInfo || {};
  const title = v.title || "Untitled";
  const authors = getAuthors(v);
  const thumb =
    v.imageLinks?.thumbnail ||
    v.imageLinks?.smallThumbnail ||
    "";

  return (
    <div className="flex items-center justify-between py-4">
      <div>
        <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
        <p className="text-xs text-slate-500">By {authors}</p>

        {onAdd && !inWishlist && (
          <button
            onClick={() => onAdd(book)}
            className="mt-2 text-xs px-3 py-1 rounded-md bg-brand-100 hover:bg-brand-200"
          >
            Add to Wishlist
          </button>
        )}

        {onRemove && (
          <button
            onClick={() => onRemove(book.id)}
            className="mt-2 text-xs px-3 py-1 rounded-md bg-red-50 hover:bg-red-100 text-red-700"
          >
            Remove
          </button>
        )}
      </div>

      {thumb ? (
        <img
          src={thumb}
          alt={title}
          className="w-40 h-28 object-cover rounded-md"
          loading="lazy"
        />
      ) : (
        <div className="w-40 h-28 rounded-md bg-brand-100 grid place-items-center text-xs text-slate-400">
          No cover
        </div>
      )}
    </div>
  );
}
