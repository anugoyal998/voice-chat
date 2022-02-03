import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from 'react-redux'
import { setAuth } from "../store/authSlice";

export const useLoadingWithRefresh = ()=> {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch()
    const url = process.env.REACT_APP_API_URL || "http://localhost:5000";
    useEffect(()=> {
        (async ()=> {
            try {
                const {data} = await axios.get(`${url}/api/refresh`,{withCredentials: true})
                dispatch(setAuth(data))
                setLoading(false)
            } catch (error) {
                console.log(error);
                setLoading(false)
            }
        })()
    },[])
    return {loading}
}