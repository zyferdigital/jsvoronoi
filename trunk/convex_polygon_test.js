module("Convex Polygon");

test("Null polygon", function() {
        polygon = new ConvexPolygon();
        equal(polygon.numVertices(), 0);
});

test("Add one vertex", function() {
        polygon = new ConvexPolygon();
        polygon.addVertex(3.14159, -1);
        equal(polygon.numVertices(), 1);
        almostEqual(polygon.getVertex(0).x, 3.14159, 0.0001);
        almostEqual(polygon.getVertex(0).y, -1, 0.0001);
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
        p.addVertex(1, 2);
        p.addVertex(3, 2);
        p.addVertex(2, 4);
        almostEqual(p.area(), 2, 0.0001);
});

test("Area of a Pentagon", function() {
        p = new ConvexPolygon();
        p.addVertex(1, 2);
        p.addVertex(3, 2);
        p.addVertex(3, 4);
        p.addVertex(2, 5);
        p.addVertex(1, 4);
        almostEqual(p.area(), 5, 0.0001);
});

test("Centroid of a triangle", function() {
        p = new ConvexPolygon();
        p.addVertex(1, 2);
        p.addVertex(3, 2);
        p.addVertex(2, 4);
        var c = p.centroid();
        almostEqual(c.x, 2, 0.1);
        almostEqual(c.y, 2.666, 0.1);
});

test("Centroid of a Pentagon", function() {
        p = new ConvexPolygon();
        p.addVertex(1, 2);
        p.addVertex(3, 2);
        p.addVertex(3, 4);
        p.addVertex(2, 5);
        p.addVertex(1, 4);
        var c = p.centroid();
        almostEqual(c.x, 2, 0.01);
        almostEqual(c.y, 3.2666, 0.01);
});

test("Chop a triangle, no weights", function() {
        p = new ConvexPolygon();
        p.addVertex(0, 0);
        p.addVertex(8, 0);
        p.addVertex(4, 4);
        var insideSeed = new Point(4, 2);
        var outsideSeed = new Point(4, 4);
        p.chop(insideSeed, 0, outsideSeed, 0);
        almostEqual(p.area(), 15, 0.01);
});

test("Chop a square, axis-aligned with no weights", function() {
        p = new ConvexPolygon();
        p.addVertex(1, 2);
        p.addVertex(5, 2);
        p.addVertex(5, 4);
        p.addVertex(1, 4);
        var insideSeed = new Point(2, 3);
        var outsideSeed = new Point(4, 3);
        p.chop(insideSeed, 0, outsideSeed, 0);
        almostEqual(p.area(), 4, 0.01);
});

test("Chop a simple triangle with weights", function() {
        p = new ConvexPolygon();
        p.addVertex(0, 0);
        p.addVertex(8, 0);
        p.addVertex(4, 4);
        var insideSeed = new Point(4, 2);
        var outsideSeed = new Point(4, 5);
        p.chop(insideSeed, 0, outsideSeed, 1);
        almostEqual(p.area(), 15, 0.01);
});

test("Chop a square with weights", function() {
        var p = new ConvexPolygon();
        p.addVertex(0, 0);
        p.addVertex(4, 0);
        p.addVertex(4, 4);
        p.addVertex(0, 4);
        var insideSeed = new Point(1, 1);
        var outsideSeed = new Point(7, 11);
        p.chop(insideSeed, 1, outsideSeed, 7);
        almostEqual(p.area(), 14.12857, 0.01);
});
