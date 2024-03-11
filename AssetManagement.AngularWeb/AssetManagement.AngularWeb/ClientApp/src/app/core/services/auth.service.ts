import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettingsDto } from '../dtos/app-settings-dto';
import { HttpService } from './http/http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpService : HttpService) { }

  login(loginData:any): Observable<any> {
    return this.httpService.get(`User/Login?email=${loginData.email}&password=${loginData.password}`);
  }

  createToken(userData:any): Observable<any> {
    return this.httpService.post(`User/CreateToken`, userData);
  }

  refreshToken(token:string): Observable<any> {
    return this.httpService.get(`User/RefreshToken?token=${token}`);
  }

}