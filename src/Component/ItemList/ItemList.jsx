import React, { useEffect, useState } from "react";
import style from "./itemList.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { itemsActions } from "../../Redux/reducer/itemsReducer";

import {  setInitialStateAsync } from "../../Redux/reducer/itemsReducer";
import { setUpdatedItemArrayAsync } from "../../Redux/reducer/itemsReducer";


const ItemList = () => {
    const dispatch = useDispatch();
    const [itemArray, setItemArray] = useState([]);
    
    const checkBoxCategoryArray = useSelector((state)=>state.itemsReducer.checkBoxCategoryArray);
    const itemArrayFromReducer = useSelector((state)=>state.itemsReducer.itemArray);

    useEffect(()=>{
        dispatch(setInitialStateAsync());
    },[])

    useEffect(() => {
        dispatch(setUpdatedItemArrayAsync());
    }, [checkBoxCategoryArray]); 

    useEffect(() => {
        setItemArray(itemArrayFromReducer);
    }, [itemArrayFromReducer]);

    function handleCheckBox(event,itemCategory){
        const checked = event.target.checked;
        dispatch(itemsActions.setCheckBoxArray({ checked, itemCategory }));
    }

    return(
        <>

        <div className={style.main}>

            <div className={style.filterBox}>

                <div className={style.filterForm}>
                    <form action="/submit" method="post">

                        <input type="checkbox" id="checkbox2" name="options" onChange={(event) => handleCheckBox(event, "men's clothing")}/>
                        <label for="checkbox2">Men's clothing</label>
                        <br />

                        <input type="checkbox" id="checkbox1" name="options" onClick={(event)=>handleCheckBox(event,"women's clothing")}/>
                        <label for="checkbox1">Women's clothing</label>
                        

                        <br/>
                        
                        <input type="checkbox" id="checkbox3" name="options" onClick={(event) => handleCheckBox(event,"jewelery")}/>
                        <label for="checkbox3">Jewelery</label>
                        

                        <br/>

                        <input type="checkbox" id="checkbox4" name="options" onClick={(event)=>handleCheckBox(event,"electronics")}/>
                        <label for="checkbox4">Electronics</label>
                        

                        <br/>
                    </form>
                </div>
                
            </div>

            <div className={style.itemList}>
                {itemArray.map((info,index)=>{
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
                                            
                                            <span style={{margin:"0 10px", verticalAlign: "middle", fontSize: '12px'}}>( {info.rating.count} )</span>
                                        </p>   
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