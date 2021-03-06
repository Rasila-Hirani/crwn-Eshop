import React from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from '../../redux/user/user.selector';
import { selectCartHidden } from '../../redux/cart/cart.selector';

import {ReactComponent as Logo} from '../../assests/crown.svg'
import CartIcon from '../cart-icon/cart-icon';
import CartDropdown from '../cart-dropdown/cart-dropdown';
import { signOutStart } from '../../redux/user/userAction';
import {
    HeaderContainer,
    LogoContainer,
    OptionsContainer,
    OptionLink
  } from './header.styles';

const Header =({currentUser, hidden,signOutStart}) =>(
    <HeaderContainer>
    <LogoContainer to='/'>
      <Logo className='logo' />
    </LogoContainer>
    <OptionsContainer>
      <OptionLink to='/shop'>SHOP</OptionLink>
      <OptionLink to='/shop'>CONTACT</OptionLink>
      {currentUser ? (
        <OptionLink as='div' onClick={signOutStart}>
          SIGN OUT
        </OptionLink>
      ) : (
        <OptionLink to='/signin'>SIGN IN</OptionLink>
      )}
      <CartIcon />
    </OptionsContainer>
    {hidden ? null : <CartDropdown />}
  </HeaderContainer>
    
);
const mapStateTopProps =createStructuredSelector({
    currentUser:selectCurrentUser,
    hidden:selectCartHidden
});
const mapDispatchToProps =dispatch =>({
    signOutStart:()=>dispatch(signOutStart())
})
export default connect(mapStateTopProps,mapDispatchToProps)(Header);

