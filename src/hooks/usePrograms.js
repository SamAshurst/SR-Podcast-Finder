import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getProgramsForChannelCategory } from "../utils/api";

export default function usePrograms(channelId, categoryId, pageNum = 1) {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState({});
  const [hasNextPage, setHasNextPage] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    setError({});

    const controller = new AbortController();
    const { signal } = controller;

    getProgramsForChannelCategory(channelId, categoryId, pageNum, {
      signal,
    })
      .then((data) => {
        setResults((prev) => [...prev, ...data.programs]);
        setHasNextPage(Boolean(data.programs.length));
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        if (signal.aborted) return;
        setIsError(true);
        setError({ message: err.message });
      });

    return () => controller.abort();
  }, [channelId, categoryId, pageNum]);

  return { isLoading, isError, error, results, hasNextPage };
}
