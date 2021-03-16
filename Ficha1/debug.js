/*var a = 10;
var b = 5;
var c = a + b;
console.log(c)*/

function test(msg) {
    console.log(msg + " test");
}

test("hello");
test(5);
test(2.5);

var fn = function() {
    console.log("anonymous");
}

function log(func) {
    func();
}

log(fn);
log(function() {
    console.log("anonymous 2")
})