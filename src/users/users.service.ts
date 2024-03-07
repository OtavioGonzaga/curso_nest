import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdatePatchUserDTO, UpdatePutUserDTO } from './dto/update-user.dto';

@Injectable()
export class UsersService {
	constructor(private readonly prisma: PrismaService) {}

	async exists(id: number) {
		if (
			!(await this.prisma.users.count({
				where: { id }
			}))
		)
			throw new NotFoundException(`User ${id} does not exist`);
	}

	async create(data: CreateUserDTO) {
		return await this.prisma.users.create({
			data: data
		});
	}

	async read() {
		return await this.prisma.users.findMany();
	}

	async readOne(id: number) {
		const user = await this.prisma.users.findUnique({
			where: { id }
		});

		try {
			if (user.id) return user;
		} catch {
			throw new NotFoundException(`User ${id} does not exist`);
		}
	}

	async update(data: UpdatePutUserDTO) {
		await this.exists(data.id);
		return await this.prisma.users.update({
			where: { id: data.id },
			data: data
		});
	}

	async updateOneField(data: UpdatePatchUserDTO) {
		await this.exists(data.id);
		return await this.prisma.users.update({
			where: { id: data.id },
			data: { ...data }
		});
	}

	async delete(id: number) {
		await this.exists(id);
		return await this.prisma.users.delete({
			where: { id }
		});
	}

	async deleteAll() {
		await this.prisma.users.deleteMany();
	}
}
