interface ErrorMessageProps {
  error: string | null;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
  if (!error) return null;

  return (
    <div
      role="alert"
      className="m-3 rounded border border-red-200 bg-red-100 px-4 py-2 text-sm text-red-800 dark:border-red-500 dark:bg-red-800 dark:text-white"
    >
      {error}
    </div>
  );
};
