import { useCallback, useEffect, useState } from "react"
import authAxios from "../config/authAxios";

export const useFetch = (url) =>{
    const [data,setData] = useState(null);
    const [loading,setLoading] = useState(null);
    const [error,setError] = useState(null);

    // fetchData optionally accepts (signal, params) where params will be sent as query params
    const fetchData = useCallback(async(signal, params) => {
        setLoading(true)
        try{
            const response = await authAxios({
                url: url,
                signal: signal,
                params: params,
            })
            if(response.status === 200){
                setData(response?.data?.data)
            }
        }catch (e){
            if(e.response && e.response.status === 400){
                setError(e.response.data.data)
            }
        }finally{
            setLoading(false)
        }
    }, [url])

    useEffect(() =>{
        const controller = new AbortController();
        (async () => {
            await fetchData(controller.signal)
        })();
    }, [fetchData])

    return {data,error,loading,fetchData}
}