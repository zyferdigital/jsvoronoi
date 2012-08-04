
var canvas = document.getElementById("voronoi");
var context = canvas.getContext("2d");
var mouseX = 0;
var mouseY = 0;

function squareExample() {
    var p = ConvexPolygon.fromRectangle(400, 400);
    var seeds = [{point: new Point(150, 150), weight: 0},
		 {point: new Point(250, 240), weight: 0},
		 {point: new Point(150, 280), weight: 0},
		 {point: new Point(280, 202), weight: 0},
		 ];
    ConvexPolygon.calculateVoronoiPolygons(seeds, p);
    console.log(seeds);
    var n = seeds.length;
    for (var i = 0; i < n; ++i) {
	p = seeds[i].polygon;
	p.fill(context,
	       "rgb(255, 0, 0)",
	       "rgb(0, 0, 0)", 1);
    }
}

function mouseChopExample() {
    canvas.width = canvas.width;
    var square = ConvexPolygon.fromRectangle(400, 400);
    var generator = new Point(200, 200);
    var generatorWeight = 0;
    var mouse = new Point(mouseX, mouseY);
    var mouseWeight = 30;
    square.chop(generator, generatorWeight, mouse, mouseWeight);
    square.fill(context,
	       "rgb(255, 0, 0)",
	       "rgb(0, 0, 0)", 1);
    context.beginPath();
    context.arc(mouseX, mouseY, mouseWeight, 0, 2 * Math.PI);
    context.stroke();
}

function handleMouseMove() {
    mouseX = event.clientX;
    mouseY = event.clientY;
}

function onload() {
    //squareExample();
    setInterval("mouseChopExample()", 50);
}
