import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';


const StripeCheckoutButton =({price})=>{
    const priceForStripe = price * 100 ;
    const publishableKey=process.env.REACT_APP_STRIPE_KEY;
 const onToken =token =>{
       axios({
           url:'payment',
           method:'POST',
           headers:{
               'Content-Type':'application/json',
               'Accept':'application/json'
           },
           data:{
               amount:priceForStripe,
                token
           }
       }).then(response =>{
           alert('Payment successfull !!');
       }).catch(error =>{
           console.log('Payment error: ',error);
           alert('There was an issue with your payment. Please sure you use the provided credit card.')
       })
      
    }
    return(
        <StripeCheckout
        label="Pay Now"
        name="CRWN Clothing Ltd."
        billingAddress
        shippingAddress
        image='https://svgshare.com/i/CUz.svg'
        description={`Your total is ${price}`}
        amount={priceForStripe}
        panelLabel='Pay Now'
        token={onToken}
        stripeKey={publishableKey}
    />
    )
    
}
export default StripeCheckoutButton;