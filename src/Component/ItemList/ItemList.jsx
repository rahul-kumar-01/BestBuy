import React, { useEffect, useState } from "react";
import style from "./itemList.module.css";
import { Link } from "react-router-dom";
import { setInitialStateAsync } from "../../Redux/reducer/itemsReducer";
import { useDispatch, useSelector } from "react-redux";


const ItemList = () => {
    const [itemArray, setItemArray] = useState([]);
    const dispatch = useDispatch();
    const itemArrayFromReducer = useSelector((state)=>state.itemsReducer.itemArray);


    useEffect(() => {
        // Dispatch the async action when the component mounts
        dispatch(setInitialStateAsync());
    }, [dispatch]); // Include dispatch in the dependency array to satisfy the ESLint exhaustive-deps rule

    useEffect(() => {
        setItemArray(itemArrayFromReducer);
    }, [itemArrayFromReducer]);


    return(
        <>
        
        <div className={style.main}>

            <div className={style.filterBox}>

            </div>

            <div className={style.itemList}>
                {itemArray.map((info,index)=>{
                    console.log(info);
                    const id = info.id;
                    return(
                        <>
                        
                        

                            <div className={style.itemCard}>
                            <Link to={`/items/${info.id}`} style={{ textDecoration: 'none', color: 'inherit' , margin: '0', padding : '0'}}>
                                
                                <div className={style.itembox}>

                                    <div style={{padding: '10px'}}>
                                        <img style={{width: "180px", height: "180px", borderRadius: '20px'}} src={info.image}></img>
                                    </div>
                                    
                                    <div className={style.itemInfo}>
                                        <p className={style.infoTitle}>{info.title}</p>
                                        <p>$ {info.price}</p>

                                        <p>
                                            <span>Rating : </span>
                                            {Array.from({ length: info.rating.rate }, (_, i) => (
                                                <img key={i} src='https://cdn-icons-png.flaticon.com/128/1828/1828884.png' alt="Icon Image" className={style.star}/>
                                            ))}
                                            
                                            {/* <span>{info.rating.rate}</span>  */}
                                            <span style={{margin:"0 10px", verticalAlign: "middle", fontSize: '12px'}}>( {info.rating.count} )</span>
                                        </p>   
                                    </div>

                                    <div className={style.btnBox}>
                                        <button className={`${style.btn} ${style.addToCart}`}>Add To Cart</button>
                                        <button className={`${style.btn} ${style.removeFromCart}`}>Remove From Cart</button>
                                    </div>

                                </div>

                            </Link>
                            </div>


                        </>
                    )
                })}

            </div>

        </div>

        </>
    )
}

export default ItemList;