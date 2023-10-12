import { Button } from "~/components/ui/button";

type LoadingButtonProps = {
  isLoading?: boolean;
  isSuccess?: boolean;
  isError?: boolean;
  mutater?: {
    isLoading?: boolean;
    isSuccess?: boolean;
    isError?: boolean;
  };
} & React.ComponentProps<typeof Button>;

export function LoadingButton({
  isLoading,
  isSuccess,
  isError,
  mutater,
  ...props
}: LoadingButtonProps) {
  if (mutater) {
    isLoading = mutater.isLoading;
    isSuccess = mutater.isSuccess;
    isError = mutater.isError;
  }

  const getStatusIcon = () => {
    if (isLoading) {
      return (
        <svg
          className="mr-2 h-5 w-5 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 004 12H0c0 3.042 1.135 5.824 3 7.938l3-1.647zM20 12c0-3.042-1.135-5.824-3-7.938l-3 1.647A7.962 7.962 0 0020 12h4a8 8 0 01-8 8v-4z"
          />
        </svg>
      );
    } else if (isSuccess) {
      return (
        <svg
          className="mr-2 h-5 w-5 text-green-700"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M18.707 5.293a1 1 0 010 1.414l-9 9a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L9 14.586l8.293-8.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      );
    } else if (isError) {
      return (
        <svg
          className="mr-2 h-5 w-5 text-red-700"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 2a8 8 0 100 16 8 8 0 000-16zM8 12a1 1 0 112 0v2a1 1 0 11-2 0v-2zm2-7a1 1 0 11-2 0 1 1 0 012 0zm0 4a1 1 0 01-2 0V7a1 1 0 112 0v2z"
            clipRule="evenodd"
          />
        </svg>
      );
    }
    return null;
  };

  return (
    <Button
      className="flex items-center justify-center space-x-1"
      disabled={isLoading}
      {...props}
    >
      {getStatusIcon()}
      {props.children}
    </Button>
  );
}
