import { useState } from "react";
import { AxiosRequestConfig } from "axios";
import sendAxiosRequest from "@/lib/api/sendAxiosRequest";

export default function useDataFetch() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const axiosFetcher = async (options: AxiosRequestConfig) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await sendAxiosRequest({ ...options });
      return response;
    } catch (err: any) {
      setError(err);
      return err;
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, axiosFetcher };
}
