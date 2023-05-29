import trie from "./trie.js";

const MAX_EDIT_DISTANCE = 2;

/**
 * Takes a single string as an input and
 * returns all string [in the dictionary] that
 * are within a fixed edit distance [set to 2]
 *
 * See https://en.wikipedia.org/wiki/Levenshtein_distance for more information
 *
 * @param 	{string} 				word
 * @returns {string[]}
 */

const SpellCheck = (word = "") => {
  const visited = new Set();

  const dfsCheck = (index, node, distance, wordYet) => {
    const res = [];

    // --------------------- BASE CASES -------------------

    if (distance > MAX_EDIT_DISTANCE) return res;
    if (visited.has(wordYet)) return res;
    visited.add(wordYet);

    // --------------------- VALID WORDS -------------------

    if (node.wordEnds) {
      const addDist = word.length - wordYet.length;
      if (distance + addDist <= MAX_EDIT_DISTANCE)
        res.push([wordYet, distance + addDist]);
    }
    if (index === word.length) return res;

    if (node.children.has(word[index])) {
      const nextNode = node.children.get(word[index]);
      res.push(
        ...dfsCheck(index + 1, nextNode, distance, wordYet + word[index])
      );
    }

    // --------------- ----- TYPING ERRORS ----------------

    /*
			Substitution Errors
			i.e one letter gets erroneously replaced by another letter
			eg, hello -> sello
		*/
    node.children.forEach((child) => {
      res.push(
        ...dfsCheck(index + 1, child, distance + 1, wordYet + child.value)
      );
    });

    /*
			Insertion Errors
			i.e one letter is needlessly inserted
			eg, hello -> heello
		*/
    res.push(...dfsCheck(index + 1, node, distance + 1, wordYet));

    /*
			Omission Errors
			i.e one letter get omitted
			eg, hello -> helo
		*/
    node.children.forEach((child) => {
      res.push(...dfsCheck(index, child, distance + 1, wordYet + child.value));
    });

    return res;
  };
  const wordList = dfsCheck(0, trie.root, 0, "");

  /*
		Sorting according to edit distance
		(bucket sort has been used for simplicity)
	*/
  const result = [[], [], []];
  wordList.forEach(([word, distance]) => {
    result[distance].push(word);
  });

  return [...result[0], ...result[1], ...result[2]];
};

export default SpellCheck;
