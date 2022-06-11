const http = require("http");

async function bootstrap() {
  const NestFactory = new NestFactoryStatic()
  const app = await NestFactory.create(ApplicationModule);
  await app.listen(3001, () => console.log('listening on http://localhost:3001'));
}
bootstrap();

class NestFactoryStatic {
  public async create(
    module: any,
  ) {
    //new ExpressAdapter(httpServer)
    const httpServer = http.createServer((req: any, res: any) => {
      console.log('server started');
    
      res.setHeader("UserId", 12);
      res.setHeader("Content-Type", "text/html; charset=utf-8;");
      res.write("<h2>hello world</h2>");
      res.end();
    })

    const applicationConfig = new ApplicationConfig();
    const container = new NestContainer(applicationConfig);
    this.setAbortOnError(serverOrOptions, options);
    this.registerLoggerConfiguration(appOptions);

    await this.initialize(module, container, applicationConfig, httpServer);

    const instance = new NestApplication(
      container,
      httpServer,
      applicationConfig,
      appOptions,
    );
    const target = this.createNestInstance(instance);
    return this.createAdapterProxy<T>(target, httpServer);
  }
}
