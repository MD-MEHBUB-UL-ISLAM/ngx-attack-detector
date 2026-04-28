import { NgModule, ModuleWithProviders, Injectable } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AttackDetectorInterceptor } from './attack-detector.interceptor';
import { AttackDetectorService, AttackConfig } from './attack-detector.service';
import { ToastService } from './toast.service';
import { GlobalRequestMonitor } from './global-request-monitor.service';

@Injectable()
export class AttackDetectorInitializer {
  constructor(
    private detector: AttackDetectorService,
    private toast: ToastService,
    private globalMonitor: GlobalRequestMonitor
  ) {
    console.log('🚀🚀🚀 AttackDetectorInitializer STARTED 🚀🚀🚀');
    console.log('🔧 Services injected:');
    console.log('  - Detector:', this.detector ? '✅' : '❌');
    console.log('  - Toast:', this.toast ? '✅' : '❌');
    console.log('  - GlobalMonitor:', this.globalMonitor ? '✅' : '❌');
    
    this.globalMonitor.start();
    console.log('🌐 Global monitor started');
    
    this.detector.attackDetected$.subscribe(isAttack => {
      console.log('🔔🔔🔔 ATTACK SUBSCRIPTION TRIGGERED 🔔🔔🔔');
      console.log('📊 isAttack:', isAttack);
      
      if (isAttack) {
        const message = this.detector.getConfig().toastMessage;
        console.log('📝 Calling toast.show() with message:', message);
        this.toast.show(message);
      }
    });
    
    console.log('✅ AttackDetectorInitializer fully initialized');
  }
}

@NgModule({
  imports: [HttpClientModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AttackDetectorInterceptor,
      multi: true
    }
  ]
})
export class AttackDetectorModule {
  static forRoot(config?: Partial<AttackConfig>): ModuleWithProviders<AttackDetectorModule> {
    console.log('🏭 AttackDetectorModule.forRoot() called with config:', config);
    return {
      ngModule: AttackDetectorModule,
      providers: [
        AttackDetectorService,
        ToastService,
        GlobalRequestMonitor,
        AttackDetectorInitializer,
        ...(config ? [{ provide: 'ATTACK_CONFIG', useValue: config }] : [])
      ]
    };
  }
}