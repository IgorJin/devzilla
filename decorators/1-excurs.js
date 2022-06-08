"use strict";
// function upper(target: any) {
//   console.log(target)
//   target.prototype.toUpper = function() {
//     this.msg = this.msg.toUpperCase();
//   };
// }
// function subString(a: any, b: any) {
//   return function(target: any) {
//     target.prototype.subString = function() {
//       this.msg = this.msg.substring(a, b);
//     };
//   };
// }
// function logger(suffix: any) {
//   return function(target: any, name: any, descriptor: any) {
//     const oldValue = descriptor.value;
//     descriptor.value = function() {
//       console.log("[" + suffix + "] " + new Date().toJSON() + " :");
//       oldValue.call(this);
//     };
//   };
// }
// interface ClockInterface {
//   msg: any
// }
// @upper
// @subString(1, 3)
// class Main implements ClockInterface {
//   toUpper() {}
//   msg: any
//   subString: any
//   constructor(msg: any) {
//     this.msg = msg+'kis';
//   }
//   @logger("logger")
//   say() {
//     console.log("say", this.msg);
//   }
// }
// const m = new Main("tom");
// m.say();
// m.toUpper();
// m.say();
// m.subString();
// m.say();
