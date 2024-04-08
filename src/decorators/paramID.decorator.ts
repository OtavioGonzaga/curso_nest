import { BadRequestException, ExecutionContext, createParamDecorator } from '@nestjs/common';

export const ParamID = createParamDecorator((_data: unknown, context: ExecutionContext) => {
	const id = Number(context.switchToHttp().getRequest().params.id);
	if (isNaN(id)) throw new BadRequestException();
	return id;
});
