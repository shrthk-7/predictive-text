import SpellCheck from "./spellChecker";
import "./style.css";

const outputEl = document.querySelector(".text-output");
const inputEl = document.querySelector(".text-input");
const submitBtn = document.querySelector(".text-submit");

submitBtn.addEventListener("click", () => {
  const inputString = inputEl.value;
  if (inputString === "") {
    outputEl.innerText = "";
    return;
  }
  const possibleWords = SpellCheck(inputString);
  outputEl.innerText = "";
  for (const word of possibleWords.slice(0, 10)) {
    outputEl.innerText += `\n${word}`;
  }
});
