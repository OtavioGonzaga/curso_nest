import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export default class timeExecInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
		const init = Date.now();

		console.log({ URL: context.switchToHttp().getRequest().path });
		console.log({ METHOD: context.switchToHttp().getRequest().method });

		return next.handle().pipe(tap(() => console.log(`Time execution: ${Date.now() - init}ms`)));
	}
}
