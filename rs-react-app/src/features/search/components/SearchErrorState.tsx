interface SearchErrorStateProps {
  message: string;
  onRetry: () => void;
}

export default function SearchErrorState({
  message,
  onRetry,
}: SearchErrorStateProps) {
  return (
    <div className="flex-1 flex justify-center items-center gap-3">
      <p>{message}</p>
      <button
        className="
            w-full max-w-1/3 md:max-w-35 p-0.5 rounded-md
            border border-gray-500
          hover:bg-orange-400/70 hover:border-orange-400
          active:bg-orange-400/70 active:border-orange-400
          "
        onClick={onRetry}
      >
        Retry
      </button>
    </div>
  );
}
