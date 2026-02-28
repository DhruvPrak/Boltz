// ===============================
// Binary Search Tree - Core Logic
// ===============================

// Node Structure
class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

// BST Class
class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    // ===============================
    // INSERT (Recursive)
    // ===============================
    insert(value) {
        this.root = this._insertRecursive(this.root, value);
    }

    _insertRecursive(node, value) {
        if (node === null) {
            return new TreeNode(value);
        }

        if (value < node.value) {
            node.left = this._insertRecursive(node.left, value);
        } else if (value > node.value) {
            node.right = this._insertRecursive(node.right, value);
        }

        return node;
    }

    // ===============================
    // SEARCH (Recursive)
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
    // INORDER Traversal
    // ===============================
    inorder() {
        const result = [];
        this._inorderRecursive(this.root, result);
        return result;
    }

    _inorderRecursive(node, result) {
        if (node === null) return;

        this._inorderRecursive(node.left, result);
        result.push(node.value);
        this._inorderRecursive(node.right, result);
    }

    // ===============================
    // PREORDER Traversal
    // ===============================
    preorder() {
        const result = [];
        this._preorderRecursive(this.root, result);
        return result;
    }

    _preorderRecursive(node, result) {
        if (node === null) return;

        result.push(node.value);
        this._preorderRecursive(node.left, result);
        this._preorderRecursive(node.right, result);
    }

    // ===============================
    // POSTORDER Traversal
    // ===============================
    postorder() {
        const result = [];
        this._postorderRecursive(this.root, result);
        return result;
    }

    _postorderRecursive(node, result) {
        if (node === null) return;

        this._postorderRecursive(node.left, result);
        this._postorderRecursive(node.right, result);
        result.push(node.value);
    }
    // ===============================
// DELETE (Recursive)
// ===============================
delete(value) {
    this.root = this._deleteRecursive(this.root, value);
}

_deleteRecursive(node, value) {
    if (node === null) return null;

    // Step 1: Find node
    if (value < node.value) {
        node.left = this._deleteRecursive(node.left, value);
    } else if (value > node.value) {
        node.right = this._deleteRecursive(node.right, value);
    } else {
        // Node found

        // Case 1: No child
        if (node.left === null && node.right === null) {
            return null;
        }

        // Case 2: One child
        if (node.left === null) {
            return node.right;
        }

        if (node.right === null) {
            return node.left;
        }

        // Case 3: Two children
        let successor = this._findMin(node.right);
        node.value = successor.value;
        node.right = this._deleteRecursive(node.right, successor.value);
    }

    return node;
}

// Helper function to find minimum node
_findMin(node) {
    while (node.left !== null) {
        node = node.left;
    }
    return node;
}
}

// Export (if using modules)
// export default BinarySearchTree;