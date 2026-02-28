class TreeNode {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class BinaryTree {
  constructor() {
    this.root = null;
  }

  inorder(node) {
    if (node === null) return;
    this.inorder(node.left);
    console.log(node.data);
    this.inorder(node.right);
  }

  preorder(node) {
    if (node === null) return;
    console.log(node.data);
    this.preorder(node.left);
    this.preorder(node.right);
  }

  postorder(node) {
    if (node === null) return;
    this.postorder(node.left);
    this.postorder(node.right);
    console.log(node.data);
  }
}

const tree = new BinaryTree();

tree.root = new TreeNode(10);
tree.root.left = new TreeNode(5);
tree.root.right = new TreeNode(20);
tree.root.left.left = new TreeNode(2);
tree.root.left.right = new TreeNode(8);

console.log("Inorder:");
tree.inorder(tree.root);

console.log("Preorder:");
tree.preorder(tree.root);

console.log("Postorder:");
tree.postorder(tree.root);