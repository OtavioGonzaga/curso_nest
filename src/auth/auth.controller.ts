import { Body, Controller, Post, UseGuards, Req } from '@nestjs/common';
import { AuthLoginDTO } from './dto/auth-login.dto';
import { AuthRegisterDTO } from './dto/auth-register.dto';
import { AuthForgetDTO } from './dto/auth-forget.dto';
import { AuthResetDTO } from './dto/auth-reset.dto';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('auth')
export class AuthController {
	constructor(
		private readonly userService: UsersService,
		private readonly authService: AuthService
	) {}

	@Post('register')
	async register(@Body() body: AuthRegisterDTO) {
		return await this.authService.register(body);
	}

	@Post('login')
	async login(@Body() { email, password }: AuthLoginDTO) {
		return await this.authService.login(email, password);
	}

	@Post('forget')
	async forget(@Body() { email }: AuthForgetDTO) {
		return await this.authService.forget(email);
	}

	@Post('reset')
	async reset(@Body() body: AuthResetDTO) {
		return await this.reset(body);
	}

	@UseGuards(AuthGuard)
	@Post('me')
	async me(@Req() req) {
		return await req.tokenPayload;
	}
}
