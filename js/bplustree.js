// ===============================
// B+ Tree Node (Order 3)
// ===============================

class BPlusNode {
    constructor(leaf = false) {
        this.keys = [];
        this.children = [];
        this.leaf = leaf;
        this.next = null; // link to next leaf (important)
    }
}

// ===============================
// B+ Tree (Order 3)
// ===============================

class BPlusTree {
    constructor() {
        this.root = new BPlusNode(true);
        this.maxKeys = 2; // order 3 → max keys = 2
    }

    insert(key) {

        let root = this.root;

        if (root.keys.length === this.maxKeys) {
            let newRoot = new BPlusNode(false);
            newRoot.children.push(root);

            this._splitChild(newRoot, 0);

            this.root = newRoot;
        }

        this._insertNonFull(this.root, key);
    }

    _insertNonFull(node, key) {

        let i = node.keys.length - 1;

        if (node.leaf) {

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

                if (key >= node.keys[i]) {
                    i++;
                }
            }

            this._insertNonFull(node.children[i], key);
        }
    }

    _splitChild(parent, index) {

        let node = parent.children[index];
        let newNode = new BPlusNode(node.leaf);

        let mid = Math.ceil(node.keys.length / 2);

        // Split keys
        newNode.keys = node.keys.slice(mid);
        node.keys = node.keys.slice(0, mid);

        if (node.leaf) {

            // Leaf linking
            newNode.next = node.next;
            node.next = newNode;

            // Copy first key of new node to parent
            parent.keys.splice(index, 0, newNode.keys[0]);

        } else {

            newNode.children = node.children.slice(mid);
            node.children = node.children.slice(0, mid);

            // Move separator up
            parent.keys.splice(index, 0, newNode.keys.shift());
        }

        parent.children.splice(index + 1, 0, newNode);
    }
    // ===============================
// B+ Tree SEARCH
// ===============================
search(key) {
    let node = this.root;

    // Step 1: Traverse down to leaf
    while (!node.leaf) {
        let i = 0;

        while (i < node.keys.length && key >= node.keys[i]) {
            i++;
        }

        node = node.children[i];
    }

    // Step 2: Search inside leaf
    return node.keys.includes(key);
    }
}