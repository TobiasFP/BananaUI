import { Component, OnInit } from '@angular/core';
import { NodeService } from 'src/app/services/node.service';
import { Node } from '../../interfaces/order';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss'],
})
export class NodeComponent implements OnInit {
  nodes: Node[] = [];
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
  constructor(public nodeService: NodeService) {}

  ngOnInit() {
    this.nodeService.all().subscribe((nodes) => {
      this.nodes = nodes.data;
    });
  }

  addNode() {
    this.nodeService.create(this.nodeToPost).subscribe((node) => {
      this.nodeToPost = node.data;
    });
  }
}
