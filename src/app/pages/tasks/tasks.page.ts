import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { OrderComponent } from 'src/app/components/order/order.component';
import { OrderTemplateDetails } from 'src/app/interfaces/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
})
export class TasksPage implements OnInit {
  orders: OrderTemplateDetails[] = [];

  constructor(
    private modalCtrl: ModalController,
    public orderService: OrderService
  ) {}

  ngOnInit() {
    this.getAllOrderTemplates();
  }

  getAllOrderTemplates() {
    this.orderService.all().subscribe((orders) => {
      this.orders = orders.data;
    });
  }

  async openCreateOrderTemplateModal() {
    const modal = await this.modalCtrl.create({
      component: OrderComponent,
      cssClass: 'creater-modal',
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.getAllOrderTemplates();
    }
  }
}
