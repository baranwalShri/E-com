import { useEffect,useState } from "react";
const useRestaurantMenu=(resId)=>{
    //fetchData
    const [resInfo,setResInfo]=useState(null);
    useEffect(()=>{
        fetchData();
    },[]);

const fetchData=async()=>{
    const data = await fetch(`https://foodishhub.live/api/menu?id=${resId}`);
     const json = await data.json();
     setResInfo(json.data);
}

    return resInfo;
}

export default useRestaurantMenu;