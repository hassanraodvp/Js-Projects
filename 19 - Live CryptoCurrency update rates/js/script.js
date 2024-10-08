let btc = document.getElementById("btc");
let eth = document.getElementById("eth");
let doge = document.getElementById("doge");

let settings = {
    "async": "true",
    "scrossDomain": "true",
    "url": "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Cdogecoin&vs_currencies=usd",
    "method": "GET",
    "headers": {}
  }

$.ajax(settings).done(function (response) {
    btc.innerHTML = response.bitcoin.usd;
    eth.innerHTML = response.ethereum.usd;
    doge.innerHTML = response.dogecoin.usd;
});