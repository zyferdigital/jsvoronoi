

function calculateVoronoiDiagram(cells, bounds) {
    var n = cells.length;
    for (var i = 0; i < n; ++i) {
	var thisSeed = cells[i];
	thisSeed.polygon = bounds.getDeepCopy();
	for (var j = 0; j < n; ++j) {
	    if (i == j) {
		continue;
	    }
	    var otherSeed = cells[j];
	    thisSeed.polygon.chop(thisSeed.point, thisSeed.weight,
				  otherSeed.point, otherSeed.weight);
	}
    }
    console.log(bounds);
    console.log(cells);
}

function populateDefaultFieldValues(cells) {
    var n = cells.length;
    for (var i = 0; i < n; ++i) {
	var cell = cells[i];
	if (cell.weight == undefined) {
	    cell.weight = 0;
	}
	if (cell.fillColor == undefined) {
	    cell.fillColor = "rgb(255, 255, 255)";
	}
	if (cell.borderColor == undefined) {
	    cell.borderColor = "rgb(0, 0, 0)";
	}
    }
}

function renderVoronoiDiagram(cells, context) {
    var n = cells.length;
    for (var i = 0; i < n; ++i) {
	var cell = cells[i];
	cell.polygon.drawThyself(context,
				 cell.fillColor,
				 cell.borderColor, 1);
    }
}

function makeVoronoiDiagram(canvasID, cells) {
    var canvas = document.getElementById(canvasID);
    var context = canvas.getContext("2d");
    var bounds = ConvexPolygon.fromRectangle(canvas.width, canvas.height);
    populateDefaultFieldValues(cells);
    calculateVoronoiDiagram(cells, bounds);
    renderVoronoiDiagram(cells, context);
}
