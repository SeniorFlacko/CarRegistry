import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegistryComponent } from './registry/registry.component';
import { CarRegistryViewComponent } from './car-registry-view/car-registry-view.component';
import { CarrRegistryFormComponent } from './carr-registry-form/carr-registry-form.component';
import { StoreModule } from '@ngrx/store';
import { dropdownReducer } from './reducers/dropdown.reducers';
import { SharedModule } from './shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { carReducer } from './reducers/car.reducers';
import { CarEffect } from './effects/car.effects';
@NgModule({
  declarations: [
    AppComponent,
    RegistryComponent,
    CarRegistryViewComponent,
    CarrRegistryFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forRoot({ dropdown: dropdownReducer, cars: carReducer }),
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
    EffectsModule.forRoot([CarEffect]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
