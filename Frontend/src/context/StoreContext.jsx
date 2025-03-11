import axios from 'axios';
import {createContext, useEffect, useState} from 'react'

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {
    // usestate for item cart
    const [cartItems, setCartItems] = useState({});
    // backend 
    const url = "http://localhost:3000"
    // state variab;e
    const [token, setToken] = useState("");
    // for food list 
    // hello how far
    const [food_list,setFoodList] = useState([])
    // h
    // functinality for add to cart
    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev)=> ({...prev,[itemId]:1}))
        }
        else
        {
            setCartItems((prev) => ({...prev,[itemId]:prev[itemId]+1}))
        }
        if (token) {
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
        }
    }

    // for remove from cart
    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({...prev,[itemId]:prev[itemId]-1}));
        if (token) {
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
        }
    }

    // total amount 
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for(const item in cartItems )
        {
            if(cartItems[item] > 0){
                let itemInfo = food_list.find((product) => product._id === item )
                totalAmount += itemInfo.price*cartItems[item];
            }
        }
        return totalAmount;
    }
    // frontend par food dala load krne k liye
    const fetchFoodList = async() => {
        const response = await axios.get(url +"/api/food/list");
        setFoodList(response.data.data)
    }


    const loadtCartData = async (token) => {
        const response = await axios.post(url +"/api/cart/get",{},{headers:{token}});
        setCartItems(response.data.cartData);
    }

    useEffect(()=>{
        async function loadData() {
            await fetchFoodList();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"))
                await loadtCartData(localStorage.getItem("token"));
            }
        }
        loadData();
    },[])

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url, 
        token, 
        setToken
    };


    return (
        <StoreContext.Provider value={contextValue} >
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;