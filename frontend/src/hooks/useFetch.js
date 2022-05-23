import { useNavigate } from "react-router-dom";

const { useState, useEffect } = require("react");

export const useFetch = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigator = useNavigate();

  const fetchData = async (cb, shouldSetData = true, newPath) => {
    setError(null);
    setIsLoading(true);
    try {
      const result = await cb();
      shouldSetData && setData(result.data);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
    if(newPath && !error) navigator(newPath);
  }

  return {
    data,
    isLoading,
    error,
    fetchData
  };
}