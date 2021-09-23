import React from 'react';
import {Switch, Route,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.css';
import HomePage from './component/pages/homepage/homepage';
import Header from './component/header/header';
import ShopPage from './component/pages/shop/shop';

import SignInSignUpPage from './component/pages/sigin-in-and-sign-up/sigin-in-and-sign-up';
import CheckoutPage from './component/pages/checkout/checkout';
import {selectCurrentUser} from './redux/user/user.selector';
import {checkUserSession} from './redux/user/userAction'

class App extends React.Component {



  componentDidMount(){
    const {checkUserSession} = this.props;
    checkUserSession()
   
  }
  componentWillUnmount(){
   
  }
  render(){
    
    return (
      <div>
        
        <Header/>
        <Switch>
          <Route path='/' component={HomePage} exact/>
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route exact 
            path='/signin' 
            
            render={()=> this.props.currentUser?(<Redirect to='/'/>):(<SignInSignUpPage/>)
           
          }/>
        </Switch>
       
      </div>
    );
  }
  
}
const mapStateTopProps =createStructuredSelector({
  currentUser : selectCurrentUser
});

const mapDispatchToProps=dispatch =>({
  checkUserSession:()=>dispatch(checkUserSession())
})

export default connect(mapStateTopProps,mapDispatchToProps)(App);
