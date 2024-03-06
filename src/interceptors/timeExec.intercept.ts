import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class timeExecInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
		const init = Date.now();

		return next.handle().pipe(tap(() => console.log(`Time execution: ${Date.now() - init}ms`)));
	}
}
