export const Select = ({name,label,placeholder,options,register,validation,error}) => {
   
    return(
        <div className={"col-md-12 mb-3"}>
            <label htmlFor={name} className={"form-label"}>{label}</label>
            <select className={"form-control"} name={name} {...register(name,validation)}>
                <option value={""}>{placeholder}</option>
                {
                    options && options.map(option => {
                        return  <option key={option.value} value={option.value}>{option.name}</option>
                    })
                }
            </select>
            {
                error && <p className={"text-danger"}>{error?.message}</p>
            }
        </div>

    )
}