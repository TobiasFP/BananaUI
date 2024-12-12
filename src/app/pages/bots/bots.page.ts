import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getAmrState as getStateOfAmr, State } from 'src/app/interfaces/amr';
import { OverviewService } from 'src/app/services/overview.service';

@Component({
  selector: 'app-bots',
  templateUrl: './bots.page.html',
  styleUrls: ['./bots.page.scss'],
})
export class BotsPage implements OnInit {
  amrs: State[] = [];
  constructor(
    public overviewService: OverviewService,
    private router: Router
  ) {}

  ngOnInit() {
    this.overviewService.amrs().subscribe((amrs) => {
      this.amrs = amrs.data;
    });
  }

  getStateOfAmr(amr: State): string {
    return getStateOfAmr(amr);
  }

  goToAmr(serialNumber: string) {
    this.router.navigateByUrl('/amrinfo/' + serialNumber);

    console.log(serialNumber);
  }
}
