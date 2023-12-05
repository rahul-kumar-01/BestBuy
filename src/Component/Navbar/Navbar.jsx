import React, { useEffect } from "react";
import style from "./navbar.module.css";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch ,useSelector } from "react-redux";
import {handleSignOutAsync} from "../../Redux/reducer/sessionReducer.js";


const Navbar = () => {
    const dispatch = useDispatch();

    const currentSessionUserId = useSelector((state)=>state.sessionReducer.currentSessionUserId);
    const handleSignOut = () => {
        dispatch(handleSignOutAsync());
    }

    return (
        <>
            <div className={style.main}>
                <div className={style.navlistLeft}>
                <li> <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}> <b style={{fontSize:'18px'}}>Best Buy</b>  </Link> </li>
                </div>
                <div className={style.navlistRight}>

                    {currentSessionUserId === undefined ? (
                        <>
                            <li> <Link to="/signIn" style={{ textDecoration: 'none', color: 'inherit' }}> Sign In  </Link> </li>
                            <li> <Link to="/signUp" style={{ textDecoration: 'none', color: 'inherit' }}> Sign Up  </Link> </li>
                        </>
                    ):
                    (
                        <>
                            
                            <li> <Link to="/orders" style={{ textDecoration: 'none', color: 'inherit' }}> Orders  </Link> </li>
                            <li> <Link to="/cart" style={{ textDecoration: 'none', color: 'inherit' }}> Cart  </Link> </li>
                            <li onClick={()=>handleSignOut()}> <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}> Sign Out  </Link> </li>
                        </>
                    )
                    }
                    
                    
                </div>
            </div>
            <div className={style.outlet}>
                <Outlet />
            </div>
            
        </>
    )
}
export default Navbar;