import { useState } from "react";
import ItemList from "./ItemList";

const RestaurantCategory=({data,showItems,setShowIndex})=>{
  // const [showItems,setShowItems]=useState(false);
   const handleClick=()=>{
     // setShowItems(!showItems);
  setShowIndex();

   }
    return (
        <div className=" w-6/12 mx-auto my-4 shadow-lg py-4 bg-gray-100 ">
            {/* Header */}
            <div className="flex justify-between cursor-pointer" onClick={handleClick}>
            <span className="font-bold text-lg">{data.title}({data.itemCards.length})</span>
            <span>⬇️</span>
            </div>
           
            {/* Accordian body */}
            {showItems && <ItemList items={data.itemCards}/>}
           
        </div>
    )
}

export default RestaurantCategory;