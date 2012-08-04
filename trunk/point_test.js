module("Point");

test("Create point", function() {
	p = new Point(3, 4);
        equal(p.x, 3);
        equal(p.y, 4);
});

test("Interpolate", function() {
        a = new Point(3, 4);
        b = new Point(5, 9);
        c = Point.interpolate(a, b, 0.3);
	almostEqual(c.x, 3.6, 0.0001);
	almostEqual(c.y, 5.5, 0.0001);
});

test("Axis aligned intersection", function() {
        var p1 = new Point(3, 0);
	var v1 = new Point(0, 1);
	var p2 = new Point(0, 4);
	var v2 = new Point(1, 0);
	var i = Point.intersectionOfTwoLines(p1, v1, p2, v2);
	notNull(i);
	almostEqual(i.x, 3, 0.0001);
	almostEqual(i.y, 4, 0.0001);
});

test("Typical intersection", function() {
        var p1 = new Point(3, 9);
	var v1 = new Point(2, 1);
	var p2 = new Point(4, 2);
	var v2 = new Point(-1, -3);
	var i = Point.intersectionOfTwoLines(p1, v1, p2, v2);
	notNull(i);
	almostEqual(i.x, 7, 0.0001);
	almostEqual(i.y, 11, 0.0001);
});

test("Degenerate intersection (parallel lines)", function() {
        var p1 = new Point(3, 9);
	var v1 = new Point(2, 1);
	var p2 = new Point(4, 2);
	var v2 = new Point(-4, -2);
	var i = Point.intersectionOfTwoLines(p1, v1, p2, v2);
	isNull(i);
});

test("Axis aligned intersection", function() {
        var p1 = new Point(3, 0);
	var v1 = new Point(0, 1);
	var p2 = new Point(2, 4);
	var p3 = new Point(4, 4);
	var i = Point.raySegmentIntersection(p1, v1, p2, p3);
	notNull(i);
	almostEqual(i.x, 3, 0.0001);
	almostEqual(i.y, 4, 0.0001);
});

test("Typical intersection", function() {
        var p1 = new Point(3, 9);
	var v1 = new Point(2, 1);
	var p2 = new Point(4, 2);
	var p3 = new Point(3, -1);
	var i = Point.raySegmentIntersection(p1, v1, p2, p3);
	notNull(i);
	almostEqual(i.x, 7, 0.0001);
	almostEqual(i.y, 11, 0.0001);
});

test("Degenerate intersection (parallel lines)", function() {
        var p1 = new Point(3, 9);
	var v1 = new Point(2, 1);
	var p2 = new Point(4, 2);
	var p3 = new Point(0, 0);
	var i = Point.raySegmentIntersection(p1, v1, p2, p3);
	isNull(i);
});
