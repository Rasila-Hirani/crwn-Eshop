const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();

if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extends:true}));
app.use(cors());



if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname,'client/build')))
    app.get('*',function(req,res){
        res.sendFile(path.join(__dirname,'client/build','index.html'))
    })
}
app.listen(port,error =>{
    if(error) throw error;
    console.log('Server running on port '+ port)
})

app.post('/payment',async(req,res) =>{
    
    try{
        const body = {
            source : req.body.token.id,
            amount:req.body.amount,
            currency:'usd'
        };

        stripe.charges.create(body,(stripeErr,stripeRes)=>{
            if(stripeErr){
                res.status(500).send({error:stripeErr})
            }else{
                res.status(200).send({success:stripeRes})
            }
        })
    }catch(error){
        console.log(error)
        res.status(500).json({message:'Internal server error'})
    }
  
})