import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {toggeleCartHidden} from '../../redux/cart/cartAction';
import { selectCartItemsCount } from '../../redux/cart/cart.selector';


import {
    CartContainer,
    ShoppingIcon,
    ItemCountContainer
  } from './cart-icon.styles';

const CartIcon =({toggeleCartHidden,itemCount})=>(
  
    <CartContainer onClick={toggeleCartHidden}>
    <ShoppingIcon />
    <ItemCountContainer>{itemCount}</ItemCountContainer>
  </CartContainer>
)

const mapStateToProps =createStructuredSelector({
    itemCount : selectCartItemsCount
})
const mapDispatchToProps =(dispatch)=>({
    toggeleCartHidden:()=>dispatch(toggeleCartHidden())
})
export default connect(mapStateToProps,mapDispatchToProps) (CartIcon);