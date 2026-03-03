class TrieNode {
    constructor() {
        this.children = {};
        this.isEndOfWord = false;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    insert(word) {
        let current = this.root;

        for (let char of word) {

            // If character path doesn't exist, create it
            if (!current.children[char]) {
                current.children[char] = new TrieNode();
            }

            // Move to next node
            current = current.children[char];
        }

        // Mark end of word
        current.isEndOfWord = true;
    }
    search(word) {
    let current = this.root;

    for (let char of word) {

        // If path doesn't exist → word not found
        if (!current.children[char]) {
            return false;
        }

        // Move deeper
        current = current.children[char];
    }

    // Only true if it is marked as full word
    return current.isEndOfWord;
}
startsWith(prefix) {
    let current = this.root;

    for (let char of prefix) {

        // If path doesn't exist → no word with this prefix
        if (!current.children[char]) {
            return false;
        }

        current = current.children[char];
    }

    // If we successfully traversed prefix
    return true;
}
getWordsWithPrefix(prefix) {
    let current = this.root;

    // Step 1: Move to end of prefix
    for (let char of prefix) {
        if (!current.children[char]) {
            return [];
        }
        current = current.children[char];
    }

    let results = [];

    // Step 2: DFS to collect words
    const dfs = (node, path) => {

        if (node.isEndOfWord) {
            results.push(path);
        }

        for (let char in node.children) {
            dfs(node.children[char], path + char);
        }
    };

    dfs(current, prefix);

    return results;
}
delete(word) {

    const deleteHelper = (node, word, depth) => {

        if (!node) return false;

        // Base case: reached end of word
        if (depth === word.length) {

            if (!node.isEndOfWord) return false;

            node.isEndOfWord = false;

            // If node has no children, it can be deleted
            return Object.keys(node.children).length === 0;
        }

        let char = word[depth];

        if (!node.children[char]) return false;

        let shouldDeleteChild = deleteHelper(
            node.children[char],
            word,
            depth + 1
        );

        if (shouldDeleteChild) {
            delete node.children[char];

            // Return true if:
            // - no children left
       
            // - not end of another word
            return (
                Object.keys(node.children).length === 0 &&
                !node.isEndOfWord
            );
        }

        return false;
    };

    deleteHelper(this.root, word, 0);
}
}