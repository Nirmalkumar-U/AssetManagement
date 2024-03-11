import { Component } from '@angular/core';
import { EmitService } from './core/services/emit.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';
  isLoading: boolean = false;
  constructor(private emitService: EmitService) {
    this.emitService.loaderEmitter.subscribe(loader => {
      this.isLoading = loader;
    });
  }
}
