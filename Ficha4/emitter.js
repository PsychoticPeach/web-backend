class Emitter {
    constructor() {
        //property
        this.events = {
            teste: 2,
            prog: 3
        };
    }
}

//function ou method
Emitter.prototype.on = function(type, listener) {
    // console.log("Type: " + type + ", Listener: " + listener)

    if (this.events[type] == undefined) { // é a mesma coisa que !this.events[type]
        this.events[type] = [];
    }

    this.events[type].push(listener);
}

Emitter.prototype.emit = function(type) {
    if (this.events[type] != undefined) { // é a mesma coisa que !this.events[type]
        this.events[type].forEach(function(listener) {
            listener();
        });
    }
}


module.exports = Emitter;