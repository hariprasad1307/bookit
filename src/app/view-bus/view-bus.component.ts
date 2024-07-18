import { Component, Input, OnInit } from '@angular/core';
import { BusService } from '../services/bus.service';

@Component({
  selector: 'app-view-bus',
  templateUrl: './view-bus.component.html',
  styleUrls: ['./view-bus.component.css']
})
export class ViewBusComponent implements OnInit {
  buses: any[] = [];
  @Input() phoneNumber: string = '';

  constructor(private busService: BusService) {}

  ngOnInit(): void {
    if (this.phoneNumber) {
      this.loadBuses();
    }
  }

  loadBuses(): void {
    this.busService.getBusesByPhoneNumber(this.phoneNumber).subscribe(
      (buses) => {
        this.buses = buses;
      },
      (error) => {
        console.error('Error fetching buses', error);
        alert('Error fetching buses');
      }
    );
  }
}
