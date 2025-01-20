import { Component, OnInit } from '@angular/core';
import { State } from 'src/app/interfaces/amr';

@Component({
  standalone: false,
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  amrs: State[] = [];
  constructor() {}

  ngOnInit() {
     
  }
}
