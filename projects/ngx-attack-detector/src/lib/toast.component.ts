import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'nad-toast',
  standalone: true,
  template: `
    <div class="nad-toast" (click)="close.emit()">
      <span class="nad-toast-icon"></span>
      <span class="nad-toast-message">{{ message }}</span>
      <button class="nad-toast-close" (click)="close.emit()">✕</button>
    </div>
  `,
  styles: [`
    .nad-toast {
      position: fixed;
      top: 20px;
      right: 20px;
      background: #ff4444;
      color: white;
      padding: 16px 24px;
      border-radius: 8px;
      box-shadow: 0 4px 20px rgba(255, 0, 0, 0.4);
      z-index: 99999;
      display: flex;
      align-items: center;
      gap: 12px;
      animation: slideIn 0.5s ease-out;
      cursor: pointer;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      font-size: 16px;
      font-weight: 500;
      min-width: 300px;
      border: 2px solid #cc0000;
    }
    .nad-toast-icon {
      font-size: 24px;
    }
    .nad-toast-message {
      flex: 1;
    }
    .nad-toast-close {
      background: rgba(255, 255, 255, 0.3);
      border: none;
      color: white;
      font-size: 20px;
      cursor: pointer;
      padding: 4px 8px;
      border-radius: 4px;
      transition: background 0.2s;
    }
    .nad-toast-close:hover {
      background: rgba(255, 255, 255, 0.5);
    }
    @keyframes slideIn {
      from { 
        transform: translateX(100%); 
        opacity: 0; 
      }
      to { 
        transform: translateX(0); 
        opacity: 1; 
      }
    }
  `]
})
export class ToastComponent {
  @Input() message: string = '';
  @Output() close = new EventEmitter<void>();
}