function calculateIMC(weight, height) {
    var imc = weight / Math.pow(height, 2);
    return imc;
}

function logIMC(weight, height) {
    var imc = calculateIMC(weight, height);
    if (imc < 18.5) {
        console.log("IMC: " + imc + ". Está abaixo de peso!");
    } else if (imc >= 18.5 && imc < 25) {
        console.log("IMC: " + imc + " - Está no peso normal!");
    } else if (imc >= 25 && imc < 30) {
        console.log("IMC: " + imc + " - Está acima do peso!");
    } else {
        console.log("IMC: " + imc + " - Está obeso!");
    }
}
//invocação da função com argumentos e atribuição a variável
var imc = calculateIMC(80, 2);
//imprimir o resultado na consola
console.log(imc);
//console.log(calculateIMC(70,2))

logIMC(40, 2)


// Alínea 2 =======================================================

function invertWord(str) {
    var inv = "";
    for (let index = str.length - 1; index >= 0; index--) {
        inv += str[index];
    }
    return inv;
}

function invertString(str, pattern) {
    var inv = "";
    var split = str.split(pattern);
    for (let index = 0; index < split.length; index++) {
        var word = invertWord(split[index]);
        inv += word + pattern;
    }
    return inv;
}
var invertedStr = invertString("Hoje é Domingo", " ");
console.log(invertedStr)


// Alínea 3 =======================================================

function countVogals(str) {
    var count = 0;
    var vogal = ["a", "e", "i", "o", "u"]
    for (let index = 0; index < str.length; index++) {
        for (let j = 0; j < vogal.length; j++) {
            if (str[index] == vogal[j]) {
                count++;
            };
        }
    }

    for (let index = 0; index < str.length; index++) {
        if (str[index] == "a" || str[index] == "e" || str[index] == "i" || str[index] == "o" || str[index] == "u") {
            count++;
        }
    }
    return count
}

var vogals = countVogals("Hello");
console.log(vogals);


function countConsonants(str) {
    var count = 0;
    var vogal = ["a", "e", "i", "o", "u"]
    for (let index = 0; index < str.length; index++) {
        for (let j = 0; j < vogal.length; j++) {
            if (str[index] != vogal[j]) {
                count++;
            };
        }
    }

    for (let index = 0; index < str.length; index++) {
        if (str[index] == "a" || str[index] == "e" || str[index] == "i" || str[index] == "o" || str[index] == "u") {
            count++;
        }
    }
    return count
}

var vogals = countConsonants("Hello");
console.log(vogals);


// Alínea 4 =======================================================


function countLetter(str, letter) {
    str = str.toLowerCase();
    var count = 0;
    for (let index = 0; index < str.length; index++) {
        if (str[index] == letter) {
            count++;
        }
    }
    return count;
}

var count = countLetter("HellE", "e");
console.log(count);



// Alínea 5 =======================================================

/*Escreva uma função que calcule o tempo de trabalho de um empregado. Dada a hora de entrada e a hora
de saída deve imprimir o tempo de trabalho. A empresa está aberta entre as 08:00:00 e as 18:00:00 e as
horas devem situar-se nesse intervalo*/

function countHours(entree, exit) {
    var maxTime = 18
    var minTime = 8
    var workedTime = 0
    for (let index = 0; index < maxTime; index++) {
        if ((entree >= minTime) && (exit <= maxTime)) {
            workedTime = exit - entree
        }

    }
    return workedTime
}

var work = countHours(8, 14);
console.log(work);