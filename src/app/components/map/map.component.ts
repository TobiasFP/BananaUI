import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  Input,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import { PpmImage } from '@cs101/ppm-converter';
import * as Phaser from 'phaser';
import { State } from 'src/app/interfaces/amr';
import PhaserScene, { phaserAmr } from 'src/app/components/map';
import { pgmP5Tools } from './pgmP5Tools';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit, OnChanges {
  map: string = '';
  metersToAPixel: number = 0.05;
  mapSizeX: number = 0;
  mapSizeY: number = 0;

  @Input()
  mapPgmbuffer!: Uint8Array;
  @Input()
  amrs: State[] = [];
  phaserAmrs: phaserAmr[] = [];

  @ViewChild('mapCanvas', { static: false })
  mapCanvas!: ElementRef<HTMLCanvasElement>;
  game!: Phaser.Game;
  phaserMapScene!: PhaserScene;
  constructor() {}

  ngAfterViewInit() {
    const rawPGM = atob(new TextDecoder().decode(this.mapPgmbuffer));
    const pgmInfo = new pgmP5Tools(rawPGM);
    const imageConverter = new PpmImage(rawPGM);
    this.phaserAmrs = this.amrs;

    this.mapSizeY = pgmInfo.getHeight() ?? 0;
    this.mapSizeX = pgmInfo.getWidth() ?? 0;
    this.phaserMapScene = new PhaserScene(
      this.metersToAPixel,
      imageConverter.getPNG(),
      this.phaserAmrs
    );

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.WEBGL,
      canvas: this.mapCanvas.nativeElement,
      width: this.mapSizeY,
      height: this.mapSizeX,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { x: 0, y: 0 },
          debug: true,
        },
      },
      scene: [this.phaserMapScene],
    };
    this.game = new Phaser.Game(config);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.phaserMapScene) {
      const amrs = changes['amrs'].currentValue as Array<State>;
      amrs.forEach((amr) => {
        const currentSceneAmr = this.phaserMapScene.amrs.find((sceneAmr) => {
          return amr.ID == sceneAmr.ID;
        });
        if (currentSceneAmr !== undefined) {
          currentSceneAmr.agvPosition = amr.agvPosition;
        } else {
          this.phaserMapScene.amrs.push(amr);
        }
      });
    }
  }
}
