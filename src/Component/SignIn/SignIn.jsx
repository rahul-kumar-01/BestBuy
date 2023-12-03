import React from "react";
import style from "./signIn.module.css";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { handleSignInAsync } from "../../Redux/reducer/sessionReducer";
import { useNavigate } from "react-router-dom";


const SignIn = () => {
    const navigate = useNavigate();
    const useremailRef = useRef(null);
    const userpasswordRef = useRef(null);
    const dispatch = useDispatch();

    const handleSignIn = async (e) => {
        e.preventDefault();
        
        dispatch(handleSignInAsync({userEmailId: useremailRef.current.value,
            userPassword: userpasswordRef.current.value}));

        useremailRef.current.value = "";
        userpasswordRef.current.value = "";
        navigate('/');
    }

    return (
        <>
            <div className={style.main}>

            <form className={style.signInForm} onSubmit={(e) => handleSignIn(e)}>
                <h2>Sign In</h2>
                <label htmlFor="userEmail">UserEmail:</label>
                <input type="email" id="userEmail" name="userEmail" required ref={useremailRef}/>

                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="userPassword" required ref={userpasswordRef}/>

                <button type="submit">Sign In</button> 
            </form>

            </div>
        </>
    )
}
export default SignIn;
