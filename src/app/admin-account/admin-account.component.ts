import { Component, OnInit } from '@angular/core';
import { BusService } from '../services/bus.service';

@Component({
  selector: 'app-admin-account',
  templateUrl: './admin-account.component.html',
  styleUrls: ['./admin-account.component.css']
})
export class AdminAccountComponent implements OnInit {
  adminName!: string;
  adminPhoneNumber!: string;
  showBuses = false;

  constructor(private busService: BusService) {}

  ngOnInit(): void {
    this.adminName = localStorage.getItem('adminName') || '';
    this.adminPhoneNumber = localStorage.getItem('adminPhoneNumber') || '';
  }

  fetchBuses(): void {
    this.showBuses = true;
  }
}
