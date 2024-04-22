import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Users } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
	constructor(
		private readonly jwtService: JwtService,
		private readonly prisma: PrismaService
	) {}

	async createToken(user: Users) {
		return {
			token: await this.jwtService.signAsync(
				{
					name: user.name,
					email: user.email
				},
				{
					expiresIn: '7 days',
					subject: String(user.id)
				}
			)
		};
	}

	async verifyToken(token: string) {
		try {
			return await this.jwtService.verifyAsync(token);
		} catch (e) {
			throw new BadRequestException(e);
		}
	}

	async register(data: CreateUserDTO) {
		const user = await this.prisma.users.create({ data });

		return await this.createToken(user);
	}

	async login(email: string, password: string) {
		const user = await this.prisma.users.findFirst({
			where: {
				email
			}
		});

		if (!user || !(await bcrypt.compare(password, user.password))) throw new UnauthorizedException('Wrong email or password');

		return await this.createToken(user);
	}

	async forget(email: string) {
		const user = await this.prisma.users.findFirst({
			where: { email }
		});

		if (!user) throw new NotFoundException('There is no user with that email');

		// TODO:send email
		return user;
	}

	async reset(password: string, token: string) {
		// TODO: validate token
		token;

		const id = 0;

		await this.prisma.users.update({
			where: { id },
			data: { password }
		});
	}
}
