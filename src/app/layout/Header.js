

import logo from "../../assets/images/logo/logoi.png"
import { LONG_LIVE_TOKEN } from "../../constants/constants"
import { deleteCookie } from "../../utils/cookie-helper"
import toast from "react-hot-toast"
import authAxios from "../../config/authAxios"
import { useNavigate } from "react-router-dom"

export const Header = () => {

  const navigate = useNavigate();
  const logout = async() => {
    try{
      const response = await authAxios("/logout",{
        method:"PUT",
      })
      if(response.status === 200){
        deleteCookie(LONG_LIVE_TOKEN);
        navigate("/login")
      }
    }catch(e){
      if(e.response && e.response.status===400){
        toast.error(e.response.data.data)
      }
    }
  }
  

  return (
      <div className="row">
        <div className="col-md-12">
          <div className="header-content mt-3">
            <div className="header-left">
              <div className="brand-logo">
                <a href="/">
                  <img src={logo} alt="" width="40"/>
                </a>
              </div>
              <div className={"flex-row items-center"}>
                <h3 className={"mb-0"}>Expense Tracker</h3>
              </div>
            </div>
            <div className={"header-right"}>
              <div>
                <div className="d-flex align-items-center justify-content-center"
                >
                  <span>
                    <button type="button" onClick={logout} className="btn btn-link text-decoration-none">Logout</button>
                  </span>
                  <div  className={" c-pointer"}>
                    <div className="icon-menu active flex justify-content-center align-items-center">
                      <i className="ri-user-3-line lead"></i>
                    </div>
                  </div>
                </div>
                { /* For dropDown */}
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
