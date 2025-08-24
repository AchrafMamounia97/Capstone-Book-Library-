import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import BookItem from "../components/BookItem";
import RightCoverRail from "../components/RightCoverRail";

export default function Home({ onAddToWishlist }) {
  const [query, setQuery] = useState(""); 
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function searchBooks(customQuery) {
    const term = customQuery || query;
    if (!term.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
          term
        )}&maxResults=24`
      );
      const data = await res.json();
      setBooks(Array.isArray(data.items) ? data.items : []);
    } catch (e) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // 🔹 Load some trending books on initial page load
  useEffect(() => {
    searchBooks("bestsellers"); // you can try "trending books", "fiction", "2023 top books"
  }, []);

  return (
    <main className="mx-auto max-w-6xl px-4 py-6">
      <div className="mb-6">
        <SearchBar
          value={query}
          onChange={setQuery}
          onSubmit={() => searchBooks()}
          loading={loading}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">
        <section>
          <h2 className="text-sm font-semibold mb-2">
            {query ? "Search Results" : "Trending Books"}
          </h2>

          <div className="bg-white rounded-xl p-1">
            {loading && (
              <div className="p-6 text-sm text-slate-500">Loading…</div>
            )}
            {error && (
              <div className="p-6 text-sm text-red-600">{error}</div>
            )}
            {!loading && !error && books.length === 0 && (
              <div className="p-6 text-sm text-slate-500">
                No results. Try searching for a book.
              </div>
            )}

            <ul>
              {books.map((book) => (
                <li key={book.id} className="px-4 border-b last:border-none">
                  <BookItem
                    book={book}
                    onAdd={onAddToWishlist}
                    inWishlist={false}
                  />
                </li>
              ))}
            </ul>
          </div>
        </section>

        <RightCoverRail books={books} />
      </div>
    </main>
  );
}
