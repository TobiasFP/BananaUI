import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  Input,
  SimpleChanges,
  OnChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { PpmImage } from '@cs101/ppm-converter';
import * as Phaser from 'phaser';
import { State } from 'src/app/interfaces/amr';
import PhaserScene, { phaserAmr } from 'src/app/components/map';
import { pgmP5Tools } from './pgmP5Tools';
import { Node, NodeMeta } from 'src/app/interfaces/order';

export interface selectedLocation {
  x: number;
  y: number;
}
@Component({
  standalone: false,
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
  selectLocation: boolean = true;
  @Input()
  selectedIcon: string = '';

  selectedIconImage!: Phaser.GameObjects.Image;

  @Output() selectedLocations: EventEmitter<selectedLocation> =
    new EventEmitter();

  @Input()
  mapPgmbuffer!: Uint8Array;
  @Input()
  amrs: State[] = [];
  @Input()
  nodes: NodeMeta[] = [];
  @Input()
  reload: boolean = false;

  @ViewChild('mapCanvas', { static: false })
  mapCanvas!: ElementRef<HTMLCanvasElement>;
  game!: Phaser.Game;
  phaserMapScene!: PhaserScene;
  constructor() {}

  ngAfterViewInit() {
    const rawPGM = atob(new TextDecoder().decode(this.mapPgmbuffer));
    const pgmInfo = new pgmP5Tools(rawPGM);
    const imageConverter = new PpmImage(rawPGM);

    this.mapSizeY = pgmInfo.getHeight() ?? 0;
    this.mapSizeX = pgmInfo.getWidth() ?? 0;
    this.phaserMapScene = new PhaserScene(
      this.metersToAPixel,
      imageConverter.getPNG(),
      this.amrs,
      this.nodes
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
    if (this.selectLocation) {
      setTimeout(() => {
        this.phaserMapScene.input.on('pointerup', this.pointerclick.bind(this));
      }, 200);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      this.game &&
      changes['reload'] &&
      changes['reload'].currentValue == true
    ) {
      this.game.destroy(false);
      setTimeout(() => {
        this.ngAfterViewInit();
      }, 300);
    }
    if (this.phaserMapScene) {
      // if we only want to select location, we do not want this map to display amrs.
      const amrs = changes['amrs']?.currentValue ?? ([] as State[]);
      amrs.forEach((amr: phaserAmr) => {
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
  private pointerclick(p: Phaser.Input.Pointer): void {
    if (this.selectedIconImage) {
      this.selectedIconImage.destroy();
    }
    this.selectedIconImage = this.phaserMapScene.add.image(
      p.x,
      p.y,
      this.selectedIcon
    );

    this.selectedLocations.emit({ x: p.x, y: p.y });
  }
}
