const getWeather = async () => {};
getWeather();

const formField = document.querySelector("form");
const inputField = document.querySelector("input");
let firstParagraph = document.querySelector("#one-1");
let secondParagraph = document.querySelector("#two-2");

formField.addEventListener("submit", async (e) => {
  try {
    e.preventDefault();
    const location = inputField.value;
    firstParagraph.textContent = "...Loading";
    secondParagraph.textContent = "";
    if (!location) {
      firstParagraph.textContent = "Please provide a location";
    }
    const response = await fetch(`weather?address=${location}`);
    const data = await response.json();
    firstParagraph.textContent = data.location;
    secondParagraph.textContent = data.forecast;
  } catch (error) {
    firstPargaraph.textContent = "Error has been occured.Try Again";
  }
});
