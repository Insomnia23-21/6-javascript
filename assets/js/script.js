const clpAmountInput = document.getElementById("clp-amount");
const currencySelect = document.getElementById("currency-select");
const convertButton = document.getElementById("convert-button");
const resultElement = document.getElementById("result");

convertButton.addEventListener("click", () => {
  const clpAmount = parseFloat(clpAmountInput.value);
  const selectedCurrency = currencySelect.value;

  fetch("https://mindicador.cl/api")
    .then((response) => response.json())
    .then((data) => {
      let exchangeRate;
      if (selectedCurrency === "USD") {
        exchangeRate = data.dolar.valor;
      } else if (selectedCurrency === "EUR") {
        exchangeRate = data.euro.valor;
      }

      const convertedAmount = clpAmount / exchangeRate;
      resultElement.textContent = `Resultado: ${convertedAmount.toFixed(
        2
      )} ${selectedCurrency}`;
    })
    .catch((error) => {
      console.error("Error fetching exchange rate:", error);
      resultElement.textContent = "Error al obtener el tipo de cambio.";
    });
});
