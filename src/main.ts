import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { TrimPipe } from './pipes/trim.pipe';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  app.use(morgan('dev'));

  app.useGlobalPipes(
    new TrimPipe(),
    new ValidationPipe({ transform: true }),
  );

  app.enableCors({
    origin: 'http://localhost:0808',
    credential: true
  })

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
