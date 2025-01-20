import { Component } from '@angular/core';
@Component({
  standalone: false,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Bots', url: '/bots', icon: 'navigate-circle' },
    { title: 'Maps', url: '/maps', icon: 'map' },
    { title: 'Tasks and orders', url: '/tasks', icon: 'checkmark-done' },
    { title: 'Options', url: '/options', icon: 'settings' },
  ];
  constructor() {}
}
