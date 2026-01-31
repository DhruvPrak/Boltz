let numbers = [10, 20, 30];

let container = document.getElementById("arrayContainer");
let showBtn = document.getElementById("showBtn");
let pushBtn = document.getElementById("pushBtn");
let input = document.getElementById("valueInput");

function drawArray() {
  container.innerHTML = "";

  for (let i = 0; i < numbers.length; i++) {
    let box = document.createElement("div");
    box.className = "array-box";
    box.innerText = numbers[i];
    container.appendChild(box);
  }
}

showBtn.onclick = function () {
  drawArray();
};

pushBtn.onclick = function () {
  let value = input.value;

  if (value === "") {
    alert("Please enter a value");
    return;
  }

  numbers.push(Number(value));
  input.value = "";
  drawArray();
};

let popBtn = document.getElementById("popBtn");

popBtn.onclick = function () {
  if (numbers.length === 0) {
    alert("Array is empty");
    return;
  }

  numbers.pop();
  drawArray();
};

