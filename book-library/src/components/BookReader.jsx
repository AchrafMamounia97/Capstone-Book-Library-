import React, { useEffect, useState } from "react";

export default function BookReader({ book, onClose }) {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiKey = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;
  const keyParam =
    apiKey && apiKey !== "YOUR_API_KEY_HERE" ? `&key=${apiKey}` : "";

  useEffect(() => {
    const fetchBookContent = async () => {
      setLoading(true);
      setError(null);

      try {
        // Prefer a direct web reader link if present on the item itself
        const webReader =
          book.accessInfo?.webReaderLink?.replace("http:", "https:");
        const previewLink =
          book.volumeInfo?.previewLink?.replace("http:", "https:");

        if (webReader) {
          setContent({ type: "link", url: webReader });
          return;
        }
        if (previewLink) {
          setContent({ type: "link", url: previewLink });
          return;
        }

        // If not present, fetch full volume details
        const res = await fetch(
          `https://www.googleapis.com/books/v1/volumes/${book.id}?projection=full${keyParam}`
        );
        if (!res.ok) throw new Error("Network error");
        const data = await res.json();

        const fetchedReader =
          data.accessInfo?.webReaderLink?.replace("http:", "https:");
        const fetchedPreview =
          data.volumeInfo?.previewLink?.replace("http:", "https:");

        if (fetchedReader || fetchedPreview) {
          setContent({ type: "link", url: fetchedReader || fetchedPreview });
        } else {
          const message =
            data.accessInfo?.viewability === "NO_PAGES"
              ? "No preview available for this book. You can purchase or borrow it."
              : data.accessInfo?.viewability === "PARTIAL"
              ? "Partial preview available."
              : "Preview not available.";
          setContent({ type: "info", message });
        }
      } catch (err) {
        setError("Failed to load book content. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookContent();
  }, [book, keyParam]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-slate-800 rounded-lg w-full max-w-4xl h-[80vh] flex flex-col">
        {/* Header */}
        <div className="p-4 border-b dark:border-slate-700 flex justify-between items-center">
          <h2 className="text-xl font-semibold dark:text-white">
            {book.volumeInfo.title}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-4">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-sky-500 border-t-transparent"></div>
            </div>
          ) : error ? (
            <div className="text-red-500 dark:text-red-400 text-center">{error}</div>
          ) : content?.type === "link" ? (
            <div className="h-full flex flex-col items-center">
              <a
                href={content.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-sky-500 text-white px-6 py-3 rounded-lg hover:bg-sky-600 transition-colors"
              >
                Open Book Preview
              </a>
              {book.volumeInfo?.description && (
                <div className="mt-6 text-left max-w-2xl">
                  <h3 className="font-semibold mb-2 dark:text-white">
                    About this book:
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {book.volumeInfo.description}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center dark:text-white">
              <p>{content?.message}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

