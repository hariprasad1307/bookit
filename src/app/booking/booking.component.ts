// booking.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from '../services/customer.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  bus!: any;
  customer: any;
  bookingForm!: FormGroup;
  paymentRequest!: google.payments.api.PaymentDataRequest;
  totalAmount: number = 0;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private customerService: CustomerService,
    private http: HttpClient
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.bus = navigation?.extras.state?.['bus'];
  }

  ngOnInit(): void {
    this.bookingForm = this.fb.group({
      phoneNumber: ['', Validators.required],
      dateOfBooking: ['', [Validators.required, this.validateBookingDate]],
      numberOfSeats: ['', [Validators.required, Validators.min(1)]]
    });

    this.paymentRequest = {
      apiVersion: 2,
      apiVersionMinor: 0,
      allowedPaymentMethods: [
        {
          type: 'CARD',
          parameters: {
            allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
            allowedCardNetworks: ['AMEX', 'VISA', 'MASTERCARD']
          },
          tokenizationSpecification: {
            type: 'PAYMENT_GATEWAY',
            parameters: {
              gateway: 'example',
              gatewayMerchantId: 'exampleGatewayMerchantId'
            }
          }
        }
      ],
      merchantInfo: {
        merchantId: '12345678901234567890',
        merchantName: 'Demo Merchant'
      },
      transactionInfo: {
        totalPriceStatus: 'FINAL',
        totalPriceLabel: 'Total',
        totalPrice: '100.00',
        currencyCode: 'USD',
        countryCode: 'US'
      }
    };
  }

  fetchCustomerDetails(): void {
    const phoneNumber = this.bookingForm.get('phoneNumber')?.value;
    if (phoneNumber) {
      this.customerService.getCustomerByPhoneNumber(phoneNumber).subscribe(
        customer => {
          this.customer = customer;
        },
        error => {
          console.error('Error fetching customer details:', error);
          alert('Customer not found');
          this.customer = null;
        }
      );
    }
  }

  validateBookingDate(control: any) {
    const selectedDate = new Date(control.value);
    const currentDate = new Date();
    if (selectedDate < currentDate) {
      return { invalidDate: true };
    }
    return null;
  }

  calculateTotalAmount(): void {
    const numberOfSeats = this.bookingForm.get('numberOfSeats')?.value;
    if (numberOfSeats && this.bus && this.bus.price) {
      this.totalAmount = numberOfSeats * this.bus.price;
    } else {
      this.totalAmount = 0;
    }
  }

  onSubmit(): void {
    if (this.bookingForm.valid) {
      const bookingDetails = {
        ...this.bookingForm.value,
        bus: this.bus,
        customer: this.customer
      };

      this.http.post('http://localhost:3000/api/tickets', bookingDetails).subscribe(
        () => {
          alert('Booking successful!');
          this.router.navigate(['/customer-account']);
        },
        error => {
          console.error('Error booking ticket:', error);
          alert('Error booking ticket');
        }
      );
    } else {
      if (this.bookingForm.get('dateOfBooking')?.hasError('invalidDate')) {
        alert('You cannot choose this date');
      }
    }
  }

  onLoadPaymentData(event: any) {
    console.log('Payment data loaded:', event);
    // Handle the payment data response here
  }
}
