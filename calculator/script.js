const calc = document.querySelector(".calc");
const result = document.querySelector("#result");

calc.addEventListener("click", function (event) {
  if (!event.target.classList.contains("calc__btn")) return;

  let value = event.target.innerText;

  switch (value) {
    case "Del":
      result.innerText = result.innerText.replace(/.$/, "");
      console.log(result.innerText);
      break;

    case "AC":
      result.innerText = "";
      break;

    case "=":
      result.innerText = eval(result.innerText).toFixed(2);
      break;

    default:
      result.innerText += value;
  }
});
