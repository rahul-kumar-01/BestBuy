import React, { useEffect } from "react";
import style from "./navbar.module.css";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch ,useSelector } from "react-redux";
import {handleSignOutAsync, setInitalStateAsync} from "../../Redux/reducer/sessionReducer.js";


const Navbar = () => {
    const dispatch = useDispatch();

    const currentSessionUserId = useSelector((state)=>state.sessionReducer.currentSessionUserId);
    const handleSignOut = () => {
        dispatch(handleSignOutAsync());
    }
    useEffect(()=>{
        dispatch(setInitalStateAsync());
    },[])

    return (
        <>
            <div className={style.main}>
                <div className={style.navlistLeft}>
                    <li>Busy Buy</li>
                </div>
                <div className={style.navlistRight}>

                    {currentSessionUserId === "none" ? (
                        <>
                            <li> <Link to="/signIn" style={{ textDecoration: 'none', color: 'inherit' }}> Sign In  </Link> </li>
                            <li> <Link to="/signUp" style={{ textDecoration: 'none', color: 'inherit' }}> Sign Up  </Link> </li>
                        </>
                    ):
                    (
                        <>
                            <li>Cart</li>
                            <li>My Orders</li>
                            <li onClick={()=>handleSignOut()}> <Link to="/"> Sign Out  </Link> </li>
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