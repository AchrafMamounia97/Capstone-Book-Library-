export default function RightCoverRail({ books }) {
  const covers = (books || [])
    .map((b) => b.volumeInfo?.imageLinks?.thumbnail)
    .filter(Boolean)
    .slice(0, 4);

  if (covers.length === 0) {
    return (
      <div className="hidden lg:block" />
    );
  }

  return (
    <aside className="hidden lg:flex flex-col gap-6">
      {covers.map((src, i) => (
        <img
          key={i}
          src={src}
          alt="Book cover"
          className="w-72 h-44 rounded-md object-cover shadow-soft"
          loading="lazy"
        />
      ))}
    </aside>
  );
}
