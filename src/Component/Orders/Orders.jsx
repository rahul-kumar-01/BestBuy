import React, { useEffect, useState } from "react";
import style from "./orders.module.css";
import { useDispatch,useSelector } from "react-redux";
import { setInitialStateAsync } from "../../Redux/reducer/sessionItemReducer";
const Orders = () => {
    const orderArray = useSelector((state)=>state.sessionItemReducer.orderArray);
    const userId = useSelector((state) =>state.sessionReducer.currentSessionUserId);

    const dispatch = useDispatch();
    const [userid,setUserId] = useState(undefined);

    useEffect(()=>{
        dispatch(setInitialStateAsync({userId}));
    },[])

    useEffect(()=>{
        setUserId(userId);
    },[userId])

    const [orderarray,setOrderArray] = useState([]);
    useEffect(()=>{
        setOrderArray(orderArray);
    },[orderArray])


    return(
        <>
            <div>
                {orderarray.slice().reverse().map((objItemsList,index)=>{

                    let total = 0;
                    return(
                        <div key={index}>

                                <h3 style={{paddingLeft: '20px'}}>Order No: {index+1}</h3>
                            
                                <table className={style.table}>
                                            
                                <thead>
                                    <tr>
                                    <th className={style.one}>Product Name </th>
                                    <th className={style.two}>Price</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {   
                                        Object.keys(objItemsList)
                                        .map(v=>{
                                            total += objItemsList[v].price;
                                            return (
                                                <tr >
                                                    <td className={style.one}>{objItemsList[v].title}</td>
                                                    <td className={style.two}>{objItemsList[v].price}</td>
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
                            
                        </div>
                    )
                })}
            </div>
        </>

    )
}

export default Orders;