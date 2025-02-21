import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AddActionParameterComponent } from '../create/add-action-parameter/add-action-parameter.component';
import { ActionParameterListComponent } from '../list/action-parameter-list/action-parameter-list.component';
import { ActionService } from 'src/app/services/action.service';
import { ActionParameter } from 'src/app/interfaces/order';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddActionParameterComponent,
    ActionParameterListComponent,
  ],
  selector: 'app-action-parameter',
  templateUrl: './action-parameter.component.html',
  styleUrls: ['./action-parameter.component.scss'],
})
export class ActionParameterComponent implements OnInit {
  actionParameters: ActionParameter[] = [];

  constructor(private actionService: ActionService) {}

  ngOnInit() {
    this.actionService.allActionParameters().subscribe((actionParameters) => {
      this.actionParameters = actionParameters.data;
    });
  }
}
