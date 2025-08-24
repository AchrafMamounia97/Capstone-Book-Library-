export default function Navbar({ activeTab, onTabChange }) {
  return (
    <header className="bg-white shadow-soft sticky top-0 z-50">
      <nav className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-slate-900 rounded-sm" />
          <span className="font-semibold">BookFinder</span>
        </div>

        <ul className="flex items-center gap-6 text-sm">
          <li>
            <button
              onClick={() => onTabChange("home")}
              className={`hover:underline ${
                activeTab === "home" ? "text-slate-900 font-medium" : "text-slate-600"
              }`}
            >
              Home
            </button>
          </li>
          <li>
            <button
              onClick={() => onTabChange("wishlist")}
              className={`hover:underline ${
                activeTab === "wishlist" ? "text-slate-900 font-medium" : "text-slate-600"
              }`}
            >
              Wishlist
            </button>
          </li>
        </ul>

        <div className="w-8 h-8 rounded-full bg-slate-200" aria-label="profile" />
      </nav>
    </header>
  );
}
