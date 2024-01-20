import { Link } from "react-router-dom";
import { resList } from "../utils/mockdata";
import RestaurantCard ,{withPromotedLabel} from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { useState,useEffect } from "react";
import useOnlineStatus from "../utils/useOnlineStatus";
const Body=()=>{
 //state variable- super powerful variable
 //arr destructuring
   const [listOfRestaurants,setListOfRestaurants]=useState(resList);
  //const [listOfRestaurants,setListOfRestaurants]=useState([]);
   const [FilteredRestraunt,setFilteredRestraunt]=useState([]);
   const [searchText,setSearchText]=useState("");

const RestaurantsCardPromoted=withPromotedLabel(RestaurantCard);

    useEffect(()=>{
       fetchData();
   },[])
      
  
  const  fetchData=async()=>{
    const data = await fetch(
      // "https://www.swiggy.com/dapi/restaurants/list/v5?lat=25.3412041&lng=82.99821510000001&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
      'https://corsproxy.io/?' + encodeURIComponent('https://www.swiggy.com/dapi/restaurants/list/v5?lat=25.3412041&lng=82.99821510000001&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING')
    ); 
    const json = await data.json();
    console.log("apiData",json);
     setListOfRestaurants(json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
     setFilteredRestraunt(json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
  }
  //console.log("body rendered",listOfRestaurants);
   const OnlineStatus=useOnlineStatus();
   if(OnlineStatus===false)return (
    <h1>Looks like you're offline!! Please Check Your internet connection</h1>
   );

 // console.log(listOfRestaurants);
  if(listOfRestaurants?.length===0){
    return <Shimmer/>
    
  }
  //console.log(searchText,"this");
    return (
       <div className="body">
         <div className="filter flex">
          <div className="search m-4 p-4">
            <input type="text" className="border border-solid border-black p-2 rounded-md" value={searchText} onChange={(e)=>{
              setSearchText(e.target.value);
            }} ></input>
            <button className="px-4 py-2 bg-gray-400 m-4 font-bold text-lg rounded-lg "
             onClick={()=>{
               //Filter the restraunt cards and update the ui
               //searchtext
              const filtered_res=listOfRestaurants?.filter((res)=>{
                   return res?.info?.name.toLowerCase().includes(searchText.toLowerCase());
                })
             setListOfRestaurants(filtered_res);
             setFilteredRestraunt(filtered_res);
            }}>
              search</button>
          </div>

          <div className="search m-4 p-4 flex items-center">
            <button className=" bg-gray-400 px-4 py-2 font-bold text-lg rounded-lg" 
            onClick={()=>{
            const filtered_list=listOfRestaurants?.filter((res)=>res?.info?.avgRating>3.8);
             setFilteredRestraunt(filtered_list);
            }}>
            Top Rated Restaurant
          </button>
          </div>
          
  
         </div>
         <div className="flex flex-wrap"> {
             FilteredRestraunt?.map((restaurant)=>
             //dont use index as key rather use unique key id
             <Link key={restaurant?.info?.id} to={"/restaurants/"+restaurant?.info?.id}> 

             {/*  
             {
              restaurants.data.promoted? (
                <RestaurantCardPromoted resData={restaurant} />
              ):
              (
                <RestaurantsCard resData={restaurant}/>
              )
             }

            */}
             <RestaurantCard  resData={restaurant}/>
             </Link>
             )}
         </div>
       </div>
    );
  };
  export default Body;