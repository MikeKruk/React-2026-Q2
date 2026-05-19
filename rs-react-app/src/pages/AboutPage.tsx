export default function AboutPage() {
  return (
    <main className="flex flex-col flex-1 my-4 gap-8 max-w-2xl mx-auto items-center text-center">
      <h2 className="text-2xl font-bold">About</h2>
      <div className="flex flex-col gap-4">
        <p>
          Author: <span className="font-bold">MikeKruk</span>
        </p>
        <a
          href="https://github.com/MikeKruk"
          target="_blank"
          rel="noreferrer"
          className="
            font-semibold 
            bg-linear-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent 
            hover:underline
          "
        >
          GitHub Profile
        </a>

        <a
          href="https://rs.school/courses/reactjs"
          target="_blank"
          rel="noreferrer"
          className="
            font-semibold 
            bg-linear-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent 
            hover:underline
          "
        >
          RS School React course
        </a>
      </div>
    </main>
  );
}
