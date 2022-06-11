const http = require("http");
export const isFunction = (val: any): boolean => typeof val === 'function';
export const isConstructor = (val: any): boolean => val === 'constructor';

export class NestFactoryStatic {
  public async create(module: any) {
    //new ExpressAdapter(httpServer)
    const httpServer = http.createServer((req: any, response: any) => {
      console.log('server started');
      response.writeHead(200, {'Content-Type': 'text/html'})
      const { url, method } = req
      

      if (url === '/') {
        response.write("<h2>hello world4</h2>");
        response.end();
      }

      for (const path of ['/info']) {
        if (url === path) {
          // get controllerMethod
          const controller = Reflect.getMetadata('controllers', module)
          const provider = Reflect.getMetadata('providers', module)

          const service = new provider[0]
          const instance = new controller[0](service)

          const scanForPaths = (instance: any) => {
            const prototype = Object.getPrototypeOf(instance)

            return Object.getOwnPropertyNames(prototype).filter(name => !isConstructor(name) && isFunction(prototype[name]))
          }

          const instanceMethods = scanForPaths(instance)

          console.log("REFLECT: ", instance.getHello(), service)
          console.log('Controller method: ', instanceMethods)
        }

        // chain methods and routes
        // const f = Reflect.getMetadata('functions ', module)
        const someFunc =  function() {
          console.log('thisis reflect')
        }
        class A {
          someFunc() {}
        }
        const a = new A()
        Reflect.defineMetadata('method', 'get', a.someFunc );
        Reflect.defineMetadata('path', '/test', a.someFunc);
        const p = Reflect.getMetadata('path', a['someFunc'])
        console.log({ p })
        

        response.end();
      }
    })

    // await this.initialize(module, container, applicationConfig, httpServer);

    // const instance = new NestApplication(
    //   container,
    //   httpServer,
    //   applicationConfig,
    //   appOptions,
    // );
    // const target = this.createNestInstance(instance);

    return httpServer;
  }
}