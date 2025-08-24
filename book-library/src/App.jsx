import { useMemo, useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Wishlist from "./pages/Wishlist";
import useLocalStorage from "./hooks/useLocalStorage";

export default function App() {
  const [activeTab, setActiveTab] = useState("home"); // "home" | "wishlist"
  const [wishlist, setWishlist] = useLocalStorage("bookfinder:wishlist", []);

  const wishlistIds = useMemo(() => new Set(wishlist.map((b) => b.id)), [wishlist]);

  function addToWishlist(book) {
    if (!book?.id || wishlistIds.has(book.id)) return;
    setWishlist((prev) => [book, ...prev]);
  }

  function removeFromWishlist(id) {
    setWishlist((prev) => prev.filter((b) => b.id !== id));
  }

  return (
    <div className="min-h-full">
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />
      {activeTab === "home" ? (
        <Home onAddToWishlist={addToWishlist} />
      ) : (
        <Wishlist items={wishlist} onRemove={removeFromWishlist} />
      )}
      <footer className="text-xs text-slate-400 py-10 text-center">
        Built with React + Tailwind · Google Books API
      </footer>
    </div>
  );
}
