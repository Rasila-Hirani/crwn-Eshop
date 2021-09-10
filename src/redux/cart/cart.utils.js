export const addItemTocart=(prevCartItems, cartItemToAdd) =>{
    const existingCartItem  = prevCartItems.find(cartItem => cartItem.id === cartItemToAdd.id);
    if(existingCartItem){
        return prevCartItems.map(cartItem =>
            cartItem.id === cartItemToAdd.id
            ?{...cartItem,quantity: cartItem.quantity + 1}
            : cartItem
        )
    } 
    return [...prevCartItems, {...cartItemToAdd,quantity :1}]
}