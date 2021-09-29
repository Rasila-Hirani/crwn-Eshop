import React,{useState} from 'react';
import { connect } from 'react-redux';
import FormInput from '../form-input/form-input';
import CustomButton from '../custom-button/custom-button';
import {signUpStart} from '../../redux/user/userAction';

import './sign-up.scss';


const SignUp =({signUpStart})=>{
    const [userCredentials,setCredentials] = useState({
        displayName:'',
        email:'', 
        password:'', 
        confirmPassword:''})
    const {displayName, email,password,confirmPassword}=userCredentials;
    
    const handleSubmit = async event =>{
        event.preventDefault();
        if(password !== confirmPassword){
            alert("passwords don't match");
            return;
        }
        signUpStart(email,password,displayName);
        
    }
   const handleChange = event =>{
        const {name,value} = event.target;
        setCredentials({...userCredentials,[name]:value});
    }
  
        return(
            <div className="sign-up">
                <h2 className="title">I do not have account.</h2>
                <span>Sign up with your email and password</span>
                <form className="sign-up-form" onSubmit={handleSubmit}>
                    <FormInput 
                        type="text"
                        name="displayName"
                        label="Display Name"
                        value={displayName}
                        handleChange={handleChange}
                        required
                    />
                <FormInput 
                        name="email" 
                        type="email" 
                        label="Email"
                        value={email} 
                        handleChange={handleChange}
                        required />
                 <FormInput 
                        name="password" 
                        type="password" 
                        label="Password"
                        value={password} 
                        handleChange={handleChange}
                        required />
                 <FormInput 
                        name="confirmPassword" 
                        type="password" 
                        label="Confirm Password"
                        value={confirmPassword} 
                        handleChange={handleChange}
                        required />
                <CustomButton type="submit">SIGN UP</CustomButton>
                </form>
            </div>
        );
    
}
const mapDispatchToProps =dispatch =>({
    signUpStart:(email,password,displayName)=>dispatch(signUpStart({email,password,displayName}))
})
export default connect(null,mapDispatchToProps)(SignUp);