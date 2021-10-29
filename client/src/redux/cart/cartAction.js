import CartActionTypes from "./cart.types";

export const toggeleCartHidden =()=>({
    type:CartActionTypes.TOGGLE_CART_HIDDEN
})
export const addCartItem =(item)=>({
    type:CartActionTypes.ADD_ITEM,
    payload:item
})

export const removeCartItem =(item)=>({
    type:CartActionTypes.REMOVE_ITEM,
    payload:item
})

export const descreaseQuantity =(item)=>({
    type:CartActionTypes.DECREASE_QUANTITY,
    payload:item
})

export const clearCart=()=>({
    type:CartActionTypes.CLEAR_CART
})
export const updateCartInFirebase =()=>({
    type:CartActionTypes.UPDATE_CART_IN_FIREBASE
})
export const setCartFromfirebase = cartItems =>({
    type:CartActionTypes.SET_CART_FROM_FIREBASE,
    payload:cartItems
})