import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import Validate from './common/validate';
import { TransformInterceptor } from './interceptor/transform.interceptor';
import { NestExpressApplication } from '@nestjs/platform-express';

BigInt.prototype['toJSON'] = function () {
  return this.toString();
};

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new Validate());
  app.useGlobalInterceptors(new TransformInterceptor());
  app.setGlobalPrefix('api'); // 给所有的请求添加api的根路径
  await app.listen(3000);
}
bootstrap();
