import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import timeExecInterceptor from './interceptors/timeExec.intercept';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(new ValidationPipe());
	app.useGlobalInterceptors(new timeExecInterceptor());
	await app.listen(3000);
}
bootstrap();
