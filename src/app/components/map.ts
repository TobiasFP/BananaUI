import { environment } from 'src/environments/environment';
import { State } from '../interfaces/amr';

export enum ImageNames {
  Map = 'map',
  Amr = 'amr',
  RedParticle = 'red_particle',
}

export interface phaserAmr extends State {
  gameObject?: Phaser.GameObjects.Image;
}

export default class PhaserScene extends Phaser.Scene {
  map!: string;
  amrs: Array<phaserAmr> = [];
  self!: Phaser.Scene;
  metersToAPixel: number;

  constructor(metersToAPixel: number, map: string, amrs: Array<phaserAmr>) {
    super('phaser-map');
    this.metersToAPixel = metersToAPixel;
    this.map = map;
    this.amrs = amrs;
  }

  preload() {
    this.load.setBaseURL(environment.baseUrl);
    this.load.image(ImageNames.Map, this.map);
    this.load.image(ImageNames.Amr, 'assets/sprites/amr.png');
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

    // Add robots
    this.amrs.forEach((amr) => {
      this.initiateAmrGameObject(amr);
    });
  }

  initiateAmrGameObject(amr: phaserAmr) {
    amr.gameObject = this.add
      .image(amr.agvPosition.x, amr.agvPosition.y, ImageNames.Amr)
      .setOrigin(0, 0)
      .setDisplaySize(30, 30);
  }

  override update() {
    this.amrs.forEach((amr) => {
      if (amr.gameObject) {
        amr.gameObject.x = amr.agvPosition.x;
      } else {
        this.initiateAmrGameObject(amr);
      }
    });
  }
}
