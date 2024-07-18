import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  adminLoginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private adminService: AdminService
  ) {
    this.adminLoginForm = this.fb.group({
      phoneNumber: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.adminLoginForm.valid) {
      const phoneNumber = this.adminLoginForm.value.phoneNumber;
      const password = this.adminLoginForm.value.password;
      this.adminService.loginAdmin({ phoneNumber, password }).subscribe(
        response => {
          if (response.success) {
            alert('Login successful!');
            localStorage.setItem('adminName', response.name); // Store admin's name
            localStorage.setItem('adminPhoneNumber', phoneNumber); // Store admin's phone number
            this.router.navigate(['/admin-account']);
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
}
