export const firstNameValidation ={
    required:{
        value:true,
        message:'First name is required',
    },
    minLength:{
        value:2,
        message:"Minimum lnegth should be 2",
    }
}

export const lastNameValidation ={
    required:{
        value:true,
        message:'Last name is required',
    },
    minLength:{
        value:2,
        message:"Minimum lnegth should be 2",
    }
}

export const emailValidation = {
    required:{
        value:true,
        message:'Email name is required',
    },
    pattern:{
        value:/^[A-Za-z0-9._+]+@[A-Za-z]+\.[A-Za-z]{2,}$/,
        message:"Invalid email address",
    }

}

export const phoneNumberValidation ={
    required:{
        value:true,
        message:'phone number is required',
    },
    minLength:{
        value:10,
        message:"Phone number should be of 10 digits",
    },
    maxLength:{
        value:10,
        message:"Phone number should be of 10 digits",
    }
}

export const passwordValidation ={
    required:{
        value:true,
        message:'Password is required',
    },
    minLength:{
        value:8,
        message:"Password should have minimum 8 characters",
    }
}
