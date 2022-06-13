// it(create new instance, check reflect)  CREATE IN BOTH CASES
      // const instance1 = new controller[0](service)
      // const instancePrototype1 = Object.getPrototypeOf(instance1)
      // const instanceMethods1 = scanForPaths(
      //   instancePrototype1, 
      //   (method: any) => exploreMethodMetadata(instancePrototype1, method)
      // )
      // console.log(instanceMethods1)

// chain methods and routes
// const f = Reflect.getMetadata('functions ', module)
// class A {
//   static someFunc() {
//     throw new Error("Method not implemented.");
//   }
// ----------------------------------------------------------------

// }
// const a = new A()
// Reflect.defineMetadata('method', 'get', A.someFunc );
// Reflect.defineMetadata('path', '/test', A.someFunc);
// const p = Reflect.getMetadata('path', A['someFunc'])
// const r = Reflect.getMetadata('path', a['someFunc'])
// console.log({ p })