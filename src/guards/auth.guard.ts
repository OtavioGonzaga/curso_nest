import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private readonly authService: AuthService,
		private readonly usersService: UsersService
	) {}
	async canActivate(context: ExecutionContext) {
		try {
			const request = context.switchToHttp().getRequest();
			const tokenPayload = await this.authService.verifyToken((request.headers.authorization ?? '').split(' ')[1]);

			request.tokenPayload = tokenPayload;
			request.user = this.usersService.readOne(Number(tokenPayload.sub));

			return true;
		} catch (e) {
			console.error(e);
			return false;
		}
	}
}
