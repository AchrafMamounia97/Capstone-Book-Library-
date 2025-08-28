import BookCard from "../components/BookCard";

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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            {items.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onRemoveFromWishlist={onRemove}
                isInWishlist={true}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
