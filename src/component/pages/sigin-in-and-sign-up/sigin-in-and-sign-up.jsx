import React from 'react';
import './sigin-in-and-sign-up.scss';
import SignIn from '../../sign-in/sign-in';
import SignUp from '../../sign-up/sign-up';

const SignInSignUpPage =() =>(
    <div className="sign-in-and-sign-up">
        <SignIn/>
        <SignUp/>
    </div>

);
export default SignInSignUpPage;