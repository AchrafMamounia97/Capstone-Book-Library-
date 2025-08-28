import React, { useState } from "react";
import BookReader from "./BookReader";

export default function BookCard({
  book,
  onAddToWishlist,
  isInWishlist,
  onRemoveFromWishlist,
}) {
  const [isReading, setIsReading] = useState(false);

  const { volumeInfo } = book;
  const thumbnail = volumeInfo.imageLinks?.thumbnail?.replace("http:", "https:");

  const openReader = () => setIsReading(true);

  return (
    <>
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-soft p-4 flex flex-col">
        {/* Book Cover (clickable) */}
        <div
          className="relative pb-[150%] mb-4 group hover:opacity-90 cursor-pointer"
          onClick={openReader}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && openReader()}
        >
          {thumbnail ? (
            <img
              src={thumbnail}
              alt={volumeInfo.title}
              className="absolute inset-0 w-full h-full object-cover rounded"
            />
          ) : (
            <div className="absolute inset-0 bg-gray-200 dark:bg-slate-700 rounded flex items-center justify-center text-gray-400 dark:text-gray-500">
              No cover
            </div>
          )}
        </div>

        {/* Book Info */}
        <div className="flex-1 flex flex-col">
          <h3
            className="font-semibold mb-1 line-clamp-2 dark:text-white cursor-pointer hover:underline"
            onClick={openReader}
          >
            {volumeInfo.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 line-clamp-1">
            {volumeInfo.authors?.join(", ") || "Unknown Author"}
          </p>

          {/* Action Buttons */}
          <div className="mt-auto flex gap-2">
            <button
              onClick={openReader}
              className="flex-1 bg-sky-500 text-white px-3 py-1 rounded hover:bg-sky-600 transition-colors"
            >
              Read
            </button>
            {isInWishlist ? (
              <button
                onClick={() => onRemoveFromWishlist && onRemoveFromWishlist(book.id)}
                className="flex-1 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
              >
                Remove
              </button>
            ) : (
              <button
                onClick={() => onAddToWishlist && onAddToWishlist(book)}
                className="flex-1 bg-slate-200 dark:bg-slate-700 px-3 py-1 rounded hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors dark:text-white"
              >
                + Wishlist
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Book Reader Modal */}
      {isReading && <BookReader book={book} onClose={() => setIsReading(false)} />}
    </>
  );
}
