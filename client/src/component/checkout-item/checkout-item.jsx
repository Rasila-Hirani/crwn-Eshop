import React from'react';
import { connect } from 'react-redux';
import { removeCartItem,descreaseQuantity,addCartItem } from '../../redux/cart/cartAction';
import './checkout-item.scss';

const CheckoutItem =({item,clearItem,addItem,descreaseQuantity})=>{
    const {id,imageUrl,name,price,quantity} = item
    
    return(
    <div className="checkout-item">
        <div className="image-container">
            <img src={imageUrl}  alt='item'/>
        </div>
        <div className="name">{name}</div>
        <div className="quantity">
            <div className="arrow" onClick={()=>descreaseQuantity(item)}> &#10094;</div>
            <span className="value">{quantity}</span>
            <div className="arrow" onClick={()=>addItem(item)}> &#10095;</div>
        </div>
        <div className="price">{price}</div>
        <div className="remove-button" onClick={()=>clearItem(id)}>&#10005;</div>
    </div>
)};
const mapDispatchToProps =(dispatch)=>({
    clearItem:id=>dispatch(removeCartItem(id)),
    addItem :item =>dispatch(addCartItem(item)),
    descreaseQuantity: item => dispatch(descreaseQuantity(item))
})
export default connect(null,mapDispatchToProps)(CheckoutItem);