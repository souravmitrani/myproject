export const Button=({label,type,onClick,variant="primary",styleclass,loading=false}) => {
    return(
        <div className="w-fit">
            <button disabled={loading} className={`btn btn-${variant} ${styleclass}`} onClick={onClick} type={type}>
                {loading ? "Loading.." : label}
            </button>

        </div>
    )
}