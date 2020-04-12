import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DocentesComponent } from './components/docentes/docentes.component';
import { SummaryComponent } from './components/summary/summary.component';
import { EstadisticosComponent } from './components/estadisticos/estadisticos.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NavbarComponent } from './components/shared/navbar/navbar.component'; 
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [
    AppComponent,
    DocentesComponent,
    SummaryComponent,
    EstadisticosComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
