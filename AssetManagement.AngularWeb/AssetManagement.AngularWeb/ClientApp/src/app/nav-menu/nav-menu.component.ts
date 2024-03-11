import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmitService } from '../core/services/emit.service';
import { LocalStoreService } from '../core/services/local-store.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;
  isLoggedIn = false;

  constructor(private router: Router, private emitService:EmitService,private localStoreService:LocalStoreService) {
    this.isLoggedIn = this.localStoreService.getItem('accessToken') ? true : false;
    this.emitService.loginEmitter.subscribe(login => {
      this.isLoggedIn = login;
    });
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
