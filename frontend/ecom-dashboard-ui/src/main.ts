import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './app/core/interceptors/auth.interceptor';
import { importProvidersFrom } from '@angular/core';
import { LucideAngularModule, Home, Settings, FileText, Package, Bot, Bell } from 'lucide-angular';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
    provideHttpClient(withInterceptors([authInterceptor])),
        importProvidersFrom(
      LucideAngularModule.pick({ Home, Settings, FileText, Package, Bot,Bell })
    )
  ],
})
  .catch((err) => console.error(err));
