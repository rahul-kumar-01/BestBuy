import React from "react";
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { setInitialStateAsync } from "../../Redux/reducer/itemsReducer";
import { useEffect } from "react";

const ItemDetails = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setInitialStateAsync());
    }, [dispatch]);

    const {id} = useParams();
    // console.log(id);

    const itemArray = useSelector((state)=>state.itemsReducer.itemArray);
    console.log("ItemDetails", itemArray);
    const index = itemArray.findIndex((obj)=>obj.id.toString() === id.toString());
    

    

    return(
        <>
            <div>
  
            { (itemArray.length !== 0)?  (
                <>
                    
                        <h3>Title: </h3>
                        <span>{itemArray[index].title}</span>
                    
                    <br />
                    <br />
                    
                        <h3>Description: </h3>
                        <span>{itemArray[index].description}</span>
                    
                </>
            ):
            (
                <>
                </>
            ) 
            }
                
            
            
            </div>
        </>
    )
}

export default ItemDetails;
