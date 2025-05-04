const axios = require('axios');

const BASE_CURRENCY = 'LKR'; 
const API_KEY = '94102d7009e95e8a5db447f0'; 
const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${BASE_CURRENCY}`;

let exchangeRatesCache = {};

const fetchExchangeRates = async () => {
  try {
    const response = await axios.get(API_URL);
    exchangeRatesCache = response.data.conversion_rates;
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
  }
};

// Fetch exchange rates initially
fetchExchangeRates();

// Fetch exchange rates every 6 hours
setInterval(fetchExchangeRates, 6 * 60 * 60 * 1000);

const convertCurrencyRates = async (amount, fromCurrency, toCurrency) => {
    if (!exchangeRatesCache[fromCurrency] || !exchangeRatesCache[toCurrency]) {
      console.warn(`Exchange rate for ${fromCurrency} or ${toCurrency} not available.`);
      return null;
    }
    const baseAmount = amount / exchangeRatesCache[fromCurrency];
    return baseAmount;
};

module.exports = {
  getExchangeRate: (currency = null) => currency ? exchangeRatesCache[currency] || null : exchangeRatesCache,
  fetchExchangeRates,
  convertCurrencyRates
};
