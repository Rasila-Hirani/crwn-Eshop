import React from 'react';
import { connect } from 'react-redux';
import {toggeleCartHidden} from '../../redux/cart/cartAction';
import { selectCartItemsCount } from '../../redux/cart/cart.selector';
import {ReactComponent as ShoppingIcon} from '../../assests/shopping-bag.svg';
import './cart-icon.scss';

const CartIcon =({toggeleCartHidden,itemCount})=>(
    <div className="cart-icon" onClick={toggeleCartHidden}>
        <ShoppingIcon className="shopping-icon"/>
        <span className="item-count">{itemCount}</span>

    </div>
)

const mapStateToProps =(state)=>({
    itemCount : selectCartItemsCount(state)
})
const mapDispatchToProps =(dispatch)=>({
    toggeleCartHidden:()=>dispatch(toggeleCartHidden())
})
export default connect(mapStateToProps,mapDispatchToProps) (CartIcon);