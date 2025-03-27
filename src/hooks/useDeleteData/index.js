import { useState } from "react";

export default function useDeleteData(url) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const deleteData = async (id) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}${url}/${id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                mode: "cors",
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
            }

            const result = await response.json();
            setData(result);
            setSuccess(true);
        } catch (error) {
            console.error("Delete request failed:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { data, error, success, loading, deleteData };
}
