import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CreateFlightComponent } from './create-flight/create-flight.component';
import { ModifyFlightComponent } from './modify-flight/modify-flight.component';
import { DeleteFlightComponent } from './delete-flight/delete-flight.component';
import { ViewFlightComponent } from './view-flight/view-flight.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CreateFlightComponent,
    ModifyFlightComponent,
    DeleteFlightComponent,
    ViewFlightComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
