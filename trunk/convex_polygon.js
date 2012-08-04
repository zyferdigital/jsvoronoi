// A convex polygon is one where each vertex has a clear line of sight to
// every other vertex through the interior of the polygon. There is no vertex
// that sticks out into the middle of the polygon.
//
// Every cell in a Voronoi diagram is a convex polygon.

function ConvexPolygon() {
    this.vertices = [];
}

ConvexPolygon.prototype.addVertex = function(x, y) {
    this.vertices.push(new Point(x, y));
};

ConvexPolygon.prototype.numVertices = function() {
    return this.vertices.length;
};

ConvexPolygon.perpendicularBisectorIntersection = function(seed1, seed2,
							   alpha,
							   endpoint1,
							   endpoint2) {
    var segment = Point.subtract(seed1, seed2);
    var midpoint = Point.interpolate(seed1, seed2, alpha);
    var va = segment.rotate90();
    var vb = Point.subtract(endpoint1, endpoint2);
    return Point.intersectionOfTwoLines(midpoint, va, endpoint1, vb);
};

ConvexPolygon.fromRectangle = function(width, height) {
    var p = new ConvexPolygon();
    p.addVertex(0, 0);
    p.addVertex(width, 0);
    p.addVertex(width, height);
    p.addVertex(0, height);
    return p;
};

ConvexPolygon.prototype.getVertex = function(index) {
    if (index == this.vertices.length) {
	return this.vertices[0];
    } else {
	return this.vertices[index];
    }
};

ConvexPolygon.prototype.area = function() {
    var sum = 0.0;
    var n = this.vertices.length;
    for (var i = 0; i < n; ++i) {
	var thisPoint = this.getVertex(i);
	var nextPoint = this.getVertex(i + 1);
	sum += thisPoint.x * nextPoint.y - nextPoint.x * thisPoint.y;
    }
    return 0.5 * sum;
};

ConvexPolygon.prototype.centroid = function() {
    var areaSum = 0.0;
    var xSum = 0.0;
    var ySum = 0.0;
    var n = this.vertices.length;
    for (var i = 0; i < n; ++i) {
	var thisPoint = this.getVertex(i);
	var nextPoint = this.getVertex(i + 1);
	var cross = thisPoint.x * nextPoint.y - nextPoint.x * thisPoint.y;
	areaSum += cross;
	xSum += cross * (thisPoint.x + nextPoint.x);
	ySum += cross * (thisPoint.y + nextPoint.y);
    }
    var mult = 1.0 / (3 * areaSum);
    return new Point(mult * xSum, mult * ySum);
};

ConvexPolygon.prototype.chop = function(seed1, weight1, seed2, weight2) {
    var newVertices = [];
    var segment = Point.subtract(seed1, seed2);
    var distance = segment.length();
    var alpha = 0.5 + 0.5 * (weight1 - weight2) / distance;
    var midpoint = Point.interpolate(seed1, seed2, alpha);
    var rayDirection = segment.rotate90();
    var foundIntersection = false;
    var n = this.vertices.length;
    for (var i = 0; i < n; ++i) {
	var thisVertex = this.getVertex(i);
	var distance1 = thisVertex.squaredDistance(seed1) - weight1 * weight1;
	var distance2 = thisVertex.squaredDistance(seed2) - weight2 * weight2;
	if (distance1 < distance2) {
	    newVertices.push(thisVertex);
	}
	var nextVertex = this.getVertex(i + 1);
	var intersection = Point.raySegmentIntersection(midpoint,
							rayDirection,
							thisVertex,
							nextVertex);
	if (intersection == null) {
	    continue;
	}
	var h = intersection.howFarAlong(thisVertex, nextVertex);
	if (h > 0.0 && h <= 1.0) {
	    newVertices.push(intersection);
	}
    }
    this.vertices = newVertices;
};

ConvexPolygon.prototype.clone = function() {
    var clone = new ConvexPolygon();
    var n = this.vertices.length;
    for (var i = 0; i < n; ++i) {
	var vertex = this.vertices[i];
	clone.vertices.push(vertex.clone());
    }
    return clone;
};

ConvexPolygon.calculateVoronoiPolygons = function(seeds, bounds) {
    var n = seeds.length;
    for (var i = 0; i < n; ++i) {
	var seed = seeds[i];
	if (seed.weight == undefined) {
	    seed.weight = 0;
	}
    }
    for (var i = 0; i < n; ++i) {
	var thisSeed = seeds[i];
	thisSeed.polygon = bounds.clone();
	for (var j = 0; j < n; ++j) {
	    if (i == j) {
		continue;
	    }
	    var otherSeed = seeds[j];
	    thisSeed.polygon.chop(thisSeed.point, thisSeed.weight,
				  otherSeed.point, otherSeed.weight);
	}
    }
};

ConvexPolygon.prototype.fill = function(context, fillColor,
					borderColor, borderWidth) {
    context.beginPath();
    var n = this.vertices.length;
    for (var i = 0; i < n; ++i) {
	var v = this.vertices[i];
	context.lineTo(v.x, v.y);
    }
    context.closePath();
    context.fillStyle = fillColor;
    context.strokeStyle = borderColor;
    context.lineWidth = borderWidth;
    context.fill();
    context.stroke();
}
