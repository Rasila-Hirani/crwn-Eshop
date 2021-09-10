import React from  'react';
import { withRouter } from 'react-router-dom'; 
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import './cart-dropdown.scss';
import CartItem from '../cart-item/cart-item';
import {toggeleCartHidden} from '../../redux/cart/cartAction';
import { selectCartItems } from '../../redux/cart/cart.selector';
import CustomButton from '../custom-button/custom-button';

const CartDropdown =({cartItems,history,dispatch})=>(
    <div className="cart-dropdown">
        <div className="cart-items">
            {
                cartItems.length?
                (
                cartItems.map(item =>
                    <CartItem key={item.id} item={item}/>
                ))
                :
                <span className="empty-message">Your cart is empty</span>
            }
        </div>
        <CustomButton onClick={()=>{
            dispatch(toggeleCartHidden())
            history.push('/checkout')
            
            }}>GO TO CHECKCOUT</CustomButton>
    </div>
);
const mapStateToProps =createStructuredSelector({
    cartItems :selectCartItems
})

export default withRouter(connect(mapStateToProps)(CartDropdown));