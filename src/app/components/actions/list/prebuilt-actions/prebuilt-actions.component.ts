import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Action } from 'src/app/interfaces/order';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],

  selector: 'app-prebuilt-actions',
  templateUrl: './prebuilt-actions.component.html',
  styleUrls: ['./prebuilt-actions.component.scss'],
})
export class PrebuiltActionsComponent implements OnInit {
  prebuiltActions: Action[] = [
    {
      actionId: '',
      actionType: 'startPause',
      blockingType: '',
      actionDescription:
        'Activates the pause mode. A linked state is required, because many AGVs can be paused by using a hardware switch. No more AGV driving movements - reaching next node is not necessary. Actions can continue.Order is resumable.',
      actionParameters: [],
    },
    {
      actionId: '',
      actionType: 'stopPause',
      blockingType: '',
      actionDescription:
        'Deactivates the pause mode. Movement and all other actions will be resumed (if any). A linked state is required because many AGVs can be paused by using a hardware switch. stopPause can also restart vehicles that were stopped with a hardware button that triggered startPause (if configured).',
      actionParameters: [],
    },
    {
      actionId: '',
      actionType: 'initPosition',
      blockingType: '',
      actionDescription:
        'Resets (overrides) the pose of the AGV with the given parameters.',
      actionParameters: [
        {
          key: 'x',
          value: undefined,
        },
        {
          key: 'y',
          value: undefined,
        },
        {
          key: 'theta',
          value: undefined,
        },
        {
          key: 'mapId',
          value: undefined,
        },
        {
          key: 'lastNodeId',
          value: undefined,
        },
      ],
    },
  ];
  constructor() {}

  ngOnInit() {}
}
