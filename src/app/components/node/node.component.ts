import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NodeService } from 'src/app/services/node.service';
import { Node } from '../../interfaces/order';
import { MapsService } from 'src/app/services/maps.service';
import { AmrMap } from 'src/app/interfaces/map';
import { selectedLocation } from '../map/map.component';
import { ModalController } from '@ionic/angular';
import { IconsPickerComponent } from '../icons-picker/icons-picker.component';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss'],
})
export class NodeComponent implements OnInit {
  advancedOptions: boolean = false;
  maps: AmrMap[] = [];
  pgmbuffer!: Uint8Array;
  selectedIcon: string = 'contract-outline';
  nodeToPost: Node = {
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
  };
  constructor(
    public nodeService: NodeService,
    public mapsService: MapsService,
    private modalCtrl: ModalController,
    private changeDetection: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.mapsService.all().subscribe((maps) => {
      this.maps = maps.data;
      this.mapChange();
    });
  }

  addNode() {
    this.nodeService.create(this.nodeToPost).subscribe((node) => {
      this.nodeToPost = node.data;
    });
  }

  async mapChange() {
    this.mapsService.map().subscribe((map) => {
      this.pgmbuffer = new TextEncoder().encode(map.data);
      this.changeDetection.detectChanges();
    });
  }

  setSelectedLocation($event: selectedLocation) {
    this.nodeToPost.nodePosition.x = $event.x;
    this.nodeToPost.nodePosition.y = $event.y;
  }

  async openSelectIconModal() {
    const modal = await this.modalCtrl.create({
      component: IconsPickerComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role === 'confirm') {
      this.selectedIcon = data;
    }
  }
}
