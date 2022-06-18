
function sum(x, y) { return x + y; }
function double(x) { return sum(x, x); }
function minus (x, y) { return x - y; }
function addOne(x) { return sum(x, 1); }

function chain(functionsObj) {
  const Chaining = function () {
    this.amount = 0;
    console.log("create empty chain");
  }
  

  const ch = new Chaining();

  for (const fn in functionsObj) {
    console.log(fn)
    ch[fn] = function (...args) {
      console.log('arguments', args, this.amount) 
      if (this.amount) args = [this.amount, ...args]
      console.log(args)
      this.amount = functionsObj[fn](...args)
      return this;
    }
  }

  ch.execute = function () { return this.amount }

  return ch
} 

let c = chain({ sum, minus, double, addOne });

console.log('create c') 
console.log(c)
console.log('create c1') 
const c1 = c.sum(1,2)
console.log(c1) 
console.log('EXECUTE ', c1.execute(), ' == 3') 
console.log('AFTER EXECUTE ', c1)
console.log('SUMM') 
console.log(c1.sum(4, 5), c1.execute()) // 7
console.log('ADD ONE') 
console.log(c1.addOne(4, 5), c1.execute(), 8) // 9

// const res = c.sum(4, 5).sum(5).minus(4).sum(7).addOne().double().double().execute(); // 72

// console.log(res) //72