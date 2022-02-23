import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from 'react-redux'
import { refreshToken } from "../http";
import { setAuth } from "../store/authSlice";
import Cookies from 'js-cookie'

export const useLoadingWithRefresh = ()=> {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch()
    useEffect(()=> {
        (async ()=> {
            try {
                const {data} = await refreshToken();
                dispatch(setAuth(data))
                Cookies.set('at',data?.tokens?.at,{expires: 1})
                Cookies.set('rt',data?.tokens?.rt,{expires: 7})
                setLoading(false)
            } catch (error) {
                console.log(error);
                setLoading(false)
            }
        })()
    },[])
    return {loading}
}