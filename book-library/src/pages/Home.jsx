import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import BookCard from "../components/BookCard";
import RightCoverRail from "../components/RightCoverRail";

export default function Home({ onAddToWishlist }) {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const apiKey = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;
  const keyParam =
    apiKey && apiKey !== "YOUR_API_KEY_HERE" ? `&key=${apiKey}` : "";

  async function searchBooks(customQuery) {
    const term = (customQuery ?? query).trim();
    if (!term) return;

    setLoading(true);
    setError("");

    try {
      const url =
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(term)}` +
        `&maxResults=24&printType=books&orderBy=relevance&filter=partial${keyParam}`;

      const res = await fetch(url);
      if (!res.ok) throw new Error("Network error");
      const data = await res.json();
      setBooks(Array.isArray(data.items) ? data.items : []);
    } catch (e) {
      setError("Something went wrong. Please try again.");
      setBooks([]);
    } finally {
      setLoading(false);
    }
  }

  // Load some books on first visit
  useEffect(() => {
    searchBooks("bestsellers");
    // Alternative seeds that work well: "fiction", "computer science", "self help"
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
              {books.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  onAddToWishlist={onAddToWishlist}
                  isInWishlist={false}
                />
              ))}
            </div>
          </div>
        </section>

        <RightCoverRail books={books} />
      </div>
    </main>
  );
}
