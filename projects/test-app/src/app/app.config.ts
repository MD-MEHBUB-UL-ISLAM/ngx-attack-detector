import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AttackDetectorModule } from 'ngx-attack-detector';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(HttpClientModule),
    importProvidersFrom(AttackDetectorModule.forRoot({
      windowMs: 5000,         // 5 seconds window
      maxRequests: 10,        // Only 10 requests triggers toast (easier to test)
      toastMessage: 'Script Attack Detected! Your application is under unusual traffic.'
    }))
  ]
};