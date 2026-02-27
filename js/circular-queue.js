console.log("Circular Queue loaded");

/* =========================
   CONFIGURATION
========================= */
const SIZE = 5;                 // Fixed size (important for circular queue)
let queue = new Array(SIZE);    // Fixed-size array
let front = -1;
let rear = -1;

/* =========================
   DOM ELEMENTS
========================= */
const container = document.getElementById("queueContainer");
const input = document.getElementById("queueInput");
const enqueueBtn = document.getElementById("enqueueBtn");
const dequeueBtn = document.getElementById("dequeueBtn");
const peekBtn = document.getElementById("peekBtn");
const peekOutput = document.getElementById("peekOutput");

/* =========================
   HELPER FUNCTIONS
========================= */

// Queue is empty when front is -1
function isEmpty() {
  return front === -1;
}

// Queue is full when next rear hits front
function isFull() {
  return (rear + 1) % SIZE === front;
}

/* =========================
   QUEUE OPERATIONS
========================= */

// ENQUEUE (add at rear)
function enqueue(value) {
  if (isFull()) {
    return false; // cannot add
  }

  // First element
  if (isEmpty()) {
    front = 0;
    rear = 0;
  } else {
    rear = (rear + 1) % SIZE; // circular move
  }

  queue[rear] = value;
  return true;
}

// DEQUEUE (remove from front)
function dequeue() {
  if (isEmpty()) {
    return null;
  }

  const removedValue = queue[front];
  queue[front] = undefined;

  // If only one element existed
  if (front === rear) {
    front = -1;
    rear = -1;
  } else {
    front = (front + 1) % SIZE; // circular move
  }

  return removedValue;
}

// PEEK (view front)
function peek() {
  if (isEmpty()) {
    return null;
  }
  return queue[front];
}

/* =========================
   UI RENDERING
========================= */

function drawQueue() {
  container.innerHTML = "";

  if (isEmpty()) {
    return;
  }

  let i = front;

  while (true) {
    const box = document.createElement("div");
    box.className = "queue-box";
    box.innerText = queue[i];

    if (i === front) box.classList.add("front");
    if (i === rear) box.classList.add("rear");

    container.appendChild(box);

    if (i === rear) break;
    i = (i + 1) % SIZE;
  }
}

/* =========================
   BUTTON EVENTS
========================= */

enqueueBtn.onclick = () => {
  const value = input.value;

  if (value === "") {
    alert("Enter a value");
    return;
  }

  const success = enqueue(Number(value));

  if (!success) {
    alert("Queue is full — but this would NOT happen in simple queue reuse!");
    return;
  }

  input.value = "";
  drawQueue();
};

dequeueBtn.onclick = () => {
  const removed = dequeue();

  if (removed === null) {
    alert("Queue is empty");
    return;
  }

  drawQueue();
};

peekBtn.onclick = () => {
  const value = peek();
  peekOutput.innerText =
    value === null ? "Queue is empty" : "Front value: " + value;
};
