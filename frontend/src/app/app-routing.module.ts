import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SummaryComponent} from 'src/app/components/summary/summary.component';
import { DocentesComponent } from './components/docentes/docentes.component';
import { EstadisticosComponent } from './components/estadisticos/estadisticos.component';

const routes: Routes = [
{ path:'',component: DocentesComponent},
{ path: 'summary', component: SummaryComponent},
{ path: 'estadisticos', component: EstadisticosComponent},
{ path: "**", redirectTo: "summary", pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
