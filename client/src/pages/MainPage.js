import React, { useEffect, useState } from "react";
import axios from "axios"

export default function MainPage() {
  //states for form fields
  const[date, setDate] = useState(null);
  const[sourceCurrency, setSourceCurrency] = useState('');
  const[targetCurrency, setTargetCurrency] =  useState('');
  const[amountToConvert, setAmountToConvert] = useState(0);
  const[convertedAmount, setConvertedAmount] = useState(0);
  const[currencyNames, setCurrencyNames] = useState([]);

  //get all currency names
  const getCurrencyNames = async(e) => {
    try{
      const response = await axios.get(
        "http://localhost:5000/getAllCurrencies"
      );
      setCurrencyNames(response.data)
      // console.log(currencyNames)
    }catch(err){
      console.error(err);
    }
  };

  const getConvertedData = async(e) =>{
    try{
      const response = await axios.get(
        "http://localhost:5000/getConvertedData",{
          params:{
            date,
            sourceCurrency,
            targetCurrency,
            amountToConvert
          },
        });

        setConvertedAmount(response.data)

    }catch(err){
      console.error(err)
    }
  }

  useEffect(()=> {
    getCurrencyNames();
    console.log(currencyNames)
  },[])

  //handle submit
  const handleSubmit = (e) =>{
    e.preventDefault();
    getConvertedData()
    console.log(date,sourceCurrency)
  }
  

  return (
    <div>
      <h1 className=" lg:mx-32 text-5xl font-bold text-blue-500">
        Convert Your Currecny
      </h1>
      <p className=" lg:mx-32 opacity-40 py-5">
        Welcome to currency converter. You can convert any currency type to
        another using this apllication especially based on the date.
      </p>

      <div className="mt-5 flex items-center justify-center flex-col">
        <section className="w-full lg:w-1/2">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor={date}
                className="block mb-2 text-sm font-medium text-white-900 dark:text-white"
              >
                Date
              </label>

              <input
              onChange={(e)=> setDate(e.target.value)}
                type="date"
                id={date}
                name={date}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor={sourceCurrency}
                className="block mb-2 text-sm font-medium text-white-900 dark:text-white"
              >
                Source Currency
              </label>

              <select 
              onChange={(e) => setSourceCurrency(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              id={sourceCurrency}
              name={sourceCurrency}
              value={sourceCurrency}>
                <option value="">Select the source currency</option>
                {Object.keys(currencyNames).map((currency)=> (
                  <option className=" p-1" key={currency} value={currency}>
                    {currencyNames[currency]}
                  </option> 
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor={targetCurrency}
                className="block mb-2 text-sm font-medium text-white-900 dark:text-white"
              >
                Target Currency
              </label>

              <select 
              onChange={(e)=> setTargetCurrency(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              id={targetCurrency}
              name={targetCurrency}
              value={targetCurrency}>
                <option value="">Select the target currency</option>
                {Object.keys(currencyNames).map((currency)=> (
                  <option className=" p-1" key={currency} value={currency}>
                    {currencyNames[currency]}
                  </option> 
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor={amountToConvert}
                className="block mb-2 text-sm font-medium text-white-900 dark:text-white"
              >
                Amount to convert
              </label>

              <input
              onChange={(e)=> setAmountToConvert(e.target.value)}
                type="text"
                id={amountToConvert}
                name={amountToConvert}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter Your amount to convert"
                required
              />
            </div>

            <button
            //   type="button"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Get the target currency
            </button>
          </form>
        </section>
        {convertedAmount.toFixed(2)}
      </div>
    </div>
  );
}
