import { MiddlewareConsumer, Module, NestModule, RequestMethod, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import UserIdCheckerMiddleware from 'src/middlewares/userIDCheck.middleware';
import { AuthModule } from 'src/auth/auth.module';

@Module({
	imports: [PrismaModule, forwardRef(() => AuthModule)],
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
