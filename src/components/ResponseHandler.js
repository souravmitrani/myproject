export const ResponseHandler =({loading,error,dataToRender}) => {
    return(
        <>
        {
            loading ?
            <p className={"text-center"}>loading..</p>
            :
            error ?
             <p className={"text-center"}>{error}</p>
             :
             dataToRender()
        }
        </>
    )
}