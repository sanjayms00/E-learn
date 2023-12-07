import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientComponent } from './pages/client/client.component';
import { AdminComponent } from './pages/admin/admin.component';

import { ClientModule } from './pages/client/client.module';
import { AdminModule } from './pages/admin/admin.module';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { adminReducer } from './shared/store/reducers/admin.reducer';
import { clientReducer } from './shared/store/reducers/client.reducer';
import { EffectsModule } from '@ngrx/effects';
import { clientEffects } from './shared/store/effects/client.effect';
import { adminEffects } from './shared/store/effects/admin.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  declarations: [
    AppComponent,
    ClientComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ClientModule,
    AdminModule,
    HttpClientModule,
    StoreModule.forRoot({admin : adminReducer, client: clientReducer}),
    EffectsModule.forRoot([clientEffects, adminEffects]),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: !isDevMode()})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
