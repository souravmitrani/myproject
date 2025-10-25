import { useForm } from "react-hook-form"
import { CustomInput } from "../../../components/form-elements/Custominput";
import { Button } from "../../../components/form-elements/Button";
import {
    emailValidation,
    passwordValidation,
    
} from "../../../utils/validations";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { guestAxios } from "../../../config/guestAxios";
import { setCookie } from "../../../utils/cookie-helper";
import { LONG_LIVE_TOKEN } from "../../../constants/constants";
import toast from "react-hot-toast";

export const Login = () => {

    const {register,handleSubmit, formState: {errors}} =useForm()

    const navigate=useNavigate();
    const [loading,setLoading] = useState(false)
    
    const submitHandler=async(data) =>{
        setLoading(true)
        const postData = {
            email: data.email,
            password:data.password,
           
        }

        try{
            const response = await guestAxios("/login",{
                method: "POST",
                data:postData
            })
            console.log(response)
            if(response.status===200){
                //request succesfull
                //store token
                setCookie(LONG_LIVE_TOKEN,response.data.data.token,1)
                //navigate to dashboard
                navigate("/")
            }
        }catch(e){
            if(e.response && e.response.status === 400){
                toast.error(e.response.data.data)
            }
        }finally{
            setLoading(false)
        }
    }
    
       
    return (
        <div className="authincation">
            <div className="container">
                <div className="row justify-content-center align-items-center g-0">
                    <div className="col-xl-8">
                        <div className="row g-0">
                            <div className="col-lg-6">
                                <div className="welcome-content">
                                    <div className="welcome-title">
                                        <div className="mini-logo">
                                            <img src="" alt="" width="50"/>
                                        </div>
                                        <h3>Welcome to Expense Tracker</h3>
                                    </div>
                                    <div className="privacy-social">
                                        <div className="text-white">
                                            Your spending at a glance
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="auth-form shadow">
                                    <h4>Sign In</h4>
                                    <form onSubmit={handleSubmit(submitHandler)}>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <CustomInput placeholder={"Enter Email"}
                                                                name={"email"}
                                                                type={"text"}
                                                                register={register}
                                                                label="Email"
                                                                validations={emailValidation}
                                                                errors={errors?.email}
                                                /> 
                                            </div>
                                            <div className="col-md-12">
                                                <CustomInput placeholder={"Enter Password"}
                                                                name={"password"}
                                                                type={"text"}
                                                                register={register}
                                                                label="Password"
                                                                validations={passwordValidation}
                                                                errors={errors?.password}
                                                />                 

                                            </div>
                                        </div>
                                        <div className="mt-3 d-grid gap-2">
                                        <Button
                                                type="submit"
                                                label="Submit"
                                                styleclass={'w-100'}
                                                loading={loading}
                                            />
                                        </div>
                                    </form>
                                    <p className="mt-3 mb-0 undefined">Don't have an account?
                                        <a className="text-primary" href="">
                                            Sign up
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
