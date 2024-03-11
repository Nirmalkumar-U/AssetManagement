import { Component } from '@angular/core';
import { LocalStoreService } from './core/services/local-store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';
  constructor(LocalStoreService : LocalStoreService) {
  }
}
