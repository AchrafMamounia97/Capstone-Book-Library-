import { useMemo, useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Wishlist from "./pages/Wishlist";
import LandingPage from "./components/LandingPage";
import Profile from "./pages/Profile";
import useLocalStorage from "./hooks/useLocalStorage";

export default function App() {
  // Start on landing, user can jump to Home via the navbar or the CTA
  const [activeTab, setActiveTab] = useState("landing");

  const [wishlist, setWishlist] = useLocalStorage("bookfinder:wishlist", []);
  const [isDarkMode, setIsDarkMode] = useLocalStorage(
    "bookfinder:darkMode",
    false
  );

  const wishlistIds = useMemo(
    () => new Set(wishlist.map((b) => b.id)),
    [wishlist]
  );

  useEffect(() => {
    if (isDarkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [isDarkMode]);

  function addToWishlist(book) {
    if (!book?.id || wishlistIds.has(book.id)) return;
    setWishlist((prev) => [book, ...prev]);
  }

  function removeFromWishlist(id) {
    setWishlist((prev) => prev.filter((b) => b.id !== id));
  }

  return (
    <div className="min-h-full dark:bg-slate-900 transition-colors">
      <Navbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        wishlistCount={wishlist.length}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
      />

      {activeTab === "landing" && <LandingPage onStart={() => setActiveTab("home")} />}
      {activeTab === "home" && <Home onAddToWishlist={addToWishlist} />}
      {activeTab === "wishlist" && (
        <Wishlist items={wishlist} onRemove={removeFromWishlist} />
      )}
      {activeTab === "profile" && <Profile />}

      <footer className="text-xs text-slate-400 dark:text-slate-500 py-10 text-center">
        Built with React + Tailwind · Google Books API
      </footer>
    </div>
  );
}
