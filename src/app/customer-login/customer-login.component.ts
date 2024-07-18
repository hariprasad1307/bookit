import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../services/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-login',
  templateUrl: './customer-login.component.html',
  styleUrls: ['./customer-login.component.css']
})
export class CustomerLoginComponent {
  customerLoginForm: FormGroup;

  constructor(private fb: FormBuilder,private customerService: CustomerService,private router: Router) {
    this.customerLoginForm = this.fb.group({
      phoneNumber: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.customerLoginForm.valid) {
      const phoneNumber = this.customerLoginForm.value.phoneNumber;
      const password = this.customerLoginForm.value.password;
      this.customerService.loginCustomer({ phoneNumber, password }).subscribe(
        response => {
          if (response.success) {
            alert('Login successful!');
            this.router.navigate(['/customer-account']);
          } else {
            alert('Invalid credentials. Please try again.');
          }
        },
        error => {
          console.error('Login error:', error);
          alert('An error occurred. Please try again later.');
        }
      );
    }
  }

  get phoneNumber() {
    return this.customerLoginForm.get('phoneNumber');
  }

  get password() {
    return this.customerLoginForm.get('password');
  }
}
