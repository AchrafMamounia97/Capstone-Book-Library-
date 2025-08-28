import React from "react";

export default function Navbar({ activeTab, onTabChange, wishlistCount, isDarkMode, onToggleDarkMode }) {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white">
      {/* App Logo / Name */}
      <h1
        className="text-xl font-bold cursor-pointer"
        onClick={() => onTabChange("landing")}
      >
        📚 BookFinder
      </h1>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-6">
        <button
          onClick={() => onTabChange("home")}
          className={`hover:text-sky-400 ${
            activeTab === "home" ? "text-sky-400 font-semibold" : ""
          }`}
        >
          Home
        </button>
        <button
          onClick={() => onTabChange("wishlist")}
          className={`hover:text-sky-400 flex items-center gap-2 ${
            activeTab === "wishlist" ? "text-sky-400 font-semibold" : ""
          }`}
        >
          Wishlist
          {wishlistCount > 0 && (
            <span className="bg-sky-500 text-white text-xs px-2 py-1 rounded-full">
              {wishlistCount}
            </span>
          )}
        </button>
        <button
          onClick={() => onTabChange("profile")}
          className={`hover:text-sky-400 ${
            activeTab === "profile" ? "text-sky-400 font-semibold" : ""
          }`}
        >
          Profile
        </button>
        <button
          onClick={onToggleDarkMode}
          className="hover:text-sky-400 flex items-center gap-2"
          title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDarkMode ? "🌙" : "☀️"}
        </button>
      </div>
    </nav>
  );
}

