import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BusService } from '../services/bus.service';

@Component({
  selector: 'app-new-bus',
  templateUrl: './new-bus.component.html',
  styleUrls: ['./new-bus.component.css']
})
export class NewBusComponent implements OnInit {
  newBusForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private busService: BusService
  ) {
    this.newBusForm = this.fb.group({
      phoneNumber: ['', Validators.required],
      registrationNumber: ['', Validators.required],
      numberOfSeats: ['', Validators.required],
      busType: ['', Validators.required],
      origin: ['', Validators.required],
      destination: ['', Validators.required],
      price: ['', Validators.required],
      departureTime: ['', Validators.required], // Add departure time field
      arrivalTime: ['', Validators.required] // Add arrival time field
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.newBusForm.valid) {
      const busData = this.newBusForm.value;
      this.busService.addNewBus(busData).subscribe(
        response => {
          alert('Bus added successfully');
        },
        error => {
          console.error('Error adding bus', error);
          alert('Error adding bus');
        }
      );
    } else {
      alert('Please fill in all required fields.');
    }
  }
}
