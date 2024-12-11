import { Component, OnInit } from '@angular/core';
import { State } from 'src/app/interfaces/amr';
import { OverviewService } from 'src/app/services/overview.service';

@Component({
  selector: 'app-bots',
  templateUrl: './bots.page.html',
  styleUrls: ['./bots.page.scss'],
})
export class BotsPage implements OnInit {
  amrs: State[] = [];
  constructor(public overviewService: OverviewService) {}

  ngOnInit() {
    this.overviewService.amrs().subscribe((amrs) => {
      this.amrs = amrs.data;
    });
  }
}
