import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { CustomerLoginComponent } from './customer-login/customer-login.component';
import { CustomerSignupComponent } from './customer-signup/customer-signup.component';
import { AdminSignupComponent } from './admin-signup/admin-signup.component';
import { AdminAccountComponent } from './admin-account/admin-account.component';
import { CustomerAccountComponent } from './customer-account/customer-account.component';
import { NewBusComponent } from './new-bus/new-bus.component';
import { ModifyBusComponent } from './modify-bus/modify-bus.component';
import { ViewBusComponent } from './view-bus/view-bus.component';
import { ModifyFormComponent } from './modify-form/modify-form.component';
import { BookingComponent } from './booking/booking.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin-login', component: AdminLoginComponent },
  { path: 'customer-login', component: CustomerLoginComponent },
  { path: 'customer-signup', component: CustomerSignupComponent },
  { path: 'admin-signup', component: AdminSignupComponent },
  { path: 'customer-account', component: CustomerAccountComponent },
  { 
    path: 'admin-account', 
    component: AdminAccountComponent, 
    children: [
      { path: 'view-bus', component: ViewBusComponent },
      { path: 'new-bus', component: NewBusComponent },
      { path: 'modify-bus', component: ModifyBusComponent }
    ]
  },
  { path: 'booking', component: BookingComponent },
  { path: 'modify-bus/modify/:registrationNumber', component: ModifyFormComponent } ,// New route for modifying bus

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
