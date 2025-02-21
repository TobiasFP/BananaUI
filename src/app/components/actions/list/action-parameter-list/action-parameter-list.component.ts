import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActionParameter } from 'src/app/interfaces/order';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  selector: 'app-action-parameter-list',
  templateUrl: './action-parameter-list.component.html',
  styleUrls: ['./action-parameter-list.component.scss'],
})
export class ActionParameterListComponent implements OnInit {
  @Input()
  actionParameters: ActionParameter[] = [];

  constructor() {}

  ngOnInit() {}
}
