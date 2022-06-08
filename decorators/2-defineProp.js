const obj = {
  get getter() { return 11 },
  get s() { return 12 },
  prop: true,
  method: function() { return 'inside method' },
};

['getter','prop','method'].forEach(function(p){
    console.log(Object.getOwnPropertyDescriptor(obj, p))
  })

console.log(obj.getter, obj.s)