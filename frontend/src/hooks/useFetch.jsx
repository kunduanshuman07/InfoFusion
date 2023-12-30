import { useEffect, useState } from 'react'
import axiosInstance from "../utils/axiosInstance";

const useFetch = ({ url, method, body }) => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [fetching, setFetching] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            const reqOptions = {
                method, data: body
            }
            try {
                const res = await axiosInstance.request({...reqOptions, url});
                console.log(res.data);
                setData(res.data);
                setLoading(false);
                setFetching(false);
            } catch (err) {
                setFetching(false);
                setError(
                    err?.response?.data?.message ||
                    err?.message ||
                    "Error While Fethching Data...",
                );
            }
        }
        fetchData();
    }, [error, fetching, loading]);
    return { data, error, loading, fetching };
}

export default useFetch;