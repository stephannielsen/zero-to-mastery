var css = document.querySelector("h3");
var color1 = document.querySelector(".color1");
var color2 = document.querySelector(".color2");
var body = document.getElementById("gradient");
var surprise = document.getElementById("surprise");
const regex = /(rgb\(\d{1,3},\s\d{1,3},\s\d{1,3}\))+/gm;

function setGradient() {
	body.style.background = 
	"linear-gradient(to right, " 
	+ color1.value 
	+ ", " 
	+ color2.value 
	+ ")";
	updateGradientDisplay(body.style.background + ";");
}

function updateGradientDisplay(style) {
	css.textContent = style;
}

function componentToHex(c) {
    var hex = Number(c).toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function randomRgb() {
	return Math.floor((Math.random() * 255) + 1);
}

function randomHex() {
	return rgbToHex(randomRgb(), randomRgb(), randomRgb());
}

var startGradient = window.getComputedStyle(body).getPropertyValue("background-image");
var sc = [];
var matches = startGradient.match(regex);
if (matches !== null)
{
	matches.forEach((rgbString) => {
		sc.push(rgbString.substring(4,rgbString.length-1).split(", "));
	});
	
	color1.setAttribute("value", rgbToHex(sc[0][0], sc[0][1], sc[0][2]));
	color2.setAttribute("value", rgbToHex(sc[1][0], sc[1][1], sc[1][2]));
}

color1.addEventListener("input", setGradient);

color2.addEventListener("input", setGradient);

surprise.addEventListener("click", () => {
	color1.setAttribute("value", randomHex());
	color2.setAttribute("value", randomHex());
	setGradient();
});

updateGradientDisplay(startGradient);