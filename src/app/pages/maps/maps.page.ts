import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { AmrMap } from 'src/app/interfaces/map';
import { MapsService } from 'src/app/services/maps.service';
import { OverviewService } from 'src/app/services/overview.service';
import { State } from 'src/app/interfaces/amr';
import { Node, NodeMeta } from 'src/app/interfaces/order';
import { NodeService } from '../../services/node.service';
@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: ['./maps.page.scss'],
})
export class MapsPage implements OnInit, OnDestroy {
  amrs: State[] = [];
  nodes: NodeMeta[] = [];
  maps: AmrMap[] = [];
  pgmbuffer!: Uint8Array;
  getAmrsInterval!: any;
  constructor(
    public mapsService: MapsService,
    public overviewService: OverviewService,
    public nodeService: NodeService,
    private changeDetection: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    await this.getNodes();
    await this.mapsService.all().subscribe(async (maps) => {
      this.maps = maps.data;
      await this.mapChange();
      this.changeDetection.detectChanges();
    });
    this.getAmrsInterval = setInterval(async () => {
      await this.getAmrs();
      this.changeDetection.detectChanges();
    }, 2000);
  }

  ngOnDestroy() {
    clearInterval(this.getAmrsInterval);
  }

  async getNodes() {
    this.nodeService.all().subscribe((nodes) => {
      this.nodes = nodes.data;
    });
  }
  async getAmrs() {
    this.overviewService.amrs().subscribe((amrs) => {
      this.amrs = amrs.data;
    });
  }

  async mapChange() {
    this.mapsService.map().subscribe((map) => {
      this.pgmbuffer = new TextEncoder().encode(map.data);
      this.changeDetection.detectChanges();
    });
    await this.getAmrs();
  }
}
