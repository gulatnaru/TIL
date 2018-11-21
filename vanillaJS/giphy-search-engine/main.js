// 1. <input> 태그 안의 값을 잡는다.
const button = document.querySelector("#js-button");
const inputArea = document.querySelector("#js-input");
const resultArea = document.querySelector("#result-area");

button.addEventListener("click", e => {
  searchAndPush(inputArea.value);
});

inputArea.addEventListener("keypress", e => {
  if (e.which === 13) searchAndPush(inputArea.value);
});

const searchAndPush = (keyword) => {
  // 2. API 를 활용해 data 를 받는다. 그리고 가공한다.
  const API_KEY = "pETal56SsBpImEECWh6AcSOUlSZfg7zU";
  const URL = `http://api.giphy.com/v1/gifs/search?q=${keyword}&api_key=${API_KEY}`;

  // Ajax request
  const GiphyAJAXCall = new XMLHttpRequest();
  GiphyAJAXCall.open("GET", URL);
  GiphyAJAXCall.send();

  GiphyAJAXCall.addEventListener("load", e => {
    const rawData = e.target.response;
    const parsedData = JSON.parse(rawData);
    pushToDOM(parsedData);
  }); 
};
 
// 3. GIF 파일들을 index.html 에 밀어 넣는다.
const pushToDOM = (parsedData) => {
  resultArea.innerHTML = null;
  const DataSet = parsedData.data;

  DataSet.forEach(imageData => {
    let imageURL = imageData.images.fixed_height.url;
    let alt = imageData.title;
    resultArea.innerHTML += `<img src="${imageURL}" alt='${alt}' />`;
  });
};