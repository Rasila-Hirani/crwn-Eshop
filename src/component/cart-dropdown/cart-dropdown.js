import React from  'react';
import './cart-dropdown.scss';
import CustomButton from '../custom-button/custom-button';

const CartDropdown =()=>(
    <div className="cart-dropdown">
        <div className="cart-item"></div>
        <CustomButton>GO TO CHECKCOUT</CustomButton>
    </div>
);
export default CartDropdown;