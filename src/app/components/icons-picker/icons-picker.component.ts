import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ionicons } from 'src/app/interfaces/icons';

@Component({
  selector: 'app-icons-picker',
  templateUrl: './icons-picker.component.html',
  styleUrls: ['./icons-picker.component.scss'],
})
export class IconsPickerComponent implements OnInit {
  searchedIcons: string[] = [];
  icons: string[] = ionicons;
  icon: string = '';
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    this.searchedIcons = this.icons;
  }

  searchIcons(event: any) {
    const query = event.target.value.toLowerCase();
    this.searchedIcons = this.icons.filter((icon) => icon.indexOf(query) > -1);
  }

  setIcon(icon: string) {
    this.icon = icon;
    this.confirm();
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(this.icon, 'confirm');
  }
}
