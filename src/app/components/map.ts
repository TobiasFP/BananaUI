import { environment } from 'src/environments/environment';
import { getAmrState, State } from '../interfaces/amr';
import { ionicons } from 'src/app/interfaces/icons';
import { Edge, Node } from '../interfaces/order';

export enum ImageNames {
  Map = 'map',
  Amr = 'amr',
  RedParticle = 'red_particle',
}

export interface phaserAmr extends State, phaserGameOpject {}
export interface phaserNode extends Node, phaserGameOpject {}
export interface phaserEdge extends Edge, phaserGameOpject {}

interface phaserGameOpject {
  gameObject?: Phaser.GameObjects.Image;
  gameTexture?: string;
}

export default class PhaserScene extends Phaser.Scene {
  map!: string;
  amrs: phaserAmr[] = [];
  nodes: phaserNode[] = [];
  edges: phaserEdge[] = [];
  self!: Phaser.Scene;
  metersToAPixel: number;
  markerIcon: string = '';

  constructor(metersToAPixel: number, map: string, amrs: phaserAmr[], nodes: Node[]) {
    super('phaser-map');
    this.metersToAPixel = metersToAPixel;
    this.map = map;
    this.amrs = amrs;
    this.nodes = nodes;
  }

  async preload() {
    this.load.setBaseURL(environment.baseUrl);
    this.load.image(ImageNames.Map, this.map);
    this.load.image(ImageNames.Amr, 'assets/sprites/amr.png');
    for (let icon of ionicons) {
      this.load.svg(icon, 'svg/' + icon + '.svg', {
        width: 30,
        height: 30,
      });
    }
  }

  create() {
    this.add.image(0, 0, ImageNames.Map).setOrigin(0, 0);
    // Set meter lines
    const oneMeterXline = this.add
      .line(5, 5, 5 + 1 / 0.05, 5, 5, 5, 0x000000)
      .setOrigin(0);
    oneMeterXline.setLineWidth(5);
    oneMeterXline.visible = true;
    this.add.text(5, 20, '1 Meter', {
      fontFamily: 'Georgia',
      color: 'black',
    });

    // Add Nodes
    this.nodes.forEach((node) => {
      this.initiateAmrGameObject(
        node,
        node.nodePosition.x,
        node.nodePosition.y
      );
    });
    // Add robots
    this.amrs.forEach((amr) => {
      this.initiateAmrGameObject(amr, amr.agvPosition.x, amr.agvPosition.y);
    });
  }

  initiateAmrGameObject(amr: phaserGameOpject, x: number, y: number) {
    amr.gameObject = this.add
      .image(x, y, ImageNames.Amr)
      .setOrigin(0, 0)
      .setDisplaySize(30, 30);
  }

  override update() {
    this.amrs.forEach((amr) => {
      if (amr.gameObject) {
        amr.gameObject.x = amr.agvPosition.x;
        amr.gameObject.y = amr.agvPosition.y;
        if (getAmrState(amr) == 'danger') amr.gameObject.alpha = 0.2;
        else if (getAmrState(amr) == 'warning') amr.gameObject.alpha = 0.5;
        else amr.gameObject.alpha = 1;
      } else {
        this.initiateAmrGameObject(amr, amr.agvPosition.x, amr.agvPosition.y);
      }
    });
  }
}
