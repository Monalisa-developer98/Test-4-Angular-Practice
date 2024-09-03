import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private apiUrl = 'http://localhost:9120/api/V1/employee';
  private apiUrl2 = 'http://localhost:2024/api/auth'
  employeeResponse: any;

  constructor(private http: HttpClient) { }

  addUsers(userData: any){
    const urlStr = `${this.apiUrl}/createEmployee`;

    return new Promise((resolve, reject)=>{
      this.http.post(urlStr, userData).subscribe((data: any)=>{
        this.employeeResponse = data;
        resolve(this.employeeResponse);
      }, (error: any)=>{
        reject(error);
        console.log('Error:' + JSON.stringify(error));
      })
    })
  }

  sendOTP(email: string): Observable<any> {
    const urlStr = `${this.apiUrl2}/request-otp`;
    return this.http.post(urlStr, { email });
  }

  verifyOTP(email: string, otp: string): Observable<any> {
    const urlStr = `${this.apiUrl2}/verify-otp`;
    return this.http.post(urlStr, { email, otp });
  }
  
}
