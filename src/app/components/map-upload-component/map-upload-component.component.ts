import { Component, OnInit } from '@angular/core';
import { AmrMap } from 'src/app/interfaces/map';
import { AmrMapData } from '../../interfaces/map';
import { MapsService } from 'src/app/services/maps.service';

@Component({
  selector: 'app-map-upload-component',
  templateUrl: './map-upload-component.component.html',
  styleUrls: ['./map-upload-component.component.scss'],
})
export class MapUploadComponentComponent implements OnInit {
  amrMapToUpload: AmrMap = {
    ID: 0,
    mapVersion: '',
    mapStatus: '',
    mapDescription: '',
  };
  amrFormData: FormData = new FormData();
  constructor(public mapsService: MapsService) {}

  ngOnInit() {}
  async onFileChange(fileChangeEvent: Event) {
    const target = fileChangeEvent.target as HTMLInputElement;
    console.log(this.amrMapToUpload.mapDescription);
    this.amrFormData.set('mapDescription', this.amrMapToUpload.mapDescription);
    if (target.files) {
      this.amrFormData.append('map', target.files[0]);
      // for (let file of Array.from(target.files)) {
      //   this.amrFormData.append('map[]', file);
      // }
    }
  }

  uploadMap() {
    // const formData = new FormData();
    // formData.append('file', new Blob([this.amrMapToUpload.MapData?.Data]));
    this.mapsService.Add(this.amrFormData).subscribe((map) => {
      console.log(map);
    });
  }
}
