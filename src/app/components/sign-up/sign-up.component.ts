import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../../services/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  firstFormGroup!: FormGroup; 
  secondFormGroup!: FormGroup;
  isLinear = false;

  constructor(private _formBuilder: FormBuilder, private httpService: CommonService, private router: Router){}

  ngOnInit(): void{
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
      secondCtrl: ['', Validators.required],
      thirdCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      fourCtrl: ['', Validators.required],
      fiveCtrl: ['', Validators.required],
    });   
  }

  onSubmit(){

    if(this.firstFormGroup.valid && this.secondFormGroup.valid){
      const userData = {
        name: this.firstFormGroup.value.firstCtrl,
        email: this.firstFormGroup.value.secondCtrl,
        password: this.firstFormGroup.value.thirdCtrl,
        designation: this.secondFormGroup.value.fourCtrl,
        department: this.secondFormGroup.value.fiveCtrl
      };
  
      this.httpService.addUsers(userData)
      .then(response => {
        this.router.navigate(['/auth/login']);
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }


  }

}
