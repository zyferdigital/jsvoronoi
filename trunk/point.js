

function Point(x, y) {
    this.x = Number(x);
    this.y = Number(y);
}

Point.intersectionOfTwoLines = function(position1, direction1,
					position2, direction2) {
    var denominator = (direction1.x * direction2.y -
		       direction1.y * direction2.x);
    if (Math.abs(denominator) < 0.0000001) {
	return null;
    }
    var x1 = position1.x;
    var x2 = position1.x + direction1.x;
    var x3 = position2.x;
    var x4 = position2.x + direction2.x;
    var y1 = position1.y;
    var y2 = position1.y + direction1.y;
    var y3 = position2.y;
    var y4 = position2.y + direction2.y;
    var cross1 = x1 * y2 - x2 * y1;
    var cross2 = x3 * y4 - x4 * y3;
    var xNumerator = cross2 * direction1.x - cross1 * direction2.x;
    var yNumerator = cross2 * direction1.y - cross1 * direction2.y;
    var x = xNumerator / denominator;
    var y = yNumerator / denominator;
    return new Point(x, y);
};

Point.prototype.howFarAlong = function(a, b) {
    var dx = b.x - a.x;
    var dy = b.y - a.y;
    if (Math.abs(dx) < 0.0000001 && Math.abs(dy) < 0.0000001) {
	return null;
    }
    if (Math.abs(dx) < 0.0000001) {
	return (this.y - a.y) / dy;
    }
    if (Math.abs(dy) < 0.0000001) {
	return (this.x - a.x) / dx;
    }
    return 0.5 * ((this.y - a.y) / dy + (this.x - a.x) / dx);
};

Point.raySegmentIntersection = function(rayStart, rayDirection,
					segmentStart, segmentEnd) {
    var x1 = rayStart.x;
    var x2 = rayStart.x + rayDirection.x;
    var x3 = segmentStart.x;
    var x4 = segmentEnd.x;
    var y1 = rayStart.y;
    var y2 = rayStart.y + rayDirection.y;
    var y3 = segmentStart.y;
    var y4 = segmentEnd.y;
    var denominator = (rayDirection.x * (y4 - y3) -
		       rayDirection.y * (x4 - x3));
    if (Math.abs(denominator) < 0.0000001) {
	return null;
    }
    var cross1 = x1 * y2 - x2 * y1;
    var cross2 = x3 * y4 - x4 * y3;
    var xNumerator = cross2 * rayDirection.x - cross1 * (x4 - x3);
    var yNumerator = cross2 * rayDirection.y - cross1 * (y4 - y3);
    var x = xNumerator / denominator;
    var y = yNumerator / denominator;
    return new Point(x, y);
};

Point.interpolate = function(point1, point2, alpha) {
    var x = (1.0 - alpha) * point1.x + alpha * point2.x;
    var y = (1.0 - alpha) * point1.y + alpha * point2.y;
    return new Point(x, y);
};

Point.add = function(a, b) {
    return new Point(a.x + b.x, a.y + b.y);
};

Point.subtract = function(a, b) {
    return new Point(a.x - b.x, a.y - b.y);
};

Point.prototype.rotate90 = function() {
    return new Point(this.y, -this.x);
};

Point.prototype.length = function() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
};

Point.prototype.getDeepCopy = function() {
    return new Point(this.x, this.y);
};

Point.prototype.squaredDistance = function(p) {
    var dx = p.x - this.x;
    var dy = p.y - this.y;
    return dx * dx + dy * dy;
};

Point.prototype.distance = function(p) {
    var dx = p.x - this.x;
    var dy = p.y - this.y;
    return Math.sqrt(dx * dx + dy * dy);
};
