const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

//middleware
app.use(express.json());
app.use(cors());

//all currencies
app.get('/getAllCurrencies', async(req, res)=>{
    const namesURL = `https://openexchangerates.org/api/currencies.json?prettyprint=false&show_alternative=false&show_inactive=false&app_id=fcd70db21c6f4a74ba874a629e40cfa9`;
    try{
        const namesResponse = await axios.get(namesURL);
        const nameData = namesResponse.data;
    
        return res.json(nameData);

    }catch(err){
        console.error(err);
    }
})

//convertion
app.get('/getConvertedData', async(req, res)=>{
    const {date, sourceCurrency, targetCurrency, amountToConvert} = req.query;
    try{
        const currencyDataURL = `https://openexchangerates.org/api/historical/${date}.json?app_id=fcd70db21c6f4a74ba874a629e40cfa9`;
        const dataResponse = await axios.get(currencyDataURL);
        const rates = dataResponse.data.rates;

        //getting rates
        const sourceRate = rates[sourceCurrency];
        const targetRate = rates[targetCurrency];
        
        //final output
        const convertedAmount = (targetRate/sourceRate) * amountToConvert;
        return res.json(convertedAmount);

    }catch(err){
        console.error(err);
    }
})

//listen to a port
app.listen(5000 , () =>{
    console.log("Server Started");
})

