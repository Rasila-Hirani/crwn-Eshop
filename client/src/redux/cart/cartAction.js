import CartActionTypes from "./cart.types";

export const toggeleCartHidden =()=>({
    type:CartActionTypes.TOGGLE_CART_HIDDEN
})
export const addCartItem =(item)=>({
    type:CartActionTypes.ADD_ITEM,
    payload:item
})

export const removeCartItem =(id)=>({
    type:CartActionTypes.REMOVE_ITEM,
    payload:id
})

export const descreaseQuantity =(item)=>({
    type:CartActionTypes.DECREASE_QUANTITY,
    payload:item
})

export const clearCart=()=>({
    type:CartActionTypes.CLEAR_CART
})