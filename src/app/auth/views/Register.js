import { useForm } from "react-hook-form"
import { CustomInput } from "../../../components/form-elements/Custominput";
import { Button } from "../../../components/form-elements/Button";
import {
    emailValidation,
    firstNameValidation,
    lastNameValidation,
    passwordValidation,
    phoneNumberValidation
} from "../../../utils/validations";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { guestAxios } from "../../../config/guestAxios";
import { setCookie } from "../../../utils/cookie-helper";
import { LONG_LIVE_TOKEN } from "../../../constants/constants";
import toast from "react-hot-toast";

const Register = () => {

    const {register,handleSubmit, formState: {errors}} =useForm()

    const navigate=useNavigate();
    const [loading,setLoading] = useState(false)

    const submitHandler=async(data) =>{
        setLoading(true)
        const postData = {
            email: data.email,
            password:data.password,
            first_name:data.firstName,
            last_name:data.lastName,
            phone_number:data.phone
        }

        try{
            const response = await guestAxios("/register",{
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
                                            {/*<a><img src={logoWhite} alt="" width="30"/></a>*/}
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
                                    <h4>Sign Up</h4>
                                    <form onSubmit={handleSubmit(submitHandler)}>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <CustomInput placeholder={"Enter First Name"}
                                                             name={"firstName"}
                                                             type={"text"}
                                                             register={register}
                                                             label="First Name"
                                                             validations={firstNameValidation}
                                                             errors={errors?.firstName}
                                                />  
                                            </div>
                                            <div className="col-md-6">
                                                <CustomInput placeholder={"Enter Last Name"}
                                                             name={"lastName"}
                                                             type={"text"}
                                                             register={register}
                                                             label="Last Name"
                                                             validations={lastNameValidation}
                                                             errors={errors?.lastName}
                                                /> 
                                            </div>
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
                                                <CustomInput placeholder={"Enter Phone Number"}
                                                             name={"phone"}
                                                             type={"number"}
                                                             register={register}
                                                             label="Phone"
                                                             validations={phoneNumberValidation}
                                                             errors={errors?.phone}
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
                                            <Button
                                                type="submit"
                                                label="Submit"
                                                styleclass={'w-100'}
                                                loading={loading}
                                            />

                                        </div>
                                    </form>
                                    <p className="mt-3 mb-0 undefined">Already have an account?
                                        <span className="text-primary"> Sign In</span>
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

export default Register