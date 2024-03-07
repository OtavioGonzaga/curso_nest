import { BadRequestException, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export default class UserIdCheckerMiddleware implements NestMiddleware {
	use(req: Request, res: Response, next: NextFunction) {
		if (isNaN(Number(req.params.id)) || Number(req.params.id) <= 0) throw new BadRequestException('Invalid id');

		next();
	}
}
