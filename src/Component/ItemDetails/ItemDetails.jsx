import React, { useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import { setInitialStateAsync } from "../../Redux/reducer/itemsReducer";
import { handleAddToCartAsync , handleRemoveFromCartAsync } from "../../Redux/reducer/sessionItemReducer";
import { setInitialStateAsync as setCartState } from "../../Redux/reducer/sessionItemReducer";
import { useEffect } from "react";
import style from "./ItemDetails.module.css";

const ItemDetails = () => {
    const [userid, setUserId] = useState("");
    const [itemInCart,setItemInCart] = useState(false);
    const {id} = useParams();
    const dispatch = useDispatch();
    const userId = useSelector((state)=> state.sessionReducer.currentSessionUserId);
    const cartArray = useSelector((state) => state.sessionItemReducer.cartArray);

    useEffect(() => {
        dispatch(setInitialStateAsync());
    }, [dispatch]);

    useEffect(()=>{
        setUserId(userId)
    },[userId])

    useEffect(()=>{
        if(userId) dispatch(setCartState({userId: userid}));
    },[userid])

    useEffect(()=>{
        console.log('cartArray',cartArray);
        let temp = false;
        cartArray.map((data,index)=>{
            if(data.id.toString() === id.toString()) {
                setItemInCart(true);
                temp = true;
                return;
            }
        })
        if(temp) return;
        setItemInCart(false);
    },[cartArray])


    const itemArray = useSelector((state)=>state.itemsReducer.itemArray);
    console.log("ItemDetails", itemArray);
    const index = itemArray.findIndex((obj)=>obj.id.toString() === id.toString());
    
    function handleAddToCart(){
        if(userId){
            dispatch(handleAddToCartAsync({ itemDetails: itemArray[index], userId : userId}));
            return;
        }
        window.alert('Please Sign In');
    }

    function handleRemoveFromCart(){
        if(userId){ 
            dispatch(handleRemoveFromCartAsync({itemDetails:itemArray[index] ,userId : userId}));
            return;
        }
        window.alert('Please Sign In');
    }


    return(
        <>
        
        {(itemArray.length !== 0) ? (
            <>
                <div style={{padding: '60px'}}>
                    <div style={{display: 'flex' }}>
                        <div>
                            <img src = {itemArray[index].image} alt="" style={{height: '300px', width: '300px'}}/>
                        </div>

                        <div>

                        
                            <div style={{padding: '20px 40px'}}>
                                <h3>Title: </h3>
                                <span>{itemArray[index].title}</span>

                                <br />
                                <br />
                                
                                <h3>Description: </h3>
                                <span>{itemArray[index].description}</span>

                            </div>

                            <div className={style.btnBox}>
                                {itemInCart ? 
                                (
                                    <button className={`${style.btn} ${style.removeFromCart}`} onClick={handleRemoveFromCart}>Remove From Cart</button>
                                ):
                                (
                                    <button className={`${style.btn} ${style.addToCart}`} onClick={handleAddToCart}>Add To Cart</button>
                                )
                                }

                            </div>


                        </div>

                    </div>
                </div>
            </>
        ):
        (
            <>

            </>
        )
        }

        </>
    )
}

export default ItemDetails;
