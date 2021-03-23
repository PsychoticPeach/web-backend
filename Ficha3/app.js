function started() {
    console.log("Started Download");

}

function completed() {
    console.log("Completed Download")
}

function update(value) {
    console.log(i + "% of Download")
}

function performDownload(startedF, updateF, completedF) {
    startedF();

    for (let i = 0; i <= 100; i++) {
        updateF(i);
    }

    completedF();
}

// performDownload(started, update, completed)

// =======================================================================

var log = require("./log");

// console.log(log.message);
// console.log(log.functionObj(" isto"))

// =======================================================================

var arrayUtils = require("./arrayUtils");
var array = [12, 4, 6, 88, 9, 0];
console.log("O array está vazio? " + arrayUtils.isEmpty(array));
console.log("O máximo do array é: " + arrayUtils.max(array));
console.log("O mínimo do array é: " + arrayUtils.min(array));
console.log("O média do array é: " + arrayUtils.average(array));
console.log("O indice do array é: " + arrayUtils.indexOf(array, 2));
console.log("O sub array do array é: " + arrayUtils.subArray(array, 1, 4));