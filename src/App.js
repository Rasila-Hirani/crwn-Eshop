import React from 'react';
import {Switch, Route,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.css';
import HomePage from './component/pages/homepage/homepage';
import Header from './component/header/header';
import ShopPage from './component/pages/shop/shop';
import {auth, createUserProfileDocument} from './firebase/firebase.utils';
import SignInSignUpPage from './component/pages/sigin-in-and-sign-up/sigin-in-and-sign-up';
import CheckoutPage from './component/pages/checkout/checkout';
import {setCurrentUser} from './redux/user/userAction';
import {selectCurrentUser} from './redux/user/user.selector';
class App extends React.Component {

  unsubscriveFromAuth=null;

  componentDidMount(){
    const {setCurrentUser} = this.props;
  this.unsubscriveFromAuth = auth.onAuthStateChanged(async user =>{
    if(user){
      const userSnap =await createUserProfileDocument(user);
      setCurrentUser({
        id:userSnap.id,
          ...userSnap.data()
      })

     
    }else{
      setCurrentUser(user)
    }
    })
  }
  componentWillUnmount(){
    this.unsubscriveFromAuth();
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
})
const mapDispatchToProps=(dispatch)=>({
  setCurrentUser: user => dispatch(setCurrentUser(user))

})
export default connect(mapStateTopProps,mapDispatchToProps)(App);
