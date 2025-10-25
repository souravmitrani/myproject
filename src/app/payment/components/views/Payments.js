import { loadStripe } from "@stripe/stripe-js"
import React, { useEffect, useState } from "react"
import authAxios from "../../../../config/authAxios";
import { errorHandler } from "../../../../utils/helper";
import { Elements } from "@stripe/react-stripe-js";
import { CheckoutForm } from "../CheckoutForm";

const stripe = loadStripe(process.env.REACT_APP_PUBLISH_KEY);

const Payments = () => {


    const [clientSecret, setClientSecret] = useState(null)

    const fetchClientSecret = async () => {
        try {
            const response = await authAxios("/get-client-secret", {
                method: "POST",
                data: {
                    amount: "99900",
                    currency: "INR"
                }
            });
            console.log(response)
            console.log("if ke phele")
            if (response.status === 200) {
                setClientSecret(response?.data?.data?.client_secret);
                console.log("Client scret sett")
            }
        } catch (e) {
            errorHandler(e)
        }
    }
    useEffect(() => {
        fetchClientSecret()
    }, []);

    return (
        <div className={"row"}>
            <div className={"col-sm-12 col-md-6 col-xl-6 mx-auto"}>
                <div className={"card mt-5 shadow"}>
                    <h4 className={"card-header mb-2"}>Lifetime Subscription</h4>
                    <div className={"card-body"}>
                        <h5>Take Control of Your Finances Forever with One Simple Payment</h5>
                        <p>Why deal with recurring payments when you can manage your expenses seamlessly for a
                            lifetime?
                            Our lifetime subscription unlocks all features with a one-time payment, giving you the
                            tools
                            to stay on top of your financial goals—forever.</p>
                        <h5>What’s Included?</h5>
                        <ul style={{ listStyle: "inside" }}>
                            <li>Unlimited Access to expense tracking, budgeting tools, and reports</li>
                            <li>No Hidden Costs — one payment, lifetime access!</li>
                        </ul>
                        <h4>One-Time Payment: ₹999</h4>
                        <hr />
                        {
                            clientSecret ?
                                <Elements stripe={stripe} options={{
                                    clientSecret: clientSecret,
                                }}>
                                    <CheckoutForm />
                                </Elements>
                                :
                                <p>loading...</p>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}



export default Payments
