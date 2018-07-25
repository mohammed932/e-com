import { ElementRef, Renderer2, OnInit, Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { SignUpPage } from '../sign-up/sign-up';
@Component({
  selector: 'page-customer-type',
  templateUrl: 'customer-type.html',
})
export class CustomerTypePage {
  @ViewChild('box1') box1: ElementRef;
  @ViewChild('box2') box2: ElementRef;
  constructor(public navCtrl: NavController,
    private viewCtrl: ViewController,
    private modalCtrl: ModalController,
    private rd: Renderer2,
    public navParams: NavParams) {
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  next(type) {


    if (type == 'buy') {
      this.rd.setStyle(this.box1.nativeElement, 'border', '3px solid #3399cc')
      this.rd.setStyle(this.box2.nativeElement, 'border', '1px solid #3399cc')
    } else {
      this.rd.setStyle(this.box2.nativeElement, 'border', '3px solid #3399cc')
      this.rd.setStyle(this.box1.nativeElement, 'border', '1px solid #3399cc')
    }


    let modal = this.modalCtrl.create(SignUpPage, { type: type });
    modal.present();
    this.dismiss();
  }

}
