import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Overview', url: '/home', icon: 'cloud' },
    { title: 'Bots', url: '/bots', icon: 'navigate-circle' },
    { title: 'Maps', url: '/maps', icon: 'map' },
    { title: 'Tasks', url: '/tasks', icon: 'checkmark-done' },
    { title: 'Options', url: '/options', icon: 'settings' },
  ];
  constructor() {}
}
