"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function upper(target) {
    target.prototype.toUpper = function () {
        this.msg = this.msg.toUpperCase();
    };
}
function subString(a, b) {
    return function (target) {
        target.prototype.subString = function () {
            this.msg = this.msg.substring(a, b);
        };
    };
}
function logger(suffix) {
    return function (target, name, descriptor) {
        var oldValue = descriptor.value;
        descriptor.value = function () {
            console.log("[" + suffix + "] " + new Date().toJSON() + " :");
            oldValue.call(this);
        };
    };
}
var Main = /** @class */ (function () {
    function Main(msg) {
        this.msg = msg;
    }
    Main.prototype.toUpper = function () { };
    // @logger("logger")
    Main.prototype.say = function () {
        console.log("say", this.msg);
    };
    Main = __decorate([
        upper,
        subString(1, 3)
    ], Main);
    return Main;
}());
var m = new Main("tom");
m.say();
m.toUpper();
m.say();
m.subString();
m.say();
