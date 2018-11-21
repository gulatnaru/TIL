const tvArea = document.querySelector("#js-tv-area");

const animateTV = () => {
  const keywords = [
    'stars',
    'universe',
    'hacking',
  ];

  const keyword = keywords[Math.floor(Math.random() * keywords.length)];

  const API_KEY = "pETal56SsBpImEECWh6AcSOUlSZfg7zU"; // YOUR API KEY`
  const URL = `http://api.giphy.com/v1/gifs/search?q=${keyword}&api_key=${API_KEY}`;

  // AJAX Request
  const GiphyAJAXCall = new XMLHttpRequest();
  GiphyAJAXCall.open("GET", URL);
  GiphyAJAXCall.send();

  GiphyAJAXCall.addEventListener("load", e => {
    const rawData = e.target.response;
    pushTvToDOM(rawData);
  });
};

const pushTvToDOM = data => {
  tvArea.innerHTML = null;
  const parsedData = JSON.parse(data);
  const imgDataSet = parsedData.data;

  let i = 0;
  imgDataSet.forEach(imgData => {
    setTimeout(()=>{
      let imgURL = imgData.images.fixed_height.url;
      tvArea.innerHTML = `<img src="${imgURL}" class="img-center">`;
    }, 3000 * i);
    i++;
  });
};

document.addEventListener('DOMContentLoaded', animateTV);