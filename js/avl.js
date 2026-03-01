// ===============================
// AVL Tree - Node Structure
// ===============================

class AVLNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.height = 1; // Important difference from BST
    }
}

class AVLTree {
    constructor() {
        this.root = null;
    }

    // Utility: Get height
    _getHeight(node) {
        return node ? node.height : 0;
    }

    // Utility: Get balance factor
    _getBalance(node) {
        if (!node) return 0;
        return this._getHeight(node.left) - this._getHeight(node.right);
    }
    // ===============================
// AVL INSERT (Without Rotation)
// ===============================
insert(value) {
    this.root = this._insertRecursive(this.root, value);
}

// ===============================
// AVL INSERT (With Rebalancing)
// ===============================
insert(value) {
    this.root = this._insertRecursive(this.root, value);
}

_insertRecursive(node, value) {

    // 1️⃣ Normal BST insertion
    if (node === null) {
        return new AVLNode(value);
    }

    if (value < node.value) {
        node.left = this._insertRecursive(node.left, value);
    } else if (value > node.value) {
        node.right = this._insertRecursive(node.right, value);
    } else {
        return node; // No duplicates
    }

    // 2️⃣ Update height
    node.height = 1 + Math.max(
        this._getHeight(node.left),
        this._getHeight(node.right)
    );

    // 3️⃣ Get balance factor
    const balance = this._getBalance(node);

    // ===============================
    // 4️⃣ Handle 4 Imbalance Cases
    // ===============================

    // LL Case
    if (balance > 1 && value < node.left.value) {
        return this._rightRotate(node);
    }

    // RR Case
    if (balance < -1 && value > node.right.value) {
        return this._leftRotate(node);
    }

    // LR Case
    if (balance > 1 && value > node.left.value) {
        node.left = this._leftRotate(node.left);
        return this._rightRotate(node);
    }

    // RL Case
    if (balance < -1 && value < node.right.value) {
        node.right = this._rightRotate(node.right);
        return this._leftRotate(node);
    }

    return node;
}

_insertRecursive(node, value) {

    // 1️⃣ Normal BST insertion
    if (node === null) {
        return new AVLNode(value);
    }

    if (value < node.value) {
        node.left = this._insertRecursive(node.left, value);
    } else if (value > node.value) {
        node.right = this._insertRecursive(node.right, value);
    } else {
        return node; // No duplicates allowed
    }

    // 2️⃣ Update height of current node
    node.height = 1 + Math.max(
        this._getHeight(node.left),
        this._getHeight(node.right)
    );

    // 3️⃣ Calculate balance factor (for testing)
    const balance = this._getBalance(node);

    // (We are NOT rotating yet)
    return node;
}
// ===============================
// RIGHT ROTATION
// ===============================
_rightRotate(y) {

    let x = y.left;
    let T2 = x.right;

    // Perform rotation
    x.right = y;
    y.left = T2;

    // Update heights
    y.height = 1 + Math.max(
        this._getHeight(y.left),
        this._getHeight(y.right)
    );

    x.height = 1 + Math.max(
        this._getHeight(x.left),
        this._getHeight(x.right)
    );

    // Return new root
    return x;
}
// ===============================
// LEFT ROTATION
// ===============================
_leftRotate(x) {

    let y = x.right;
    let T2 = y.left;

    // Perform rotation
    y.left = x;
    x.right = T2;

    // Update heights
    x.height = 1 + Math.max(
        this._getHeight(x.left),
        this._getHeight(x.right)
    );

    y.height = 1 + Math.max(
        this._getHeight(y.left),
        this._getHeight(y.right)
    );

    // Return new root
    return y;
}
// ===============================
// AVL SEARCH
// ===============================
search(value) {
    return this._searchRecursive(this.root, value);
}

_searchRecursive(node, value) {

    if (node === null) return false;

    if (value === node.value) return true;

    if (value < node.value) {
        return this._searchRecursive(node.left, value);
    } else {
        return this._searchRecursive(node.right, value);
    }
}
// ===============================
// AVL DELETE
// ===============================
delete(value) {
    this.root = this._deleteRecursive(this.root, value);
}

_deleteRecursive(node, value) {

    // 1️⃣ Normal BST Delete
    if (node === null) return null;

    if (value < node.value) {
        node.left = this._deleteRecursive(node.left, value);
    } 
    else if (value > node.value) {
        node.right = this._deleteRecursive(node.right, value);
    } 
    else {
        // Node found

        // Case 1: No child
        if (node.left === null && node.right === null) {
            return null;
        }

        // Case 2: One child
        if (node.left === null) return node.right;
        if (node.right === null) return node.left;

        // Case 3: Two children
        let successor = this._findMin(node.right);
        node.value = successor.value;
        node.right = this._deleteRecursive(node.right, successor.value);
    }

    // 2️⃣ Update height
    node.height = 1 + Math.max(
        this._getHeight(node.left),
        this._getHeight(node.right)
    );

    // 3️⃣ Get balance factor
    const balance = this._getBalance(node);

    // ===============================
    // 4️⃣ Handle Imbalance Cases
    // ===============================

    // LL Case
    if (balance > 1 && this._getBalance(node.left) >= 0) {
        return this._rightRotate(node);
    }

    // LR Case
    if (balance > 1 && this._getBalance(node.left) < 0) {
        node.left = this._leftRotate(node.left);
        return this._rightRotate(node);
    }

    // RR Case
    if (balance < -1 && this._getBalance(node.right) <= 0) {
        return this._leftRotate(node);
    }

    // RL Case
    if (balance < -1 && this._getBalance(node.right) > 0) {
        node.right = this._rightRotate(node.right);
        return this._leftRotate(node);
    }

    return node;
}

// Helper to find minimum node
_findMin(node) {
    while (node.left !== null) {
        node = node.left;
    }
    return node;
}
}