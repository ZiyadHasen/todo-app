interface ErrorMessageProps {
  error: string | null;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
  if (!error) return null;
  return (
    <div className="m-3 rounded border border-red-400 bg-red-100 px-4 py-2 text-red-700">
      {error}
    </div>
  );
};
