import React from 'react';
import { connect } from 'react-redux';
import {toggeleCartHidden} from '../../redux/cart/cartAction';
import {ReactComponent as ShoppingIcon} from '../../assests/shopping-bag.svg';
import './cart-icon.scss';

const CartIcon =({toggeleCartHidden})=>(
    <div className="cart-icon" onClick={toggeleCartHidden}>
        <ShoppingIcon className="shopping-icon"/>
        <span className="item-count">0</span>

    </div>
)
const mapDispatchToProps =(dispatch)=>({
    toggeleCartHidden:()=>dispatch(toggeleCartHidden())
})
export default connect(null,mapDispatchToProps) (CartIcon);