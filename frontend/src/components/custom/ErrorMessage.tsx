interface ErrorMessageProps {
  error: string | null;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
  if (!error) return null;
  return (
    <div className="bg-accent-bg text-text-primary border-accent m-3 rounded border px-4 py-2">
      {error}
    </div>
  );
};
