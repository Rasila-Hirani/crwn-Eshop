import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';

import './App.css';
import HomePage from './component/pages/homepage/homepage';
import Header from './component/header/header';
import ShopPage from './component/pages/shop/shop';
import {auth, createUserProfileDocument} from './firebase/firebase.utils';
import SignInSignUpPage from './component/pages/sigin-in-and-sign-up/sigin-in-and-sign-up';
import {setCurrentUser} from './redux/actions/userAction';

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
          <Route path='/signin' component={SignInSignUpPage}/>
        </Switch>
       
      </div>
    );
  }
  
}
const mapDispatchToProps=(dispatch)=>({
  setCurrentUser: user => dispatch(setCurrentUser(user))

})
export default connect(null,mapDispatchToProps)(App);
