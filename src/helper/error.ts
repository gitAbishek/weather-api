import { AxiosError } from 'axios';

interface ApiResponseError {
  errorMessage?: string;
  error?: {
    message?: string;
  };
  message?: string;
}

export const parseApiError = (error: AxiosError<ApiResponseError>) => {
  return (
    error?.response?.data?.errorMessage ||
    error?.response?.data?.error?.message ||
    error?.response?.data?.message ||
    "An unknown error has occurred"
  );
};
