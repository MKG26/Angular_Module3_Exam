import { Component } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  standalone: false,
  template: '<div class="lds-dual-ring"></div>',
  styleUrl: './loading-spinner.component.css',
})
export class LoadingComponent {}
