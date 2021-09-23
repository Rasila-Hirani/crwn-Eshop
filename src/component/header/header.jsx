import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from '../../redux/user/user.selector';
import { selectCartHidden } from '../../redux/cart/cart.selector';

import {ReactComponent as Logo} from '../../assests/crown.svg'
import CartIcon from '../cart-icon/cart-icon';
import CartDropdown from '../cart-dropdown/cart-dropdown';
import { signOutStart } from '../../redux/user/userAction';
import './header.scss';

const Header =({currentUser, hidden,signOutStart}) =>(
    <div className="header">
        <Link className="logo-container" to="/">
            <Logo className="logo"/>
        </Link>
        <div className="options">
            <Link className="option" to="/shop">SHOP</Link>
            <Link className="option" to="/contact">CONTACT</Link>
            {
                currentUser?
                <div className="option" onClick={()=>signOutStart()}>SIGN OUT</div>
                :
                <Link className="option" to="/signin">SIGN IN</Link>
            }
           <CartIcon/>
        </div>
        {hidden?null:<CartDropdown/>}
        
    </div>
);
const mapStateTopProps =createStructuredSelector({
    currentUser:selectCurrentUser,
    hidden:selectCartHidden
});
const mapDispatchToProps =dispatch =>({
    signOutStart:()=>dispatch(signOutStart())
})
export default connect(mapStateTopProps,mapDispatchToProps)(Header);

