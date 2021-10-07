import React from  'react';
import { withRouter } from 'react-router-dom'; 
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CartItem from '../cart-item/cart-item';
import {toggeleCartHidden} from '../../redux/cart/cartAction';
import { selectCartItems } from '../../redux/cart/cart.selector';

import {
    CartDropdownContainer,
    CartDropdownButton,
    EmptyMessageContainer,
    CartItemsContainer
  } from './cart-dropdown.styles';
const CartDropdown =({cartItems,history,dispatch})=>(
  
    <CartDropdownContainer>
    <CartItemsContainer>
      {cartItems.length ? (
        cartItems.map(cartItem => (
          <CartItem key={cartItem.id} item={cartItem} />
        ))
      ) : (
        <EmptyMessageContainer>Your cart is empty</EmptyMessageContainer>
      )}
    </CartItemsContainer>
    <CartDropdownButton
      onClick={() => {
        history.push('/checkout');
        dispatch(toggeleCartHidden());
      }}
    >
      GO TO CHECKOUT
    </CartDropdownButton>
  </CartDropdownContainer>
);
const mapStateToProps =createStructuredSelector({
    cartItems :selectCartItems
})

export default withRouter(connect(mapStateToProps)(CartDropdown));