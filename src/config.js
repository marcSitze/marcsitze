require('dotenv').config();
const config =  {
  API: process.env.API_URL || 'https://portfolio-api-9mgm.onrender.com'
};

console.log('process.env: ', process.env )

export default config;