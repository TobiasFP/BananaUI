import { Component, OnInit } from '@angular/core';
import { State } from 'src/app/interfaces/amr';
import { OverviewService } from 'src/app/services/overview.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  amrs: State[] = [];
  constructor(public overviewService: OverviewService) {}

  ngOnInit() {
    this.overviewService.amrs().subscribe((amrs) => {
      this.amrs = amrs.data;
    });
  }
}
