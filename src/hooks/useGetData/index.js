import { useEffect, useState } from "react";

export default function useGetData(url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}${url}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        //   body: JSON.stringify({ username: "test", password: "123456" }),
          mode: "cors",
        //   credentials: "include",
        //   cache: "no-cache",
        });
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `HTTP get error! status: ${response.status}, message: ${errorText}`
          );
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Get request failed:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [url]);

  return { data, loading, error };
}
