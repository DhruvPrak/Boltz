console.log("stack.js loaded");

// Stack data
let stack = [];
let stackTop = -1;
let MAX_SIZE = 5;

// HTML elements
document.getElementById("stackStatus").innerText ="Status: Stack basics completed ✅";

let explanation = document.getElementById("stackExplanation");
let container = document.getElementById("stackContainer");
let input = document.getElementById("stackInput");
let pushBtn = document.getElementById("pushBtn");
let popBtn = document.getElementById("popBtn");
let peekBtn = document.getElementById("peekBtn");
let peekOutput = document.getElementById("peekOutput");

// Draw stack on screen
function drawStack() {
  container.innerHTML = "";

  for (let i = 0; i <= stackTop; i++) {
    let box = document.createElement("div");
    box.className = "stack-box";
    box.innerText = stack[i];

    if (i === stackTop) {
      box.classList.add("top");
    }

    container.appendChild(box);
  }
}


// PUSH
pushBtn.onclick = function () {
  let value = input.value;

  if (value === "") {
    alert("Enter a value");
    return;
  }

  if (stackTop === MAX_SIZE - 1) {
    alert("Stack Overflow");
    return;
  }

  stackTop++;
  stack[stackTop] = Number(value);
  input.value = "";

  drawStack();
  explanation.innerText =
  "Push: Value added to the TOP of the stack (LIFO).";

};

// POP
popBtn.onclick = function () {
  if (stackTop === -1) {
    alert("Stack Underflow");
    return;
  }

  stackTop--;
  drawStack();
  explanation.innerText =
  "Pop: Top value removed from the stack.";

};

// PEEK
peekBtn.onclick = function () {
  if (stackTop === -1) {
    peekOutput.innerText = "Stack is empty";
    return;
  }

  peekOutput.innerText = "Top value: " + stack[stackTop];
  explanation.innerText =
  "Peek: Viewing the TOP value without removing it.";

};
