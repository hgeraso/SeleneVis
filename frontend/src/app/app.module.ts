import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DocentesComponent } from './components/docentes/docentes.component';
import { SummaryComponent } from './components/summary/summary.component';
import { EstadisticosComponent } from './components/estadisticos/estadisticos.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NavbarComponent } from './components/shared/navbar/navbar.component'; 
import { MaterialModule } from './modules/material.module';
import { ChartsModule } from 'ng2-charts';
import { BarsComponent } from './components/shared/bars/bars.component';
import { TableStadisticsComponent } from './components/table-stadistics/table-stadistics.component';

@NgModule({
  declarations: [
    AppComponent,
    DocentesComponent,
    SummaryComponent,
    EstadisticosComponent,
    NavbarComponent,
    BarsComponent,
    TableStadisticsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
