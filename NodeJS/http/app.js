const http = require('http');
const url = 'http://csszengarden.com';

http.get(url, (response) => {
  let chunkCount = 0;

  response.on('data', (chunk) => {
    chunkCount++;
    console.log(chunk.toString('utf8'))
  });

  response.on('end', () => {
    console.log(`res 가 ${chunkCount}개로 나눠졌어요.`)
  });
});