module("Convex Polygon");

test("Null polygon", function() {
        polygon = new ConvexPolygon();
	equal(polygon.numVertices(), 0);
});

test("Add one vertex", function() {
        polygon = new ConvexPolygon();
	polygon.addVertex(new Point(1, 1));
	equal(polygon.numVertices(), 1);
});

test("Axis aligned perpendicular bisector intersection", function() {
        var seed1 = new Point(0, 0);
        var seed2 = new Point(0, 2);
        var endpoint1 = new Point(2, 2);
        var endpoint2 = new Point(2, 0);
	var i = ConvexPolygon.perpendicularBisectorIntersection(seed1, seed2,
								0.5,
								endpoint1,
								endpoint2);
	notNull(i);
	almostEqual(i.x, 2, 0.0001);
	almostEqual(i.y, 1, 0.0001);
});

test("Area of a triangle", function() {
        p = new ConvexPolygon();
	p.addVertex(new Point(1, 2));
	p.addVertex(new Point(3, 2));
	p.addVertex(new Point(2, 4));
	almostEqual(p.area(), 2, 0.0001);
});

test("Area of a Pentagon", function() {
        p = new ConvexPolygon();
	p.addVertex(new Point(1, 2));
	p.addVertex(new Point(3, 2));
	p.addVertex(new Point(3, 4));
	p.addVertex(new Point(2, 5));
	p.addVertex(new Point(1, 4));
	almostEqual(p.area(), 5, 0.0001);
});

test("Centroid of a triangle", function() {
        p = new ConvexPolygon();
	p.addVertex(new Point(1, 2));
	p.addVertex(new Point(3, 2));
	p.addVertex(new Point(2, 4));
	var c = p.centroid();
	almostEqual(c.x, 2, 0.1);
	almostEqual(c.y, 2.666, 0.1);
});

test("Centroid of a Pentagon", function() {
        p = new ConvexPolygon();
	p.addVertex(new Point(1, 2));
	p.addVertex(new Point(3, 2));
	p.addVertex(new Point(3, 4));
	p.addVertex(new Point(2, 5));
	p.addVertex(new Point(1, 4));
	var c = p.centroid();
	almostEqual(c.x, 2, 0.01);
	almostEqual(c.y, 3.2666, 0.01);
});

test("Chop a square", function() {
        p = new ConvexPolygon();
	p.addVertex(new Point(1, 2));
	p.addVertex(new Point(5, 2));
	p.addVertex(new Point(5, 4));
	p.addVertex(new Point(1, 4));
	var insideSeed = new Point(2, 3);
	var outsideSeed = new Point(4, 3);
	p.chop(insideSeed, 0, outsideSeed, 0);
	console.log(p);
	almostEqual(p.area(), 4, 0.01);
});
