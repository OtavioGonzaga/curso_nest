import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';

interface usersInterface {
	id: string;
	name: string;
	email: string;
	password: string;
}

const users: usersInterface[] = [
	{
		id: '1',
		name: 'Otavio',
		email: 'otavio@gmail.com',
		password: '123456'
	},
	{
		id: '2',
		name: 'Camila',
		email: 'camila@gmail.com',
		password: '123456'
	}
];

@Controller('users')
export class UsersController {
	@Post()
	async create(@Body() body: usersInterface): Promise<usersInterface[]> {
		users.push(body);
		return users;
	}

	@Get()
	async read(): Promise<usersInterface[]> {
		return users;
	}

	@Get(':id')
	async readOne(@Param() param: { id: string }): Promise<usersInterface> {
		return users.find(user => user.id == param.id);
	}

	@Put(':id')
	async updateAll(@Body() body: usersInterface, @Param() parameters: { id: string }): Promise<usersInterface[]> {
		users[users.findIndex(user => user.id == parameters.id)] = body;
		return users;
	}

	@Patch(':id')
	async update(@Body() body: usersInterface, @Param() parameters: { id: string }): Promise<usersInterface[]> {
		const index: number = users.findIndex(user => user.id == parameters.id);
		for (const prop in body) {
			users[index][prop] = body[prop];
		}
		return users;
	}

	@Delete(':id')
	async delete(@Param() parameters: { id: string }): Promise<usersInterface[]> {
		users.splice(
			users.findIndex(user => user.id == parameters.id),
			1
		);

		return users;
	}
}
