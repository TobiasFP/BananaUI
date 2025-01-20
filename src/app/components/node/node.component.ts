import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { NodeService } from 'src/app/services/node.service';
import { NodeMeta } from '../../interfaces/order';
import { MapsService } from 'src/app/services/maps.service';
import { AmrMap } from 'src/app/interfaces/map';
import { selectedLocation } from '../map/map.component';
import { LoadingController, ModalController } from '@ionic/angular';
import { IconsPickerComponent } from '../icons-picker/icons-picker.component';
import { Router } from '@angular/router';

@Component({
  standalone: false,
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss'],
})
export class NodeComponent implements OnInit {
  @Input()
  isModal: boolean = false;
  advancedOptions: boolean = false;
  maps: AmrMap[] = [];
  pgmbuffer!: Uint8Array;
  nodeToPost: NodeMeta = {
    node: {
      nodeId: '',
      sequenceId: 0,
      released: true,
      actions: [],
      nodeDescription: '',
      nodePosition: {
        x: 0,
        y: 0,
        mapId: '99187cd1-8b4b-4f5a-ac11-e455928409de',
        theta: 0,
        allowedDeviationXY: 0,
        allowedDeviationTheta: 0,
        mapDescription: '',
      },
    },
    icon: '',
  };
  constructor(
    public nodeService: NodeService,
    public mapsService: MapsService,
    private modalCtrl: ModalController,
    private router: Router,
    private changeDetection: ChangeDetectorRef,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.mapsService.all().subscribe((maps) => {
      this.maps = maps.data;
      this.mapChange();
    });
  }

  async addNode() {
    const loading = await this.loadingCtrl.create({
      message: 'Creating a node',
      backdropDismiss: true,
    });

    loading.present();

    this.nodeService.create(this.nodeToPost).subscribe({
      next: () => {
        loading.dismiss();
        if (this.isModal) {
          return this.modalCtrl.dismiss('', 'confirm');
        } else {
          this.router.navigate(['/maps']);
        }
        return;
      },
      error: (e) => {
        loading.dismiss();
        this.loadingCtrl.create({
          message: e,
          backdropDismiss: true,
        });
        if (this.isModal) {
          return this.modalCtrl.dismiss(null, 'cancel');
        }
        return;
      },
    });
  }

  async mapChange() {
    const mapId = this.maps[0].mapId ?? '';
    this.mapsService.map(mapId).subscribe((map) => {
      this.pgmbuffer = new TextEncoder().encode(map.data);
      this.changeDetection.detectChanges();
    });
  }

  setSelectedLocation($event: selectedLocation) {
    this.nodeToPost.node.nodePosition.x = $event.x;
    this.nodeToPost.node.nodePosition.y = $event.y;
  }

  async openSelectIconModal() {
    const modal = await this.modalCtrl.create({
      component: IconsPickerComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role === 'confirm') {
      this.nodeToPost.icon = data;
    }
  }
}
