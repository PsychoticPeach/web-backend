/*var a = 10;
var b = 5;
var c = a + b;

console.log(c);

var miniProjeto = 16;
var frequencia = 10;
var projetoFinal = 12;

var notaFinal = miniProjeto * 0.3 + frequencia * 0.3 + projetoFinal * 0.4;
console.log("A avaliação final é: " + Math.round(notaFinal) + " valores.");


var month = 5;

if (month == 1) {
    console.log("Janeiro")
} else if (month == 2) {
    console.log("Fevereiro")
} else if (month == 3) {
    console.log("Março")
} else if (month == 4) {
    console.log("Abril")
} else if (month == 5) {
    console.log("Maio")
} else if (month == 6) {
    console.log("Junho")
} else if (month == 7) {
    console.log("Julho")
} else if (month == 8) {
    console.log("Agosto")
} else if (month == 9) {
    console.log("Setembro")
} else if (month == 10) {
    console.log("Outubro")
} else if (month == 11) {
    console.log("Novembro")
} else if (month == 12) {
    console.log("Dezembro")
}

switch (month) {
    case 1:
        console.log("Janeiro");
        break;
    case 2:
        console.log("Fevereiro");
        break
    case 3:
        console.log("Março");
        break
    case 4:
        console.log("Abril");
        break
    case 5:
        console.log("Maio");
        break
    case 6:
        console.log("Junho");
        break
    case 7:
        console.log("Julho");
        break
    case 8:
        console.log("agosto");
        break
    case 9:
        console.log("Setembro");
        break
    case 10:
        console.log("Outubro");
        break
    case 11:
        console.log("Novembro");
        break
    case 12:
        console.log("Dezembro");
        break
    default:
        console.log("Mês invalido");
        break
}

var months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]

if (months[month - 1] == undefined) {
    console.log("Mês Inválido");
} else {
    console.log(months[month - 1]);
}

if (month > 12 || month < 0) {
    console.log("Mês inválido.");
} else {
    console.log(months[month]);
}



var operador1 = 2;
var operador2 = 3;
var operando = "+";
var resultado = 0;
if (operando == "+") {
    resultado = operador1 + operador2;
} else if (operando == "-") {
    resultado = operador1 - operador2;
} else if (operando == "*") {
    resultado = operador1 * operador2;
} else if (operando == "/") {
    resultado = operador1 / operador2;
} else if (operando == "^") {
    resultado = Math.pow(operador1, operador2);
}

console.log(resultado);

var i = 0;

var d = 3 / 2;
var r = 3 % 2;
console.log(d);
console.log(r);

while (i < 10) {
    if (i % 5 == 0) {
        console.log(i)
    }
    i++;
}

while (i <= 20) {
    console.log(i);
    i += 5;
}

for (let j = 0; j <= 20; j++) {
    if (i % 5 == 0) {
        console.log(j);
    } 
}*/

// var sum = 0
// for (let j = 0; j <= 100; j++) {
//     sum += j;
// }

// console.log(sum);

// var fact = 1;

// for (let j = 1; j <= 3; j++) {
//     fact *= j;
// }
// console.log(fact)

var array = [1, 4, 5, 7, 0, 12];
var max = array[0];
for (let i = 0; i < array.length; i++) {
    if (array[i] > max) {
        max = array[i]
    }
}
console.log(max);

var min = array[0]
for (let i = 0; i < array.length; i++) {
    if (array[i] > min) {
        min = array[i]
    }
}
console.log(min);

var sum = 0
var average = 0
for (let i = 0; i < array.length; i++) {
    sum += array[i];
}
average = sum / array.length;
console.log(average)