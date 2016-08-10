// static vars
var cnv = document.getElementById("canvas"), ctx = cnv.getContext("2d");
var dt, ldt, socket, clientState = 0;
var WorldObjects = [];
var GIndexID = 0;

// static functions
function clearScreen(cl) {
    ctx.beginPath();
    ctx.clearRect(0, 0, cnv.width, cnv.height);
    ctx.beginPath();
    ctx.fillStyle = cl;
    ctx.fillRect(0, 0, cnv.width, cnv.height);
}
function convertX(val) {
    return (val - cnv.width) * -1;
}
function convertY(val) {
    return (val - cnv.height) * -1;
}
function convertSpeed(val) {
    return val * dt;
}
function keyptr(val) {
    return 1 << val;
}
function resizeWindow() {
	cnv.style.width = "100%";
    cnv.style.height = "100%";
    cnv.style.display = "block";
	cnv.width = parseInt($("#canvas").innerWidth());
	cnv.height = parseInt($("#canvas").innerHeight());
}
function GiveID() {
    return ++GIndexID;
}