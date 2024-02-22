import { Body, Controller, Get, Param, Post } from '@nestjs/common';

interface usersInterface {
	id: number;
	name: string;
	email: string;
	password: string;
}

const users: usersInterface[] = [
	{
		id: 1,
		name: 'Otavio',
		email: 'otavio@gmail.com',
		password: '123456'
	},
	{
		id: 2,
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
	async readOne(@Param() param: { id: number }): Promise<usersInterface> {
		return users.find(user => user.id == param.id);
	}
}
