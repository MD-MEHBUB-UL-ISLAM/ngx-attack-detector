import { Component, OnInit } from '@angular/core';
import { AttackDetectorService, GlobalRequestMonitor, ToastService } from 'ngx-attack-detector';

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [AttackDetectorService, GlobalRequestMonitor, ToastService],
  template: `
    <div style="padding: 40px; font-family: Arial; text-align: center;">
      <h1 style="color: #DD0031;">🛡️ Attack Detector Test</h1>
      <p style="color: green;">✅ Library loaded successfully!</p>
      
      <button (click)="testAttack()" 
              style="padding: 15px 40px; background: #ff4444; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 18px; font-weight: bold; margin: 20px;">
        🔴 Simulate Attack
      </button>
    </div>
  `
})
export class App implements OnInit {
  constructor(
    private detector: AttackDetectorService,
    private toast: ToastService,
    private monitor: GlobalRequestMonitor
  ) {
    console.log('✅ All services injected!');
  }

  ngOnInit(): void {
    this.detector.configure({
      windowMs: 5000,
      maxRequests: 10,
      toastMessage: ' Script Attack Detected! Your application is under unusual traffic.'
    });
    
    this.monitor.start();
    
    this.detector.attackDetected$.subscribe(isAttack => {
      if (isAttack) {
        this.toast.show(this.detector.getConfig().toastMessage);
      }
    });
    
    console.log('✅ Attack detector initialized!');
  }

  testAttack(): void {
    console.log('🔥 Firing 20 requests...');
    for (let i = 0; i < 20; i++) {
      fetch('https://jsonplaceholder.typicode.com/todos/1');
    }
  }
}