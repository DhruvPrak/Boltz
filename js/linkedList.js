class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  append(data) {
    const newNode = new Node(data);

    if (this.head === null) {
      this.head = newNode;
      return;
    }

    let current = this.head;

    while (current.next !== null) {
      current = current.next;
    }

    current.next = newNode;
  }

  printList() {
    let current = this.head;
    let result = "";

    while (current !== null) {
      result += current.data + " → ";
      current = current.next;
    }

    result += "null";
    console.log(result);
  }
  insertAtBeginning(data) {
  const newNode = new Node(data);

  newNode.next = this.head;
  this.head = newNode;
}
deleteByValue(value) {
  if (this.head === null) return;

  // If head needs to be deleted
  if (this.head.data === value) {
    this.head = this.head.next;
    return;
  }

  let current = this.head;

  while (current.next !== null && current.next.data !== value) {
    current = current.next;
  }

  if (current.next !== null) {
    current.next = current.next.next;
  }
}
reverse() {
  let prev = null;
  let current = this.head;
  let next = null;

  while (current !== null) {
    next = current.next;     // store next node
    current.next = prev;     // reverse pointer
    prev = current;          // move prev forward
    current = next;          // move current forward
  }

  this.head = prev;          // update head
}
}

/* =====================
   CONNECT TO UI
===================== */

const list = new LinkedList();

const input = document.getElementById("listInput");
const appendBtn = document.getElementById("appendBtn");
const printBtn = document.getElementById("printBtn");
const container = document.getElementById("listContainer");
const insertBtn = document.getElementById("insertBtn");
const deleteBtn = document.getElementById("deleteBtn");
const explanation = document.getElementById("listExplanation");

function drawList() {
  container.innerHTML = "";

  let current = list.head;

  while (current !== null) {
    const nodeWrapper = document.createElement("div");
    nodeWrapper.className = "node";

    const box = document.createElement("div");
    box.className = "node-box";
    box.innerText = current.data;

    const arrow = document.createElement("div");
    arrow.className = "arrow";
    arrow.innerText = "→";

    nodeWrapper.appendChild(box);
    nodeWrapper.appendChild(arrow);
    container.appendChild(nodeWrapper);

    current = current.next;
  }

  const nullNode = document.createElement("div");
  nullNode.innerText = "null";
  container.appendChild(nullNode);
}

appendBtn.onclick = function () {
  const value = input.value;

  if (value === "") {
    alert("Enter a value");
    return;
  }

  list.append(Number(value));
  input.value = "";
  drawList();
  explanation.innerText =
  "Append: New node added at the end. Last node now points to the new node.";
};

printBtn.onclick = function () {
  list.printList();
};

insertBtn.onclick = function () {
  const value = input.value;

  if (value === "") {
    alert("Enter a value");
    return;
  }

  list.insertAtBeginning(Number(value));
  input.value = "";
  drawList();
  explanation.innerText =
  "Insert at Beginning: Head pointer updated to the new node.";
};

deleteBtn.onclick = function () {
  const value = input.value;

  if (value === "") {
    alert("Enter a value");
    return;
  }

  list.deleteByValue(Number(value));
  input.value = "";
  drawList();
  explanation.innerText =
  "Delete: Previous node now points to the next node, skipping the deleted node.";
};

const reverseBtn = document.getElementById("reverseBtn");

reverseBtn.onclick = function () {
  list.reverse();
  drawList();
  explanation.innerText =
  "Reverse: All next pointers were flipped. Head updated to last node.";
};