const _ = require('underscore');
const http = require('http');

function getLottoData(drwNo){
  const url = `http://www.nlotto.co.kr/common.do?method=getLottoNumber&drwNo=${drwNo}`
  return new Promise((resolve, reject) => {
    http.get(url, res => {
      let buff = '';
      res.on('data', chunk => {
        buff += chunk;
      });
      
      res.on('end', () => {
        let lottoData = JSON.parse(buff)
        const realNumbers = [];
        let bnusNo = 0;
        for(const [key, value] of Object.entries(lottoData)) {
          if (key.includes('drwtNo')) realNumbers.push(value)
          else if(key === 'bnusNo') bnusNo = value;
          resolve({ bnusNo: bnusNo, realNumbers: realNumbers.sort() });
        };
      });
    });
  });
}

module.exports = getLottoData;