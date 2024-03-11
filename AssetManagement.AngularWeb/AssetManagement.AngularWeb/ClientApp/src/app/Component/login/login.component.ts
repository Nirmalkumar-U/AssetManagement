import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AppRoutes } from 'src/app/constants/paths';
import { AuthService } from 'src/app/core/services/auth.service';
import { EmitService } from 'src/app/core/services/emit.service';
import { LocalStoreService } from 'src/app/core/services/local-store.service';

@Component({
  selector: 'app-login',
  templateUrl: './Login.component.html',
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private authService: AuthService, private router: Router,
     private localStoreService:LocalStoreService, private emitService:EmitService) {
      this.localStoreService.clear();
      this.emitService.loginEmitter.emit(false);
      }

  login() {
    const loginData = this.loginForm.value;
    this.authService.login(loginData).subscribe((response:any) => {
      if (response.status) {
        this.authService.createToken(response.result).subscribe((result:any) => {
          if (result.status) {
            this.localStoreService.setAllData(result.result.claims);
            this.localStoreService.setItem('accessToken', result.result.accessToken);
            this.emitService.loginEmitter.emit(true);
            this.router.navigate([AppRoutes.home]);
          }
        });
      }
    });
  }

}
