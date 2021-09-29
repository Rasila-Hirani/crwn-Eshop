import { createSelector } from "reselect";

const selectCart = state => state.cart; // select cart from state

export const selectCartHidden = createSelector(
    [selectCart],
    cart => cart.hidden
)
export const selectCartItems = createSelector(
    [selectCart],
    cart =>cart.cartItems // (In cart component(hidden,cartItems) =>select only cartItems)
)

export const selectCartItemsCount = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce(
        (accQuantity,cartItem)=>accQuantity + cartItem.quantity,
        0)
)

export const selectCartTotal =createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce(
        (accQuantity,cartItem)=>accQuantity + cartItem.quantity * cartItem.price,
        0)
)