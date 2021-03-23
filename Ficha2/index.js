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

// function countHours(entree, exit) {
//     var maxTime = 18
//     var minTime = 8
//     var workedTime = 0
//     for (let index = 0; index < maxTime; index++) {
//         if ((entree >= minTime) && (exit <= maxTime)) {
//             workedTime = exit - entree
//         }

//     }
//     return workedTime
// }

// var work = countHours(8, 14);
// console.log(work);

function calculateWorkingHours(he, me, se, hs, ms, ss) {

    if (he < 8 || hs > 18) {
        console.log("Horário não permitido!!!");
        return;
    }

    var enterInSeconds = he * 3600 + me * 60 + se;
    var exitInSeconds = hs * 3600 + ms * 60 + ss;

    var timeInSeconds = exitInSeconds - enterInSeconds;

    var reminderHour = timeInSeconds % 3600;
    var hours = (timeInSeconds - reminderHour) / 3600;
    var reminderMinutos = timeInSeconds % 60;
    var minutes = (reminderHour - reminderMinutos) / 60;

    console.log("Tempo de trabalho:" + hours + ":" + minutes + ":" + reminderMinutos)
}

calculateWorkingHours(8, 35, 0, 16, 0, 30);

// Alínea 6 =======================================================

function drawRectangle(width, height) {

    for (let j = 0; j < height; j++) {
        var line = "";
        for (let i = 0; i < width; i++) {
            line += "*"
        }
        console.log(line);
    }
}
drawRectangle(5, 3);

// Alínea 7 =======================================================

function drawTriangle(height) {

    for (let j = 0; j <= height; j++) {
        var line = "";
        for (let i = 0; i < j; i++) {
            line += "*";
        }
        console.log(line);
    }
}
drawTriangle(10);

// Alínea 8 =======================================================

function drawBox(width, height) {

    for (let j = 0; j < height; j++) {
        var line = "";
        for (let i = 0; i < width; i++) {

            if (j == 0 || j == height - 1 || i == width - 1 || i == 0) {
                line += "*"
            } else {
                line += " "
            }

        }
        console.log(line);
    }
}
console.log("");
drawBox(10, 10);

// Alínea 9 =======================================================

var student1 = {
    firstName: "Miguel",
    lastName: "Gois",
    age: 24,
    grade: 19.9,
    getGrade: function() {
        return this.firstName + " " + this.lastName + ":" + this.grade
    }
};
var student2 = {
    firstName: "Monica",
    lastName: "Freitas",
    age: 20,
    grade: 20,
    getGrade: function() {
        return this.firstName + " " + this.lastName + ":" + this.grade
    }
};
var student3 = {
    firstName: "Daniela",
    lastName: "Santos",
    age: 16,
    grade: 13.9,
    getGrade: function() {
        return this.firstName + " " + this.lastName + ":" + this.grade
    }
};
var student4 = {
    firstName: "Luis",
    lastName: "Santos",
    age: 20,
    grade: 16.9,
    getGrade: function() {
        return this.firstName + " " + this.lastName + ":" + this.grade
    }
};
var student5 = {
    firstName: "Tiago",
    lastName: "Rocha",
    age: 28,
    grade: 9.6,
    getGrade: function() {
        return this.firstName + " " + this.lastName + ":" + this.grade
    }
};
var student6 = {
    firstName: "Mauricio",
    lastName: "Moniz",
    age: 24,
    grade: 13.9,
    getGrade: function() {
        return this.firstName + " " + this.lastName + ":" + this.grade
    }
};
var student7 = {
    firstName: "Matilde",
    lastName: "Pinto",
    age: 4,
    grade: 7.5,
    getGrade: function() {
        return this.firstName + " " + this.lastName + ":" + this.grade
    }
};
var student8 = {
    firstName: "Julia",
    lastName: "Reis",
    age: 16,
    grade: 9,
    getGrade: function() {
        return this.firstName + " " + this.lastName + ":" + this.grade
    }
};
var student9 = {
    firstName: "Andreia",
    lastName: "Reis",
    age: 18,
    grade: 8,
    getGrade: function() {
        return this.firstName + " " + this.lastName + ":" + this.grade
    }
};

var studentsList = [];

studentsList.push(student1);
studentsList.push(student2);
studentsList.push(student3);
studentsList.push(student4);
studentsList.push(student5);
studentsList.push(student6);
studentsList.push(student7);
studentsList.push(student8);
studentsList.push(student9);

function displayGrades(array) {
    for (let i = 0; i < array.length; i++) {
        const student = array[i];
        console.log(student.getGrade());
    }
}

console.log("Alinea 9")
displayGrades(studentsList);

function getBestGrade(array) {
    var max = array[0];
    for (let j = 0; j < array.length; j++) {
        if (array[j].grade > max.grade) {
            max = array[j];
        }
    }
    return max;
}

var bestGrade = getBestGrade(studentsList);
console.log()
console.log("Melhor aluno: ")
console.log(bestGrade.getGrade());

function getWorstGrade(array) {
    var worst = array[0];
    for (let j = 0; j < array.length; j++) {
        if (array[j].grade < min.grade) {
            worst = array[j];
        }
    }
    return worst;
}

function getPositiveGrade(array) {
    var positive = array[0];
    for (let j = 0; j < array.length; j++) {
        if (array[j].grade >= 10) {
            positive >= array[j];
        }
    }
    return positive;
}

function getAverage(array) {
    var average = 0;
    for (let i = 0; i < array.length; i++) {
        average += array[i].grade;
    }
    average = average / array.length;
    return average
}

function getClosestFromAverage(array) {
    var average = getAverage(array);
    var min = array[0];
    var index = 0;
    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        var diff = Math.abs(array[i].grade - average);
        if (diff < min) {
            min = dif;
            index = i;
        }
    }
    return array[index];
}

var thisGrade = getClosestFromAverage(studentsList);

console.log(thisGrade.getGrade());