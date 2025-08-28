import React from "react";

const LandingPage = ({ onStart }) => {
  return (
    <section className="flex flex-col items-center text-center py-16 px-6 dark:text-white">
      {/* Headline */}
      <h1 className="text-3xl md:text-4xl font-bold mb-4">
        Discover Your Next Great Read
      </h1>

      {/* Subtitle */}
      <p className="text-gray-600 dark:text-gray-300 max-w-2xl mb-6">
        Explore a vast collection of books and create your personal wishlist.
      </p>

      {/* CTA Button */}
      <button
        onClick={onStart}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
      >
        Search for Books
      </button>

      {/* Illustration */}
      <div className="mt-12 max-w-3xl">
        <img
          src="https://images.pexels.com/photos/2041540/pexels-photo-2041540.jpeg?cs=srgb&dl=pexels-rafael-cosquiere-1059286-2041540.jpg&fm=jpg&_gl=1*cizluk*_ga*MTg3Mzk1OTY4MC4xNzU0NTAzNzM5*_ga_8JE65Q40S6*czE3NTYzODQyMjIkbzckZzEkdDE3NTYzODQ5NTYkajU5JGwwJGgw"
          alt="Books Illustration"
          className="rounded-lg shadow-md"
        />
      </div>
    </section>
  );
};

export default LandingPage;

