import { useTheme } from '../../app/context/hooks/useTheme';

export default function AboutPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  return (
    <main className="flex flex-col flex-1 my-4 gap-8 max-w-2xl mx-auto items-center text-center">
      <h2 className="text-2xl font-bold">About</h2>
      <div className="flex flex-col gap-4">
        <p>
          Author: <span className="text-text font-bold">MikeKruk</span>
        </p>
        <a
          href="https://github.com/MikeKruk"
          target="_blank"
          rel="noreferrer"
          className={`
            font-semibold 
            hover:underline
            ${
              isDark
                ? 'bg-linear-to-r from-violet-400 to-indigo-500 bg-clip-text text-transparent'
                : 'bg-linear-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent '
            }
          `}
        >
          GitHub Profile
        </a>

        <a
          href="https://rs.school/courses/reactjs"
          target="_blank"
          rel="noreferrer"
          className={`
            font-semibold 
            hover:underline
            ${
              isDark
                ? 'bg-linear-to-r from-violet-400 to-indigo-500 bg-clip-text text-transparent'
                : 'bg-linear-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent '
            }
          `}
        >
          RS School React course
        </a>
      </div>
    </main>
  );
}
