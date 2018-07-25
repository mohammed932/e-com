import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, Platform } from 'ionic-angular';
import { ConfigProvider } from '../../providers/config/config';
import { Http } from '@angular/http';
import { LoadingProvider } from '../../providers/loading/loading';
import { SharedDataProvider } from '../../providers/shared-data/shared-data';
import { SelectZonesPage } from '../select-zones/select-zones';
import { LocationDataProvider } from '../../providers/location-data/location-data';
import { SelectCountryPage } from '../select-country/select-country';

@Component({
  selector: 'page-shipping-address',
  templateUrl: 'shipping-address.html',
})
export class ShippingAddressPage {
  lat: any = ''
  lng: any = ''
  isWaiting: boolean = false


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public config: ConfigProvider,
    public http: Http,
    public shared: SharedDataProvider,
    private platform: Platform,
    public modalCtrl: ModalController,
    public loading: LoadingProvider,
    public location: LocationDataProvider) {

    // this.getCurrentLocation()
    console.log('this.shared.customerData.id : ', this.shared.customerData.id);

    if (this.shared.customerData.id != null) {

      this.shared.shipping = this.shared.customerData.shipping;
      console.log("looooool : ", this.shared.customerData);

      this.shared.shippingCountryName = this.location.getCountryName(this.shared.customerData.shipping.country);
    }
    //this.getAllTaxRates(1);
  }



  getCurrentAddress() {

  }

  submit() {
    console.log("dadaddata : ", this.shared.shipping);

    this.navCtrl.push(HomePage);
  }
  selectCountryPage() {
    let modal = this.modalCtrl.create(SelectCountryPage, { page: 'shipping' });
    modal.present();
  }
  selectZonePage() {
    let modal = this.modalCtrl.create(SelectZonesPage, { page: 'shipping' });
    modal.present();
  }
  getAllTaxRates(page) {
    this.config.Woocommerce.getAsync("taxes/?per_page=100&page=" + page).then((data) => {
      var dat = JSON.parse(data.body);
      for (let val of dat) {
        this.shared.listTaxRates.push(val);
      }
      if (dat.length != 0) { this.getAllTaxRates(page + 1); }
      //else console.log(this.shared.listTaxRates);
    });
  }
}
