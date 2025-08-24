import BookItem from "../components/BookItem";

export default function Wishlist({ items, onRemove }) {
  return (
    <main className="mx-auto max-w-6xl px-4 py-6">
      <h2 className="text-sm font-semibold mb-3">My Wishlist</h2>

      <div className="bg-white rounded-xl p-1">
        {items.length === 0 ? (
          <div className="p-6 text-sm text-slate-500">
            Your wishlist is empty. Search for books and add them here.
          </div>
        ) : (
          <ul>
            {items.map((book) => (
              <li key={book.id} className="px-4 border-b last:border-none">
                <BookItem book={book} onRemove={onRemove} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
