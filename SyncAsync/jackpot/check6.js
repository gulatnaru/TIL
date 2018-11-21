const myNumbers = require('./pick6');
const getRealData = require('./get6');

getRealData(800)
  .then(data => {
    console.log(data.bnusNo);
    console.log(data.realNumbers);
    console.log(myNumbers);
  })