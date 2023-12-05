import React, { useEffect, useState } from "react";
import { useSelector ,useDispatch } from "react-redux";
import { setInitialStateAsync } from "../../Redux/reducer/sessionItemReducer";
import style from "./cartItems.module.css";
import { sessionItemAction } from "../../Redux/reducer/sessionItemReducer";
import { handlePlaceOrderAsync } from "../../Redux/reducer/sessionItemReducer";

const CartItems = () => {
    const cartArray = useSelector((state)=>state.sessionItemReducer.cartArray);
    const userId = useSelector((state) =>state.sessionReducer.currentSessionUserId);

    const dispatch = useDispatch();
    const [cart,setCart] = useState([]);
    let total = 0;

    useEffect(()=>{
        dispatch(setInitialStateAsync({userId}));
    },[])

    useEffect(()=>{
        setCart(cartArray);
    },[cartArray])

    function handlePlaceOrder(){
        dispatch(handlePlaceOrderAsync({userId,cartArray}));
    }

    return(
        <>
            <table className={style.table}>
                
                <thead>
                    <tr>
                    <th className={style.one}>Product Name </th>
                    <th className={style.two}>Price</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        cart.map((data, i) => {
                            total += data.price;
                            return (
                                <tr key={i}>
                                    <td className={style.one}>{data.title}</td>
                                    <td className={style.two}>{data.price}</td>
                                </tr>
                            );
                        })
                    }
                </tbody>

                <tfoot>
                    <tr>
                            <th className={style.one}>Total:</th>
                            <th className={style.two}>{total}</th>
                    </tr>
                </tfoot>
                
            </table>


            <button className={style.placeOrderBtn}  onClick={handlePlaceOrder}>
                <span className={style.btnText} > Place Order </span>
            </button>
            
        </>
    )
}

export default CartItems;