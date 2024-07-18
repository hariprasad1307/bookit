import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private router: Router) { }

  navigateToAdminLogin() {
    this.router.navigate(['/admin-login']);
  }

  navigateToCustomerLogin() {
    this.router.navigate(['/customer-login']);
  }
}
