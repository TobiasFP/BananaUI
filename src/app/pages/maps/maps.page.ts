import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { AmrMap } from 'src/app/interfaces/map';
import { MapsService } from 'src/app/services/maps.service';
import { OverviewService } from 'src/app/services/overview.service';
import { State } from 'src/app/interfaces/amr';
import { Node, NodeMeta } from 'src/app/interfaces/order';
import { NodeService } from '../../services/node.service';
import { NodeComponent } from 'src/app/components/node/node.component';
import { ModalController } from '@ionic/angular';
import { MapUploadComponentComponent } from 'src/app/components/map-upload-component/map-upload-component.component';
@Component({
  standalone: false,
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: ['./maps.page.scss'],
})
export class MapsPage implements OnInit, OnDestroy {
  amrs: State[] = [];
  nodes: NodeMeta[] = [];
  maps: AmrMap[] = [
    {
      ID: 0,
      mapVersion: '',
      mapStatus: '',
      mapDescription: 'test',
    },
  ];
  pgmbuffer!: Uint8Array;
  getAmrsInterval!: any;
  mapID: string = '';
  reloadMap: boolean = false;
  constructor(
    public mapsService: MapsService,
    public overviewService: OverviewService,
    public nodeService: NodeService,
    private modalCtrl: ModalController,
    private changeDetection: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    await this.mapsService.all().subscribe(async (maps) => {
      if (maps.data.length > 0 && maps.data[0].mapId) {
        this.maps = maps.data;
        this.mapID = maps.data[0].mapId;

        await this.getNodes(maps.data[0].mapId);
        await this.mapChange();
      }
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

  async getNodes(mapId: string) {
    this.nodeService.all(mapId).subscribe((nodes) => {
      this.nodes = nodes.data;
    });
  }
  async getAmrs() {
    await this.overviewService.amrs().subscribe((amrs) => {
      this.amrs = amrs.data;
    });
  }

  async mapChange() {
    this.reloadMap = false;
    const mapId = this.mapID; 
    await this.getNodes(mapId);
    this.mapsService.map(mapId).subscribe((map) => {
      this.pgmbuffer = new TextEncoder().encode(map.data);
      this.reloadMap = true ;
      this.changeDetection.detectChanges();
    });
    await this.getAmrs();
  }

  async openCreateNodeTemplateModal() {
    const modal = await this.modalCtrl.create({
      component: NodeComponent,
      cssClass: 'creater-modal',
      componentProps: { isModal: true },
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      await this.getNodes('');

      this.pgmbuffer = new Uint8Array();
      this.mapChange();
    }
  }

  async openAddMapModal() {
    const modal = await this.modalCtrl.create({
      component: MapUploadComponentComponent,
      cssClass: 'creater-modal',
      componentProps: { isModal: true },
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.pgmbuffer = new Uint8Array();
      this.mapChange();
    }
  }
}
