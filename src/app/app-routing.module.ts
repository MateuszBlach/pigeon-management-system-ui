import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { AuthGuard } from "./services/auth/auth.guard";
import { NgModule } from "@angular/core";
import { PigeonsMainPageComponent } from "./components/pigeon/pigeons-main-page.component";
import {FlightsMainPageComponent} from "./components/flights/flights-main-page.component";

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'pigeon', component: PigeonsMainPageComponent, canActivate: [AuthGuard] },
  { path: 'flights', component: FlightsMainPageComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
