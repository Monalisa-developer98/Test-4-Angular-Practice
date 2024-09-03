import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.css']
})
export class VerifyOtpComponent implements OnInit {
  otp1: string = '';
  otp2: string = '';
  otp3: string = '';
  otp4: string = '';
  otp5: string = '';
  otp6: string = '';
  email: string = '';

  constructor(
    private router: Router,
    private globalService: CommonService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.email = navigation.extras.state['email'];
    }
  }

  verifyOTP() {
    const enteredOTP = this.otp1 + this.otp2 + this.otp3 + this.otp4 + this.otp5 + this.otp6;

    this.globalService.verifyOTP(this.email, enteredOTP).subscribe(
      (response: any) => {
        if (response.success) {
          this.router.navigate(['/meeting-list']);
        } else {
          this.toastr.error('OTP verification failed. Please try again.');
        }
      },
      (error) => {
        console.error('Error verifying OTP', error);
        this.toastr.error('Error verifying OTP. Please try again later.');
      }
    );
  }

  moveFocus(event: any, nextInput: string): void {
    const input = event.target as HTMLInputElement;
    const maxLength = parseInt(input.maxLength.toString(), 10);
    const currentLength = input.value.length;

    if (currentLength >= maxLength) {
      const element = document.getElementsByName(nextInput)[0] as HTMLInputElement;
      if (element) {
        element.focus();
      }
    }
  }
}
