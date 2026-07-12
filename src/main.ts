import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Set global prefix to 'apilocket'
  app.setGlobalPrefix('apilocket');
  
  // Enable CORS for frontend requests
  app.enableCors();

  // Use global pipes for class-validator
  app.useGlobalPipes(new ValidationPipe({ 
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true
  }));

  await app.listen(3001);
  console.log('NestJS server successfully started on http://localhost:3001/apilocket');
}
bootstrap();
