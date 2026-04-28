import { Injectable, ApplicationRef, createComponent, EnvironmentInjector } from '@angular/core';
import { ToastComponent } from './toast.component';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private toastRef: any = null;
  private toastVisible = false;

  constructor(
    private appRef: ApplicationRef,
    private injector: EnvironmentInjector
  ) {
    console.log('🔧 ToastService constructor called');
  }

  show(message: string): void {
    console.log('🔔🔔🔔 TOAST SHOW CALLED 🔔🔔🔔');
    console.log('📝 Message:', message);
    console.log('📊 Current state - toastRef:', this.toastRef ? 'EXISTS' : 'null');
    console.log('📊 Current state - toastVisible:', this.toastVisible);
    
    // Hide existing toast if any
    if (this.toastRef) {
      console.log('🔄 Removing existing toast...');
      this.hide();
    }

    try {
      // Create new toast component
      console.log('🏗️ Creating toast component...');
      const componentRef = createComponent(ToastComponent, {
        environmentInjector: this.injector
      });
      
      console.log('✅ Component created:', componentRef);
      
      componentRef.instance.message = message;
      componentRef.instance.close.subscribe(() => {
        console.log('❌ Toast closed by user');
        this.hide();
      });

      // Add to DOM
      document.body.appendChild(componentRef.location.nativeElement);
      console.log('📌 Added to DOM');
      
      this.appRef.attachView(componentRef.hostView);
      console.log('👁️ View attached');
      
      this.toastRef = componentRef;
      this.toastVisible = true;
      
      console.log('✅✅✅ TOAST IS NOW VISIBLE ✅✅✅');
      console.log('📊 New state - toastRef:', this.toastRef ? 'EXISTS' : 'null');
      console.log('📊 New state - toastVisible:', this.toastVisible);

      // Auto-hide after 5 seconds
      setTimeout(() => {
        console.log('⏰ Auto-hide timeout reached');
        this.hide();
      }, 5000);
      
    } catch (error) {
      console.error('❌❌❌ ERROR SHOWING TOAST ❌❌❌');
      console.error('Error details:', error);
    }
  }

  hide(): void {
    console.log('🔽🔽🔽 TOAST HIDE CALLED 🔽🔽🔽');
    console.log('📊 State before hide - toastRef:', this.toastRef ? 'EXISTS' : 'null');
    
    if (this.toastRef) {
      try {
        this.appRef.detachView(this.toastRef.hostView);
        console.log('👁️ View detached');
        
        this.toastRef.destroy();
        console.log('💥 Component destroyed');
        
        this.toastRef = null;
        this.toastVisible = false;
        
        console.log('✅✅✅ TOAST HIDDEN ✅✅✅');
      } catch (error) {
        console.error('❌ Error hiding toast:', error);
      }
    } else {
      console.log('⚠️ No toast to hide');
    }
  }

  isVisible(): boolean {
    return this.toastVisible;
  }
}