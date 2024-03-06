import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatePatchUserDTO, UpdatePutUserDTO } from './dto/update-user.dto';
import { UsersService } from './users.service';
@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	async create(@Body() body: CreateUserDTO) {
		return await this.usersService.create(body);
	}

	@Get()
	async read(): Promise<CreateUserDTO[]> {
		return this.usersService.read();
	}

	@Get(':id')
	async readOne(@Param('id', ParseIntPipe) id: number) {
		return await this.usersService.readOne(id);
	}

	@Put(':id')
	async updateAll(@Body() body: UpdatePutUserDTO, @Param('id', ParseIntPipe) id: number) {
		return await this.usersService.update({ ...body, id });
	}

	@Patch(':id')
	async update(@Body() body: UpdatePatchUserDTO, @Param('id', ParseIntPipe) id: number) {
		return await this.usersService.updateOneField({ ...body, id });
	}

	@Delete('iamsure')
	async deleteAll() {
		return await this.usersService.deleteAll();
	}

	@Delete(':id')
	async delete(@Param('id', ParseIntPipe) id: number) {
		return await this.usersService.delete(id);
	}
}
