import { Injectable } from '@angular/core';
import { LoginEmitter } from '../emitter/login-emitter';
import { LoaderEmitter } from '../emitter/loader-emitter';

@Injectable({
  providedIn: 'root'
})
export class EmitService {
  loginEmitter: LoginEmitter;
  loaderEmitter: LoaderEmitter;
  constructor() {   
    this.loginEmitter = new LoginEmitter();
    this.loaderEmitter = new LoaderEmitter();
  }
}
