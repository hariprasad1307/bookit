import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BusService } from '../services/bus.service';

@Component({
  selector: 'app-customer-account',
  templateUrl: './customer-account.component.html',
  styleUrls: ['./customer-account.component.css']
})
export class CustomerAccountComponent {
  origin: string = '';
  destination: string = '';
  buses: any[] = [];
  errorMessage: string = '';

  constructor(private busService: BusService, private router: Router) {}

  searchBuses(): void {
    if (this.origin.trim() && this.destination.trim()) {
      this.busService.getBusesByOriginDestination(this.origin, this.destination)
        .subscribe(
          (buses: any[]) => {
            this.buses = buses;
            console.log('Buses:', buses);
          },
          error => {
            this.errorMessage = 'Error fetching buses. Please try again later.';
            console.error('Error fetching buses:', error);
          }
        );
    } else {
      this.errorMessage = 'Please provide both origin and destination.';
    }
  }

  bookBus(bus: any): void {
    this.router.navigate(['/booking'], { state: { bus } });
  }
}
