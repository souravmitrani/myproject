import { NavLink } from "react-router-dom";
import logoLight from "../../assets/images/logo/logo-white.png"


export const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="brand-logo"><a className="full-logo" href="index.html"><img src={logoLight} alt="" width="30"/></a></div>
            <div className="menu">
                <ul>
                    <li>
                        <NavLink to={'/'}>
                            <span>
                               <i className="ri-home-5-line lead"></i>
                            </span>
                            <span className="nav-text">Home</span>
                        </NavLink>  
                    </li>
                     <li>
                        <NavLink to={'/transactions'}>
                            <span>
                               <i className="ri-exchange-dollar-line lead"></i>
                            </span>
                            <span className="nav-text">Transactions</span>
                        </NavLink>  
                    </li>
                    <li>
                        <NavLink to={'/profile'}>
                            <span>
                               <i className="ri-user-line lead"></i>
                            </span>
                            <span className="nav-text">Profile</span>
                        </NavLink>  
                    </li>
                </ul>
            </div>
        </div>
    );
}