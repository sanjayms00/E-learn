
import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientComponent } from './pages/client/client.component';
import { ClientModule } from './pages/client/client.module';
import { AdminModule } from './pages/admin/admin.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { clientEffects } from './shared/store/effects/client/client.effect';
import { adminEffects } from './shared/store/effects/admin/admin.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { appReducer } from './shared/store/state/app.state';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { listingEffects } from './shared/store/effects/admin/listing.effects';
import { ErrorComponent } from './shared/components/error/error.component';
import { InstructorModule } from './pages/instructor/instructor.module';
import { instructorEffects } from './shared/store/effects/instructor/instructor.effect';
import { FormsService } from './shared/services/forms.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxStripeModule } from 'ngx-stripe';
import { environment } from 'src/environment/environment';
import { WelcomeComponent } from './shared/components/welcome/welcome.component';
import { ChatService } from './shared/services/chat.service';


@NgModule({
  declarations: [
    AppComponent,
    ClientComponent,
    NotFoundComponent,
    ErrorComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ClientModule,
    AdminModule,
    InstructorModule,
    HttpClientModule,
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot([clientEffects, adminEffects, listingEffects, instructorEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RouterModule,
    NgxStripeModule.forRoot(environment.stripe.publicKey),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
    },
    {
      provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true
    },
    FormsService,
    ChatService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
