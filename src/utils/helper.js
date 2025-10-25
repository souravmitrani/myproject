import toast from "react-hot-toast"

export const errorHandler = (e) => {
    if(e.response && e.response.status === 400){
        toast.error(e.response.data.data)
    }else{
        toast.error("Something went wrong")
    }
}