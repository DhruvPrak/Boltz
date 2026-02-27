class CircularNode {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class CircularLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  append(data) {
    const newNode = new CircularNode(data);

    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
      newNode.next = this.head;
      return;
    }

    this.tail.next = newNode;
    newNode.next = this.head;
    this.tail = newNode;
  }

  printList() {
    if (this.head === null) {
      console.log("List is empty");
      return;
    }

    let current = this.head;
    let result = "";

    do {
      result += current.data + " → ";
      current = current.next;
    } while (current !== this.head);

    result += "(back to head)";
    console.log(result);
  }
  deleteByValue(value) {
  if (this.head === null) return;

  let current = this.head;
  let previous = this.tail;

  do {
    if (current.data === value) {

      // If only one node
      if (this.head === this.tail) {
        this.head = null;
        this.tail = null;
        return;
      }

      // If deleting head
      if (current === this.head) {
        this.head = this.head.next;
        this.tail.next = this.head;
        return;
      }

      // If deleting tail
      if (current === this.tail) {
        this.tail = previous;
        this.tail.next = this.head;
        return;
      }

      // Middle node
      previous.next = current.next;
      return;
    }

    previous = current;
    current = current.next;

  } while (current !== this.head);
}
}

const list = new CircularLinkedList();

const input = document.getElementById("cllInput");
const appendBtn = document.getElementById("appendBtn");
const deleteBtn = document.getElementById("deleteBtn");
const printBtn = document.getElementById("printBtn");
const container = document.getElementById("cllContainer");
const explanation = document.getElementById("cllExplanation");

function drawList() {
  container.innerHTML = "";

  if (list.head === null) return;

  let current = list.head;

  do {
    const wrapper = document.createElement("div");
    wrapper.className = "node";

    const box = document.createElement("div");
    box.className = "node-box";
    box.innerText = current.data;

    const arrow = document.createElement("div");
    arrow.className = "arrow";
    arrow.innerText = "→";

    wrapper.appendChild(box);
    wrapper.appendChild(arrow);
    container.appendChild(wrapper);

    current = current.next;

  } while (current !== list.head);

  const loopBack = document.createElement("div");
  loopBack.innerText = "(back to head)";
  container.appendChild(loopBack);
}

appendBtn.onclick = function () {
  const value = input.value;
  if (value === "") return alert("Enter a value");

  list.append(Number(value));
  input.value = "";
  drawList();

  explanation.innerText =
    "Append: New node added. Tail now connects back to head.";
};

deleteBtn.onclick = function () {
  const value = input.value;
  if (value === "") return alert("Enter a value");

  list.deleteByValue(Number(value));
  input.value = "";
  drawList();

  explanation.innerText =
    "Delete: Node removed while maintaining circular link.";
};

printBtn.onclick = function () {
  list.printList();
};