import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { AuthInterceptorProvider } from './app/auth/interceptors/auth.interceptor';
import { UUID_PROVIDER } from './app/providers/uuid.provider';
import { LoggersInjectionToken } from './app/tokens/logger.injection-token';
import { Logger2Service } from './app/services/logger2.service';
import { LoggerService } from './app/services/logger.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ServiceWorkerModule } from '@angular/service-worker';
import { isDevMode, importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { APPLICATION_ROUTES } from './app/app.routes';


bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      FormsModule, // required animations module
      ToastrModule.forRoot(), // ToastrModule added
      ReactiveFormsModule,
      ServiceWorkerModule.register('ngsw-worker.js', {
        enabled: !isDevMode(),
        // Register the ServiceWorker as soon as the application is stable
        // or after 30 seconds (whichever comes first).
        registrationStrategy: 'registerWhenStable:30000',
      })
    ),
    AuthInterceptorProvider,
    UUID_PROVIDER,
    // {
    //   provide: CvService,
    //   useClass: CONSTANTES.env == 'dev' ? FakeCvService : CvService,
    // },
    {
      provide: LoggersInjectionToken,
      useClass: Logger2Service,
      multi: true,
    },
    {
      provide: LoggersInjectionToken,
      useClass: LoggerService,
      multi: true,
    },
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
    provideRouter(APPLICATION_ROUTES),
  ],
}).catch((err) => console.error(err));
