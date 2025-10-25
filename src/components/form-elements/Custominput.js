export const CustomInput=({label,type,name,placeholder,register,validations,errors}) => {
    return(
        <div className={"mb-3"}>
            <label htmlFor={name} className={"form-label"}>{label}</label>
            <input name={name} type={type} placeholder={placeholder} {...register(name,validations)} className={"form-control"} />
            {errors && <p className={"text-danger mt-1"}>{errors?.message}</p>}
        </div>
    )
}