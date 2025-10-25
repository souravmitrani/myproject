import { Link } from "react-router-dom"

export const Success =() => {
    return(
        <div className={"row"}>
            <div className="col-md-6 mx-auto">
                <div className="card mt-5">
                    <div className="card-body">
                        <h4 className={"text-success text-center"}>Payment Successful</h4>
                        <p>Welcome to life time subscription of expense tracker</p>
                        <div className={"d-flex justify-content-center"}>
                            <Link to={"/"}>
                                Go to home page
                            </Link>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
        
    
}