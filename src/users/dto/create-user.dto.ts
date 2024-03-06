import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class CreateUserDTO {
	id: number;

	@IsString()
	name: string;

	@IsEmail()
	email: string;

	@IsStrongPassword({
		minLength: 6,
		minNumbers: 1,
		minUppercase: 0,
		minLowercase: 0,
		minSymbols: 0
	})
	password: string;
}
