var student1 = {
    firstName: "Miguel",
    lastName: "Gois",
    age: 24,
    grade: 19.9,
    getGrade: function() {
        return this.firstName + " " + this.lastName + ":" + this.grade
    }
};

function person(firstName, lastName) {
    this.firstName = firstName,
        this.lastName = lastName
}

var john = new person("John", "Doe");
john.greet