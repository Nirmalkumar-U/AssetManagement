import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AppRoutes } from 'src/app/constants/paths';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm = new FormGroup({
    userName: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    const loginData = this.loginForm.value;
    this.authService.login(loginData).subscribe(data => {
      if (data.success) {
        this.router.navigateByUrl(AppRoutes.branchList);
      }
    });
  }


}
