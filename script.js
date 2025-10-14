let button = document.getElementById("convertBtn");

button.onclick = function(){
  let fromCurrency = document.getElementById("from").value.toUpperCase();
  let toCurrency = document.getElementById("to").value.toUpperCase();
  let amount = document.getElementById("amount").value;

  let url = "https://open.er-api.com/v6/latest/" + fromCurrency;
  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      let rate = data.rates[toCurrency];

      if (rate) {
        let result = amount * rate;
        document.getElementById("result").innerText = amount + " " + fromCurrency + " = " + result.toFixed(2) + " " + toCurrency;
      } else {
        document.getElementById("result").innerText = "Invalid currency code!";
      }
    })
    .catch(function() {
      document.getElementById("result").innerText = "Error fetching data.";
    });
};
