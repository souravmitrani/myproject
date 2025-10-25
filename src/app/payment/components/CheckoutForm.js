import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { useNavigate } from "react-router-dom"
import authAxios from "../../../config/authAxios"
import { errorHandler } from "../../../utils/helper"
import { Button } from "../../../components/form-elements/Button"

export const CheckoutForm = () => {
    const stripe = useStripe()
    const element = useElements()
    const navigate=useNavigate()

    const updateServerOnSuccess = async() =>{
        try{
            const response = await authAxios("/successful-checkout",{
                method:"PUT",
            })
        }catch(e){
            errorHandler(e)
        }
    }

    const handlePayment =  async(e) => {
        e.preventDefault();
        
        const response = await stripe.confirmPayment({
            elements:element,
            redirect:"if_required"
        })
        if(response?.error){
            //payment failed
        }else{
            //payment sucess
            //backend update
            await updateServerOnSuccess()
            //navigate sucess
            navigate("/success")
        }
    }

    return(
        <form onSubmit={handlePayment}>
            <PaymentElement/>
            <Button label={"Pay"} type={"submit"}/>

        </form>
    )
}