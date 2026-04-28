import { Injectable } from '@angular/core';
import { AttackDetectorService } from './attack-detector.service';

@Injectable({ providedIn: 'root' })
export class GlobalRequestMonitor {
  private originalFetch: typeof fetch | null = null;
  private originalXHROpen: typeof XMLHttpRequest.prototype.open | null = null;
  private isPatched = false;

  constructor(private detector: AttackDetectorService) {}

  start(): void {
    if (this.isPatched) return;
    this.isPatched = true;
    this.patchFetch();
    this.patchXHR();
  }

  private patchFetch(): void {
    if (typeof window === 'undefined' || typeof fetch === 'undefined') return;
    this.originalFetch = window.fetch;
    
    // Capture 'this' reference for use inside the patched function
    const detector = this.detector;
    
    window.fetch = function(...args: any[]): Promise<Response> {
      detector.recordRequest();
      return (originalFetch as any).apply(window, args);
    } as any;
    
    // Store reference to original for cleanup
    const originalFetch = this.originalFetch;
  }

  private patchXHR(): void {
    if (typeof window === 'undefined') return;
    this.originalXHROpen = XMLHttpRequest.prototype.open;
    
    const detector = this.detector;
    const originalXHROpen = this.originalXHROpen;
    
    XMLHttpRequest.prototype.open = function(
      method: string,
      url: string | URL,
      async?: boolean,
      username?: string | null,
      password?: string | null
    ) {
      this.addEventListener('loadend', () => detector.recordRequest());
      return originalXHROpen!.call(this, method, url, async !== false, username, password);
    };
  }

  stop(): void {
    if (!this.isPatched) return;
    this.isPatched = false;
    if (this.originalFetch && typeof window !== 'undefined') {
      window.fetch = this.originalFetch;
      this.originalFetch = null;
    }
    if (this.originalXHROpen) {
      XMLHttpRequest.prototype.open = this.originalXHROpen;
      this.originalXHROpen = null;
    }
  }
}