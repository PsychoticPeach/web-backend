var array = [];


array.push(function(index) {
    console.log("Hello World " + index);
});

for (let i = 0; i < 10; i++) {
    array[0](i + 1);
}



var array2 = [2, 3, 4, 5, 6];

for (let i = 0; i < array.length; i++) {
    const element = array2[i];
    console.log("Element: " + element + " at index: " + i);
}

console.log(" ");

array2.forEach(myFunction);

function myFunction(e, i) {
    console.log("Element: " + e + " at index: " + i);
}

array2.forEach(function(element, i) {
    console.log("Element: " + element + " at index: " + i);
})