import SpellCheck from "./spellChecker";
import { loadingWords } from "./trie";
import "./style.css";

const outputEl = document.querySelector(".text-output");
const inputEl = document.querySelector(".text-input");
const submitBtn = document.querySelector(".text-submit");

(async function () {
  await loadingWords();
})();

submitBtn.addEventListener("click", async () => {
  const words = inputEl.innerText.split(" ");
  outputEl.innerHTML = "";

  for (let word of words) {
    word = word.toLowerCase().replace(/[^\w\s\']|_/g, "");

    const wordSpan = document.createElement("span");
    outputEl.appendChild(wordSpan);
    wordSpan.classList.add("text-output-word");
    wordSpan.innerText = word;

    const possibleWords = SpellCheck(word);
    if (possibleWords.includes(word)) continue;
    wordSpan.classList.add("incorrect");
    wordSpan.addEventListener("click", () => {
      wordSpan.classList.toggle("is-open");
    });

    const suggestions = document.createElement("ul");
    wordSpan.appendChild(suggestions);
    suggestions.classList.add("suggestions");

    for (const word of possibleWords) {
      const listItem = document.createElement("li");
      suggestions.appendChild(listItem);
      listItem.innerText = word;
    }
  }
});
