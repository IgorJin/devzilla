import { NestFactoryStatic } from './factory'
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { Controller, Get, Module } from './common';

@Controller()
class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  methodInController(): string {
    return this.appService.getHello();
  }

  @Get('test')
  getTestReq(): string {
    return this.appService.getTestReq()
  }
}

class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getTestReq(): string {
    return 'test route'
  }
}

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

async function bootstrap() {
  const NestFactory = new NestFactoryStatic()
  const app = await NestFactory.create(AppModule);

  app.on('listening', () => console.log('listening on http://'))

  await app.listen(3001, () => console.log('listening on http://localhost:3001'));
}

bootstrap();

