import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import {
  NodeMeta,
  Node,
  Order,
  OrderTemplateDetails,
} from 'src/app/interfaces/order';
import { NodeService } from 'src/app/services/node.service';
import { OrderService } from 'src/app/services/order.service';
import { NodeComponent } from '../node/node.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  nodes: NodeMeta[] = [];
  order: OrderTemplateDetails = {
    ID: 0,
    name: '',
    order: {
      headerId: 0,
      timestamp: '',
      version: '',
      manufacturer: '',
      serialNumber: '',
      orderId: '',
      orderUpdateId: 0,
      nodes: [],
      edges: [],
      zoneSetId: '',
    },
    nodeIds: [],
  };

  constructor(
    public nodeService: NodeService,
    public orderService: OrderService,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController
  ) {}
  ngOnInit() {
    this.getAllNodes();
  }


  getAllNodes() {
    this.nodeService.all().subscribe((nodes) => {
      this.nodes = nodes.data;
    });
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
      this.getAllNodes();
    }
  }

  addNode(node: Node) {
    this.order.order.nodes.push(node);
  }

  async addOrder() {
    const loading = await this.loadingCtrl.create({
      message: 'Creating order',
    });

    loading.present();
    this.order.nodeIds = this.order.order.nodes.map((node) => node.nodeId);
    this.order.order.nodes = [];
    await this.orderService.create(this.order).subscribe({
      next: async (order) => {
        this.order = order.data;
        console.log('Trtying to dismiss loading controller');
        await loading.dismiss();
        await this.modalCtrl.dismiss('', 'confirm');
      },
      error: async (e) => {
        loading.dismiss();
        await this.loadingCtrl.create({
          message: e,
          backdropDismiss: true,
        });
        await this.modalCtrl.dismiss(null, 'cancel');
      },
    });
  }
}
