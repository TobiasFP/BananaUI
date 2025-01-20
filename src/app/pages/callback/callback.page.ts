import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../../auth/auth.service';

@Component({
  standalone: false,
  selector: 'app-callback',
  templateUrl: './callback.page.html',
  styleUrls: ['./callback.page.scss'],
})
export class CallbackPage implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    public alertController: AlertController
  ) {}

  ngOnInit() {
    const token = this.activatedRoute.snapshot.paramMap.get('token') ?? "";
    const idToken = this.activatedRoute.snapshot.paramMap.get('idtoken') ?? "";
    const refreshtoken =
      this.activatedRoute.snapshot.paramMap.get('refreshtoken') ?? "";
    const expires = this.activatedRoute.snapshot.paramMap.get('expires') ?? "";
    this.authService
      .setToken({
        token: token,
        refreshtoken: refreshtoken,
        idtoken: idToken,
        expires: +expires,
      })
      .subscribe(
        (set) => {
          if (set) {
            this.authService.isValidated.then(() => {
              this.router.navigateByUrl('/');
            });
          } else {
            this.alertController
              .create({
                header:
                  'There was an error logging in, try refreshing the page',
                buttons: ['OK'],
              })
              .then((alert) => {
                alert.present();
              });
          }
        },
        (err) => {
          this.alertController
            .create({
              header: 'There was an error Logging in, try refreshing the page',
              buttons: ['OK'],
            })
            .then((alert) => {
              alert.present();
            });
          console.log(err);
        }
      );
  }
}
