import { Navigate } from "react-router-dom"
import { LONG_LIVE_TOKEN } from "../../../constants/constants"
import { getCookie } from "../../../utils/cookie-helper"


export const ProtectedRoute=({component}) => {
    let token = getCookie(LONG_LIVE_TOKEN)
    console.log(token)
    if(!token){
        return <Navigate to={"/login"} replace={true}/>
    }
    return component
}