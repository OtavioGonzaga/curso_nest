import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import UserIdCheckerMiddleware from 'src/middlewares/userIDCheck.middleware';

@Module({
	imports: [PrismaModule],
	controllers: [UsersController],
	providers: [UsersService],
	exports: [UsersService]
})
export class UsersModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(UserIdCheckerMiddleware).forRoutes({
			path: 'users/:id',
			method: RequestMethod.ALL
		});
	}
}
