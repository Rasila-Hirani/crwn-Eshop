import React from  'react';
import { connect } from 'react-redux';
import './cart-dropdown.scss';
import CartItem from '../cart-item/cart-item';
import { selectCartItems } from '../../redux/cart/cart.selector';
import CustomButton from '../custom-button/custom-button';

const CartDropdown =({cartItems})=>(
    <div className="cart-dropdown">
        <div className="cart-items">
            {
                cartItems.map(item =>
                    <CartItem key={item.id} item={item}/>
                )
            }
        </div>
        <CustomButton>GO TO CHECKCOUT</CustomButton>
    </div>
);
const mapStateToProps =(state)=>({
    cartItems :selectCartItems(state)
})
export default connect(mapStateToProps)(CartDropdown);