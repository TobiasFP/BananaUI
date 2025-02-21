import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { IonCol, IonGrid, IonicModule, IonRow } from '@ionic/angular';
import { ActionParameter } from 'src/app/interfaces/order';
import { ActionService } from 'src/app/services/action.service';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  selector: 'app-add-action-parameter',
  templateUrl: './add-action-parameter.component.html',
  styleUrls: ['./add-action-parameter.component.scss'],
})
export class AddActionParameterComponent implements OnInit {
  actionParameterToPost: ActionParameter = { key: '', value: '' };

  @Output() actionParameter: EventEmitter<ActionParameter> =
    new EventEmitter();

  constructor(private actionService: ActionService) {}

  ngOnInit() {}

  addActionParameter() {
    this.actionService
      .createActionParameters(this.actionParameterToPost)
      .subscribe((actionParam) => {
        this.actionParameter.emit(actionParam.data);
      });
  }
}
