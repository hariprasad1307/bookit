import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-customer-signup',
  templateUrl: './customer-signup.component.html',
  styleUrls: ['./customer-signup.component.css']
})
export class CustomerSignupComponent implements OnInit {

  customerSignupForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.customerSignupForm = this.formBuilder.group({
      name: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern("[0-9]{10}")]],
      email: ['', [Validators.required, Validators.email]],
      age: ['', Validators.required],
      gender: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.customerSignupForm.valid) {
      this.customerService.signupCustomer(this.customerSignupForm.value)
        .subscribe(
          response => {
            // Handle success
            console.log('Customer signup successful:', response);
            this.router.navigate(['/customer-login']); // Redirect to customer-login route
          },
          error => {
            // Handle error
            console.error('Customer signup error:', error);
          }
        );
    } else {
      // Form is invalid, show alert message
      alert('Please fill in all required fields.');
    }
  }

}
