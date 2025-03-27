import { useState } from "react";

export default function usePostData(url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const postData = async (bodyData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}${url}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
        mode: "cors",
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `HTTP error! Status: ${response.status}, Message: ${errorText}`
        );
      }

      const result = await response.json();
      setData(result);
      setSuccess(true);
    } catch (error) {
      console.error("Post request failed:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, error, success, loading, postData };
}
