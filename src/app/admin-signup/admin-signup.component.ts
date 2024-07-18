import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../services/admin.service'; // Adjust the path as needed
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-signup',
  templateUrl: './admin-signup.component.html',
  styleUrls: ['./admin-signup.component.css']
})
export class AdminSignupComponent {
  adminSignupForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private adminService: AdminService,private router: Router) {
    this.adminSignupForm = this.formBuilder.group({
      name: ['', Validators.required],
      aadharNumber: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  

  onSubmit() {
    if (this.adminSignupForm.invalid) {
      return;
    }
    
    this.adminService.signupAdmin(this.adminSignupForm.value)
      .subscribe(
        response => {
          // Handle success
          console.log('Admin signup successful:', response);
          this.router.navigate(['/admin-login']);

          
        },
        error => {
          // Handle error
          console.error('Admin signup error:', error);
        }
      );
  }
}
