class DoublyNode {
  constructor(data) {
    this.data = data;
    this.prev = null;
    this.next = null;
  }
}
class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null; // important in doubly list
  }
  append(data) {
  const newNode = new DoublyNode(data);

  if (this.head === null) {
    this.head = newNode;
    this.tail = newNode;
    return;
  }

  this.tail.next = newNode;
  newNode.prev = this.tail;
  this.tail = newNode;
}
printForward() {
  let current = this.head;
  let result = "";

  while (current !== null) {
    result += current.data + " ⇄ ";
    current = current.next;
  }

  result += "null";
  console.log(result);
}
printBackward() {
  let current = this.tail;
  let result = "";

  while (current !== null) {
    result += current.data + " ⇄ ";
    current = current.prev;
  }

  result += "null";
  console.log(result);
}
printBackward() {
  let current = this.tail;
  let result = "";

  while (current !== null) {
    result += current.data + " ⇄ ";
    current = current.prev;
  }

  result += "null";
  console.log(result);
}
}

const list = new DoublyLinkedList();

const input = document.getElementById("dllInput");
const appendBtn = document.getElementById("appendBtn");
const deleteBtn = document.getElementById("deleteBtn");
const forwardBtn = document.getElementById("forwardBtn");
const backwardBtn = document.getElementById("backwardBtn");
const container = document.getElementById("dllContainer");
const explanation = document.getElementById("dllExplanation");

function drawList() {
  container.innerHTML = "";

  let current = list.head;

  while (current !== null) {
    const wrapper = document.createElement("div");
    wrapper.className = "node";

    const box = document.createElement("div");
    box.className = "node-box";
    box.innerText = current.data;

    const arrow = document.createElement("div");
    arrow.className = "arrow";
    arrow.innerText = "⇄";

    wrapper.appendChild(box);
    wrapper.appendChild(arrow);
    container.appendChild(wrapper);

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
    "Append: New node added at tail. Both prev and next pointers updated.";
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
    "Delete: Node removed by rewiring both prev and next pointers.";
};

forwardBtn.onclick = function () {
  list.printForward();
  explanation.innerText =
    "Forward traversal: Moving using next pointers.";
};

backwardBtn.onclick = function () {
  list.printBackward();
  explanation.innerText =
    "Backward traversal: Moving using prev pointers.";
};