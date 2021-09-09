import React from 'react';
import {Switch, Route} from 'react-router-dom'
import './App.css';
import HomePage from './component/pages/homepage/homepage';
import Header from './component/header/header';
import ShopPage from './component/pages/shop/shop';
import {auth, createUserProfileDocument} from './firebase/firebase.utils';
import SignInSignUpPage from './component/pages/sigin-in-and-sign-up/sigin-in-and-sign-up';

class App extends React.Component {
  constructor(){
    super();
    
    this.state={
      currentUser:null
    }
  }
  unsubscriveFromAuth=null;

  componentDidMount(){
  this.unsubscriveFromAuth = auth.onAuthStateChanged(async user =>{
    if(user){
      const userSnap =await createUserProfileDocument(user);
      this.setState({
        currentUser:{
          id:userSnap.id,
          ...userSnap.data()
        }
      })
     
    }else{
      this.setState({currentUser:user})
    }
    })
  }
  componentWillUnmount(){
    this.unsubscriveFromAuth();
  }
  render(){
    return (
      <div>
        
        <Header currentUser={this.state.currentUser}/>
        <Switch>
          <Route path='/' component={HomePage} exact/>
          <Route path='/shop' component={ShopPage} />
          <Route path='/signin' component={SignInSignUpPage}/>
        </Switch>
       
      </div>
    );
  }
  
}

export default App;
