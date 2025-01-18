import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IResponse } from '@/types/response.interface';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, IResponse<T>> {
  intercept(_: ExecutionContext, next: CallHandler): Observable<IResponse<T>> {
    return next.handle().pipe(
      map((data: T) => {
        if (data === null) {
          return {
            code: 0,
            success: true,
          };
        }

        return {
          code: 0,
          success: true,
          data,
        };
      }),
    );
  }
} 
