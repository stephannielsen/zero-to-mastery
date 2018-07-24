var button = document.getElementById("enter");
var input = document.getElementById("userinput");
var ul = document.querySelector("ul");
var lis = document.querySelectorAll("li");

function inputLength() {
	return input.value.length;
}

function createListElement() {
	var li = document.createElement("li");
	li.appendChild(document.createTextNode(input.value));
	addToggleDoneListener(li);
	addDeleteButton(li);
	ul.appendChild(li);
	input.value = "";
}

function addListAfterClick() {
	if (inputLength() > 0) {
		createListElement();
	}
}

function addListAfterKeypress(event) {
	if (inputLength() > 0 && event.keyCode === 13) {
		createListElement();
	}
}

function addToggleDoneListener(element) {
	element.addEventListener("click", (event) => event.target.classList.toggle("done"));
}

function addDeleteButton(element) {
	var button = document.createElement("button");
	button.appendChild(document.createTextNode("Delete"));
	button.addEventListener("click", (event) => {
		var toRemove = event.target.parentElement;
		toRemove.parentElement.removeChild(toRemove);
	});
	element.appendChild(button);
}

button.addEventListener("click", addListAfterClick);

input.addEventListener("keypress", addListAfterKeypress);

lis.forEach((l) => {
	addToggleDoneListener(l);
	addDeleteButton(l);
});