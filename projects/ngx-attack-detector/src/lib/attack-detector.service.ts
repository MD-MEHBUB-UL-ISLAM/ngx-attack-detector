import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface AttackConfig {
  windowMs: number;
  maxRequests: number;
  toastMessage: string;
}

@Injectable({ providedIn: 'root' })
export class AttackDetectorService {
  private requestTimestamps: number[] = [];
  private config: AttackConfig = {
    windowMs: 5000,
    maxRequests: 10,
    toastMessage: 'Script Attack Detected!'
  };
  
  private attackDetectedSubject = new BehaviorSubject<boolean>(false);
  public attackDetected$: Observable<boolean> = this.attackDetectedSubject.asObservable();

  configure(config: Partial<AttackConfig>): void {
    this.config = { ...this.config, ...config };
  }

  getConfig(): AttackConfig {
    return this.config;
  }

  recordRequest(): void {
    const now = Date.now();
    this.requestTimestamps.push(now);
    const windowStart = now - this.config.windowMs;
    this.requestTimestamps = this.requestTimestamps.filter(t => t >= windowStart);

    if (this.requestTimestamps.length > this.config.maxRequests) {
      this.attackDetectedSubject.next(true);
      setTimeout(() => this.reset(), 3000);
    }
  }

  reset(): void {
    this.requestTimestamps = [];
    this.attackDetectedSubject.next(false);
  }
}