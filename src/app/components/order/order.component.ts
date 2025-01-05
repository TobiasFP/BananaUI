import { Component, OnInit } from '@angular/core';
import { NodeMeta, Order } from 'src/app/interfaces/order';
import { NodeService } from 'src/app/services/node.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  nodes: NodeMeta[] = [];
  order: Order = {
      headerId: 0,
      timestamp: "",
      version: "",
      manufacturer: "",
      serialNumber: "",
      orderId: "",
      orderUpdateId: 0,
      nodes: [],
      edges: [],
      zoneSetId: "",
  };
  constructor(
    public nodeService: NodeService,
    public orderService: OrderService
  ) {}

  ngOnInit() {
    this.nodeService.all().subscribe((nodes) => {
      this.nodes = nodes.data;
    });
  }
}
