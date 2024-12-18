import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { AuthGuard } from "./services/auth/auth.guard";
import { NgModule } from "@angular/core";
import { PigeonsMainPageComponent } from "./components/pigeon/pigeons-main-page.component";
import {FlightMainPageComponent} from "./components/flights/flight-main-page.component";
import {FlightRecordsMainComponent} from "./components/flight-records/flight-records-main-component";
import {PigeonResultsComponent} from "./components/pigeon-results/pigeon-results.component";
import {PedigreeComponent} from "./components/pedigree/pedigree.component";
import {PasswordResetComponent} from "./components/password-reset/password-reset.component";

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'password-reset', component: PasswordResetComponent },
  { path: 'pigeon', component: PigeonsMainPageComponent, canActivate: [AuthGuard] },
  { path: 'pigeon-results', component: PigeonResultsComponent, canActivate: [AuthGuard] },
  { path: 'flights', component: FlightMainPageComponent, canActivate: [AuthGuard] },
  { path: 'flight-records', component: FlightRecordsMainComponent, canActivate: [AuthGuard] },
  { path: 'pedigree', component: PedigreeComponent, canActivate: [AuthGuard]},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
