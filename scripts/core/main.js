function main() {
    onStart();
    initialize();
	render();
}

function initialize() {
    // socket connection
	//socket = io('127.0.0.1:8080');
    // delta time
    dt = Date.now();
    ldt = dt;
    // window style
	resizeWindow();
	clearScreen("black");
    // listeners
	registerKeys();
	//registerSocketEvents();
}

function render() {
    // re-calculate delta time
	dt = (Date.now() - ldt) / 1000;
	ldt = Date.now();
	// call update function each frame
    onUpdate();
}

document.addEventListener("DOMContentLoaded", function (event) { main(); });
$(window).on("resize", resizeWindow);