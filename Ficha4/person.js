function Person(firstName, lastName, age) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
}

Person.prototype.greet = function() {
    console.log("Hello! " + this.firstName + " " + this.lastName + " " + this.age + " " + this.gender)
}

Person.prototype.gender = "N/A";

var p1 = new Person("Miguel", "Gois", 24);
var p2 = new Person("Monica", "Freitas", 20);

p1.gender = "M";
p2.gender = "F";

console.log(p2.gender);

p1.greet();
p2.greet();

console.log(p1.__proto__);