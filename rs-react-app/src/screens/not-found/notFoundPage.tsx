import { Link } from '@tanstack/react-router';

export default function notFoundPage() {
  return (
    <main className="flex flex-col flex-1 gap-6 justify-center items-center text-center">
      <h2 className="text-6xl font-bold bg-linear-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
        404
      </h2>
      <p className="text-xl">Page not found</p>
      <Link
        to="/$page"
        params={{ page: 1 }}
        className="
          font-semibold  
          px-4 py-2 
          rounded-md border border-gray-500 
          hover:bg-orange-400 hover:border-orange-400 
          active:bg-orange-400
        "
      >
        Back to Home
      </Link>
    </main>
  );
}
