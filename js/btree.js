// ===============================
// B-Tree Node (Order 3)
// ===============================

class BTreeNode {
    constructor(leaf = false) {
        this.keys = [];        // Stores keys (max 2 for order 3)
        this.children = [];    // Child pointers
        this.leaf = leaf;      // Is this node a leaf?
    }
}


// ===============================
// B-Tree (Order 3)
// ===============================

class BTree {
    constructor() {
        this.root = new BTreeNode(true);
        this.maxKeys = 2; // For order 3 → max keys = 2
    }

    insert(key) {

        let root = this.root;

        // If root is full → split first
        if (root.keys.length === this.maxKeys) {

            let newRoot = new BTreeNode(false);
            newRoot.children.push(root);

            this._splitChild(newRoot, 0);

            this.root = newRoot;
        }

        this._insertNonFull(this.root, key);
    }

    _insertNonFull(node, key) {

        let i = node.keys.length - 1;

        if (node.leaf) {

            // Insert in sorted order
            node.keys.push(null);
            while (i >= 0 && key < node.keys[i]) {
                node.keys[i + 1] = node.keys[i];
                i--;
            }
            node.keys[i + 1] = key;

        } else {

            while (i >= 0 && key < node.keys[i]) {
                i--;
            }

            i++;

            if (node.children[i].keys.length === this.maxKeys) {

                this._splitChild(node, i);

                if (key > node.keys[i]) {
                    i++;
                }
            }

            this._insertNonFull(node.children[i], key);
        }
    }

    _splitChild(parent, index) {

        let fullNode = parent.children[index];
        let newNode = new BTreeNode(fullNode.leaf);

        // Middle key (index 1 for order 3)
        let middleKey = fullNode.keys[1];

        // Right side keys go to new node
        newNode.keys = fullNode.keys.slice(2);
        fullNode.keys = fullNode.keys.slice(0, 1);

        if (!fullNode.leaf) {
            newNode.children = fullNode.children.slice(2);
            fullNode.children = fullNode.children.slice(0, 2);
        }

        parent.keys.splice(index, 0, middleKey);
        parent.children.splice(index + 1, 0, newNode);
    }
    // ===============================
// B-Tree SEARCH
// ===============================
search(key, node = this.root) {

    let i = 0;

    // Find first key >= search key
    while (i < node.keys.length && key > node.keys[i]) {
        i++;
    }

    // If key found in this node
    if (i < node.keys.length && key === node.keys[i]) {
        return true;
    }

    // If this is leaf, key not found
    if (node.leaf) {
        return false;
    }

    // Recur on correct child
    return this.search(key, node.children[i]);
}
}