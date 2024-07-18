import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { CustomerLoginComponent } from './customer-login/customer-login.component';
import { CustomerSignupComponent } from './customer-signup/customer-signup.component';
import { AdminSignupComponent } from './admin-signup/admin-signup.component';
import { AdminService } from './services/admin.service';
import { AdminAccountComponent } from './admin-account/admin-account.component';
import { CustomerAccountComponent } from './customer-account/customer-account.component';
import { GooglePayButtonModule } from '@google-pay/button-angular';

import { NewBusComponent } from './new-bus/new-bus.component';
import { ModifyBusComponent } from './modify-bus/modify-bus.component';
import { ViewBusComponent } from './view-bus/view-bus.component';
import { BusService } from './services/bus.service';
import { CustomerService } from './services/customer.service';
import { ModifyFormComponent } from './modify-form/modify-form.component';
import { BookingComponent } from './booking/booking.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    AdminLoginComponent,
    CustomerLoginComponent,
    CustomerSignupComponent,
    
    AdminSignupComponent,
    AdminAccountComponent,
    CustomerAccountComponent,

    NewBusComponent,
    ModifyBusComponent,
    ViewBusComponent,
    ModifyFormComponent,
    BookingComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    GooglePayButtonModule

    
  ],
  providers: [AdminService,BusService,CustomerService], // Add AdminService to providers
  bootstrap: [AppComponent]
})
export class AppModule { }
