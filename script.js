const pushButton = document.getElementById("pushBtn");
const popButton = document.getElementById("popBtn");
const stackContainer = document.getElementById("stackContainer");

let stack = [];

// Render stack visually
function renderStack() {
    stackContainer.innerHTML = "";

    for (let i = 0; i < stack.length; i++) {
        const div = document.createElement("div");
        div.className = "stack-item";
        div.innerText = stack[i];
        stackContainer.appendChild(div);
    }
    const statusText = document.getElementById("statusText");
statusText.innerText = stack.length === 0
    ? "Stack is empty"
    : "Top element: " + stack[stack.length - 1];


    // UX: disable pop when empty
    popButton.disabled = stack.length === 0;
}


// Push operation
pushButton.addEventListener("click", function () {
    const value = Math.floor(Math.random() * 100); // simple value for now
    stack.push(value);
    renderStack();
});

// Pop operation
popButton.addEventListener("click", function () {
    if (stack.length === 0) {
        alert("Stack is empty!");
        return;
    }
    stack.pop();
    renderStack();
});



console.log(stack);