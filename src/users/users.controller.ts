import { Body, Controller, Delete, Get, Patch, Post, Put } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatePatchUserDTO, UpdatePutUserDTO } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { ParamID } from 'src/decorators/paramID.decorator';
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
	async readOne(@ParamID() id: number) {
		return await this.usersService.readOne(id);
	}

	@Put(':id')
	async updateAll(@Body() body: UpdatePutUserDTO, @ParamID() id: number) {
		return await this.usersService.update({ ...body, id });
	}

	@Patch(':id')
	async update(@Body() body: UpdatePatchUserDTO, @ParamID() id: number) {
		return await this.usersService.updateOneField({ ...body, id });
	}

	@Delete(':id')
	async delete(@ParamID() id: number) {
		return await this.usersService.delete(id);
	}
}
