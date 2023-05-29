import dictionary from "./dictionary.json" assert { type: "json" };

class TrieNode {
  constructor(value = "") {
    this.value = value;
    this.children = new Map();
    this.wordEnds = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert = function (word = "") {
    let currentNode = this.root;
    for (const letter of word) {
      if (!currentNode.children.has(letter)) {
        currentNode.children.set(letter, new TrieNode(letter));
      }
      currentNode = currentNode.children.get(letter);
    }
    currentNode.wordEnds = true;
    return currentNode;
  };

  check = function (word = "") {
    let currentNode = this.root;
    for (const letter of word) {
      if (!currentNode.children.has(letter)) return false;
      currentNode = currentNode.children.get(letter);
    }
    return currentNode.wordEnds;
  };

  view = function (root = this.root, word = "", wordList = []) {
    if (root.wordEnds) wordList.push(word);
    root.children.forEach((child) => {
      this.view(child, word + child.value, wordList);
    });
    return wordList;
  };

  getWordsWithPrefix = function (prefix = "") {
    let currentNode = this.root;
    for (const letter of prefix) {
      if (!currentNode.children.has(letter)) return [];
      currentNode = currentNode.children.get(letter);
    }
    return this.view(currentNode, prefix);
  };
}

const trie = new Trie();

for (const word of dictionary) {
  trie.insert(word);
}

export default trie;
