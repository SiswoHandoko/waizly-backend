import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class ResponseLoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(ResponseLoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();

    return next
      .handle()
      .pipe(
        tap((data) => {
          const response = context.switchToHttp().getResponse();
          const request = context.switchToHttp().getRequest();
          // Print Log from Interceptor 
          this.logger.log(
            `[${request.method}] ${request.url} - ${response.statusCode} - ${Date.now() - now}ms - ${JSON.stringify(data)}`,
          );
        }),
      );
  }
}