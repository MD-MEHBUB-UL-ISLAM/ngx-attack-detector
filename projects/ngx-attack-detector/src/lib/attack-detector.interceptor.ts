import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AttackDetectorService } from './attack-detector.service';

@Injectable()
export class AttackDetectorInterceptor implements HttpInterceptor {
  constructor(private detector: AttackDetectorService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap({
        next: () => this.detector.recordRequest(),
        error: () => this.detector.recordRequest() // also count errors
      })
    );
  }
}