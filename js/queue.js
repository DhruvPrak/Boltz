console.log("queue.js loaded");

/* =========================
   QUEUE DATA & POINTERS
========================= */
let queue = [];
let front = 0;
let rear = -1;

/* =========================
   HTML ELEMENTS
========================= */
let container = document.getElementById("queueContainer");
let input = document.getElementById("queueInput");
let enqueueBtn = document.getElementById("enqueueBtn");
let dequeueBtn = document.getElementById("dequeueBtn");
let peekBtn = document.getElementById("peekBtn");
let peekOutput = document.getElementById("peekOutput");

/* =========================
   QUEUE FUNCTIONS (DSA)
========================= */

// Enqueue → add at REAR
function enqueue(value) {
  rear++;
  queue[rear] = value;
}

// Dequeue → remove from FRONT
function dequeue() {
  if (front > rear) {
    return null; // queue empty
  }
  let removedValue = queue[front];
  front++;
  return removedValue;
}

// Peek → view FRONT element
function peek() {
  if (front > rear) {
    return null;
  }
  return queue[front];
}

/* =========================
   DRAW QUEUE (UI)
========================= */
function drawQueue() {
  container.innerHTML = "";

  for (let i = front; i <= rear; i++) {
    let box = document.createElement("div");
    box.className = "queue-box";
    box.innerText = queue[i];

    if (i === front) box.classList.add("front");
    if (i === rear) box.classList.add("rear");

    container.appendChild(box);
  }
}

/* =========================
   BUTTON EVENTS
========================= */

// ENQUEUE button
enqueueBtn.onclick = function () {
  let value = input.value;

  if (value === "") {
    alert("Enter a value");
    return;
  }

  enqueue(Number(value));
  input.value = "";
  drawQueue();
};

// DEQUEUE button
dequeueBtn.onclick = function () {
  let removed = dequeue();

  if (removed === null) {
    alert("Queue is empty");
    return;
  }

  drawQueue();
};

// PEEK button
peekBtn.onclick = function () {
  let frontValue = peek();

  if (frontValue === null) {
    peekOutput.innerText = "Queue is empty";
    return;
  }

  peekOutput.innerText = "Front value: " + frontValue;
};
