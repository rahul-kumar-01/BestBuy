import React, { useState } from "react";
import style from "./signUp.module.css";
import { useRef } from "react";
import { handleSignUpAsync } from "../../Redux/reducer/sessionReducer";
import { useDispatch } from "react-redux";

const SignUp = () => {
    const usernameRef = useRef(null);
    const userpasswordRef = useRef(null);
    const userconfirmpasswordRef = useRef(null);
    const useremailidRef = useRef(null);
    const dispatch = useDispatch();

    const handleSignIn = async (e) =>  {
        e.preventDefault();
        if( userpasswordRef.current.value !== userconfirmpasswordRef.current.value) return;
        const data = { userName : usernameRef.current.value,
            userPassword: userpasswordRef.current.value,
            userEmailId: useremailidRef.current.value
        }
        dispatch(handleSignUpAsync(data));
        usernameRef.current.value = "";
        userpasswordRef.current.value = "";
        userconfirmpasswordRef.current.value = "";
        useremailidRef.current.value = "";
        return;
    }

    return (
        <>
            <div className={style.main} onSubmit={(e) => handleSignIn(e)}>

            <form className={style.signInForm}>
                <h2>Sign Up</h2>
                <label htmlFor="username">Name:</label>
                <input type="text" id="username" name="userName" required ref={usernameRef} autoComplete="off"/>

                <label htmlFor="useremail">UserEmail:</label>
                <input type="email" id="useremail" name="userEmailId" required ref={useremailidRef} autoComplete="off"/>

                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="userPassword" required ref={userpasswordRef} autoComplete="current-password"/>

                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input type="password" id="confirmPassword" name="userConfirmPassword" required ref={userconfirmpasswordRef} autoComplete="current-password"/>
                
                <button type="submit">Sign Up</button> 
            </form>

            </div>
        </>
    )
}
export default SignUp;