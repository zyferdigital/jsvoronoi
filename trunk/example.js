
var canvas = document.getElementById("voronoi");
var context = canvas.getContext("2d");
var mouseX = 0;
var mouseY = 0;

function squareExample() {
    var p = ConvexPolygon.fromRectangle(400, 400);
    var cells = [{point: new Point(150, 150), weight: 0},
		 {point: new Point(250, 240), weight: 0},
		 {point: new Point(150, 280), weight: 0},
		 {point: new Point(280, 202), weight: 0},
		 ];
    calculateVoronoiDiagram(cells, p);
    renderVoronoiDiagram(cells, context);
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

function colorsAndLabelsExample() {
    var cells = [{point: new Point(150, 150),
		  weight: 0,
		  fillColor: "rgb(255, 0, 0)",
		  label: ""
	          },
                 {point: new Point(250, 240),
		  weight: 0,
		  fillColor: "rgb(255, 255, 0)",
		  label: ""
	          },
                 {point: new Point(150, 280),
		  weight: 0,
		  fillColor: "rgb(0, 255, 0)",
		  label: ""
	          },
                 {point: new Point(280, 202),
		  weight: 0,
		  fillColor: "rgb(0, 0, 255)",
		  label: ""
	          },
		 ];
    makeVoronoiDiagram("voronoi", cells);
}

function handleMouseMove() {
    mouseX = event.clientX;
    mouseY = event.clientY;
}

function onload() {
    //squareExample();
    //setInterval("mouseChopExample()", 50);
    colorsAndLabelsExample();
}
