import "./style.css";
import trie from "./trie";

const outputEl = document.querySelector(".text-output");
const inputEl = document.querySelector(".text-input");

inputEl.addEventListener("input", (e) => {
  if (e.target.value === "") {
    outputEl.innerText = "";
    return;
  }
  const possibleWords = trie.getWordsWithPrefix(e.target.value);
  outputEl.innerText = "";
  for (const word of possibleWords.slice(0, 10)) {
    outputEl.innerText += `\n${word}`;
  }
});
