export default function SearchBar({ value, onChange, onSubmit, loading }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") onSubmit();
  };

  return (
    <div className="w-full">
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
          🔍
        </span>
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search"
          className="w-full bg-white border border-brand-200 rounded-lg pl-9 pr-28 py-2.5 outline-none focus:ring-2 focus:ring-slate-200"
        />
        <button
          onClick={onSubmit}
          disabled={loading}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md px-4 py-1.5 text-sm bg-slate-900 text-white disabled:opacity-50"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>
    </div>
  );
}
