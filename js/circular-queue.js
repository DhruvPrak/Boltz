console.log("circularQueue.js loaded");

let size = 5;
let queue = new Array(size);
let front = -1;
let rear = -1;

let container = document.getElementById("queueContainer");
let input = document.getElementById("queueInput");
let enqueueBtn = document.getElementById("enqueueBtn");
let dequeueBtn = document.getElementById("dequeueBtn");
let peekBtn = document.getElementById("peekBtn");
let peekOutput = document.getElementById("peekOutput");

/* =====================
   CIRCULAR QUEUE LOGIC
===================== */

function isFull() {
  return (front === 0 && rear === size - 1) ||
         (rear + 1) % size === front;
}

function isEmpty() {
  return front === -1;
}

function enqueue(value) {
  if (isFull()) return false;

  if (front === -1) {
    front = 0;
    rear = 0;
  } else {
    rear = (rear + 1) % size;
  }

  queue[rear] = value;
  return true;
}

function dequeue() {
  if (isEmpty()) return null;

  let removed = queue[front];
  queue[front] = undefined;

  if (front === rear) {
    front = -1;
    rear = -1;
  } else {
    front = (front + 1) % size;
  }

  return removed;
}

function peek() {
  if (isEmpty()) return null;
  return queue[front];
}

/* =====================
   DRAW QUEUE
===================== */

function drawQueue() {
  container.innerHTML = "";

  if (isEmpty()) return;

  let i = front;
  while (true) {
    let box = document.createElement("div");
    box.className = "queue-box";
    box.innerText = queue[i];

    if (i === front) box.classList.add("front");
    if (i === rear) box.classList.add("rear");

    container.appendChild(box);

    if (i === rear) break;
    i = (i + 1) % size;
  }
}

/* =====================
   BUTTON EVENTS
===================== */

enqueueBtn.onclick = function () {
  let value = input.value;
  if (value === "") {
    alert("Enter a value");
    return;
  }

  if (!enqueue(Number(value))) {
    alert("Queue is full");
    return;
  }

  input.value = "";
  drawQueue();
};

dequeueBtn.onclick = function () {
  if (dequeue() === null) {
    alert("Queue is empty");
    return;
  }

  drawQueue();
};

peekBtn.onclick = function () {
  let value = peek();
  peekOutput.innerText =
    value === null ? "Queue is empty" : "Front value: " + value;
};
