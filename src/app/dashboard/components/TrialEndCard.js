import { useNavigate } from "react-router-dom"
import { Button } from "../../../components/form-elements/Button";

export const TrialEndCard = ({days}) => {
    const naviagte = useNavigate();

    return(
        <div className="card">
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <h2>Trial Ending Soon!</h2>
                        <p>
                            Your Trial will end in {days} days
                        </p>
                    </div>
                    <Button label={"Subscribe Now"} onClick={()=>naviagte("/payment")}/>
                </div>
            </div>
        </div>
    )
}