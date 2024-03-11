import { Injectable } from '@angular/core';
import { LoginEmitter } from '../emitter/login-emitter';

@Injectable({
  providedIn: 'root'
})
export class EmitService {
  loginEmitter: LoginEmitter;
  constructor() {   
    this.loginEmitter = new LoginEmitter();
  }
}
