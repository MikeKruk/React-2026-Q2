export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <div className="flex flex-row justify-between">
        <div>
          <p className="max-sm:text-sm">© {year} All rights reserved</p>
        </div>
        <p>
          Created by{' '}
          <a
            href="https://github.com/MikeKruk"
            aria-label="Link to MikeKruk github profile"
            target="_blank"
            rel="noreferrer"
            className="
              max-sm:text-sm font-bold
              hover:underline
              active:text-blue-500
              "
          >
            MikeKruk
          </a>
        </p>
      </div>
    </footer>
  );
}
