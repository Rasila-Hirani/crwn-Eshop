import React from'react';
import { connect } from 'react-redux';
import { removeCartItem,descreaseQuantity,addCartItem } from '../../redux/cart/cartAction';

import {
    CheckoutItemContainer,
    ImageContainer,
    TextContainer,
    QuantityContainer,
    RemoveButtonContainer
  } from './checkout-item.styles';

const CheckoutItem =({cartItem,clearItem,addItem,descreaseQuantity})=>{
    const {imageUrl,name,price,quantity} = cartItem
    
    return(
 
   
    <CheckoutItemContainer>
    <ImageContainer>
      <img src={imageUrl} alt='item' />
    </ImageContainer>
    <TextContainer>{name}</TextContainer>
    <QuantityContainer>
      <div onClick={() => descreaseQuantity(cartItem)}>&#10094;</div>
      <span>{quantity}</span>
      <div onClick={() => addItem(cartItem)}>&#10095;</div>
    </QuantityContainer>
    <TextContainer>{price}</TextContainer>
    <RemoveButtonContainer onClick={() => clearItem(cartItem)}>
      &#10005;
    </RemoveButtonContainer>
  </CheckoutItemContainer>
)};
const mapDispatchToProps =(dispatch)=>({
    clearItem:id=>dispatch(removeCartItem()),
    addItem :item =>dispatch(addCartItem(item)),
    descreaseQuantity: item => dispatch(descreaseQuantity(item))
})
export default connect(null,mapDispatchToProps)(CheckoutItem);