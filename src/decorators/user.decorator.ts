import { ExecutionContext, NotFoundException, createParamDecorator } from '@nestjs/common';

export const User = createParamDecorator(async (filter: string | null, context: ExecutionContext) => {
	const user = await context.switchToHttp().getRequest().user;

	if (filter) return user[filter];
	if (user) return user;
	throw new NotFoundException('User not found. Use AuthGuard to request');
});
