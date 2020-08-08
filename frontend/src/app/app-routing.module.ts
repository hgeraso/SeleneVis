import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SummaryComponent} from 'src/app/components/summary/summary.component';
import { DocentesComponent } from './components/docentes/docentes.component';
import { EstadisticosComponent } from './components/estadisticos/estadisticos.component';
import { LoginComponent } from './components/shared/login/login.component';
import { LoginGuard } from './services/guards/login.guard';
import { AdminGuard } from './services/guards/admin.guard';

const routes: Routes = [
{ path:'',component: LoginComponent},
{ path: 'docents',component: DocentesComponent, canActivate: [LoginGuard, AdminGuard]},
{ path: 'summary', component: SummaryComponent, canActivate: [LoginGuard]},
{ path: 'estadisticos', component: EstadisticosComponent, canActivate: [LoginGuard]},
{ path: "**", redirectTo: "", pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
