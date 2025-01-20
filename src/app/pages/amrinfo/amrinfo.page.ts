import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { State } from 'src/app/interfaces/amr';
import { OverviewService } from 'src/app/services/overview.service';

@Component({
  standalone: false,
  selector: 'app-amrinfo',
  templateUrl: './amrinfo.page.html',
  styleUrls: ['./amrinfo.page.scss'],
})
export class AmrinfoPage implements OnInit {
  amr!: State;

  constructor(
    private activatedRoute: ActivatedRoute,
    public overviewService: OverviewService
  ) {}

  ngOnInit() {
    const SN = this.activatedRoute.snapshot.paramMap.get('serialnumber') ?? '';
    this.overviewService.amr(SN).subscribe((amr) => {
      this.amr = amr.data;
    });
  }
}
