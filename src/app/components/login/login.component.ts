import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../../services/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  otpForm: any;

  constructor(private fb: FormBuilder, private httpService: CommonService, private toastr: ToastrService, private router: Router ) {
    this.otpForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  sendOTP() {
    if (this.otpForm.valid) {
      const email = this.otpForm.get('email').value;

      this.httpService.sendOTP(email).subscribe(
        (response: any) => {
          if (response.success) {
            this.toastr.success('OTP sent successfully!', `Your OTP is: ${response.data.otp}`);
            this.router.navigate(['/verify-otp'], { state: { email: email } });
          }
        },
        (error) => {
          this.toastr.error(error.error.message);
          console.error('Error generating OTP:', error);
        }
      );
    } else {
      this.toastr.error('Please enter a valid email');
    }
  }

}
