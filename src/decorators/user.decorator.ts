import { ExecutionContext, NotFoundException, createParamDecorator } from '@nestjs/common';

export const User = createParamDecorator((filter: string | null, context: ExecutionContext) => {
	const user = context.switchToHttp().getRequest().user;

	if (filter) return user[filter];
	if (user) return user;
	throw new NotFoundException('User not found. Use AuthGuard to request');
});
