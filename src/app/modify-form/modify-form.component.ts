import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BusService } from '../services/bus.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modify-form',
  templateUrl: './modify-form.component.html',
  styleUrls: ['./modify-form.component.css']
})
export class ModifyFormComponent implements OnInit {
  registrationNumber!: string;
  busForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private busService: BusService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registrationNumber = this.route.snapshot.paramMap.get('registrationNumber')!;
    this.busForm = this.formBuilder.group({
      numberOfSeats: ['', Validators.required],
      busType: ['', Validators.required],
      origin: ['', Validators.required],
      destination: ['', Validators.required],
      price: ['', Validators.required],
      departureTime: ['', Validators.required],
      arrivalTime: ['', Validators.required]
    });

    this.busService.getBusByRegistrationNumber(this.registrationNumber).subscribe(
      bus => {
        this.busForm.patchValue(bus);
      },
      error => {
        console.error('Error fetching bus:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.busForm.valid) {
      this.busService.updateBus(this.registrationNumber, this.busForm.value).subscribe(
        () => {
          alert('Bus updated successfully');
          this.router.navigate(['/modify-bus']);
        },
        error => {
          console.error('Error updating bus:', error);
          alert('Error updating bus');
        }
      );
    }
  }
}
