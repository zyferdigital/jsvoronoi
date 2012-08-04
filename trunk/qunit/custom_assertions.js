

function almostEqual(actual, expected, delta, message) {
    QUnit.push(Math.abs(actual - expected) < delta, actual, expected, message);
}

function notNull(obj, message) {
    QUnit.push(obj != null, obj, "not null", message);
}

function isNull(obj, message) {
    QUnit.push(obj == null, obj, "not null", message);
}
