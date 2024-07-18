import { Component, OnInit } from '@angular/core';
import { BusService } from '../services/bus.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modify-bus',
  templateUrl: './modify-bus.component.html',
  styleUrls: ['./modify-bus.component.css']
})
export class ModifyBusComponent implements OnInit {
  phoneNumber: string = '';
  buses: any[] = [];

  constructor(private busService: BusService, private router: Router) {}

  ngOnInit(): void {}

  searchBuses() {
    if (this.phoneNumber.trim() !== '') {
      this.busService.getBusesByPhoneNumber(this.phoneNumber).subscribe(
        buses => {
          this.buses = buses;
        },
        error => {
          console.error('Error fetching buses:', error);
        }
      );
    } else {
      this.buses = [];
    }
  }

  modifyBus(registrationNumber: string) {
    this.router.navigate([`/modify-bus/modify/${registrationNumber}`]);
  }
}
