import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import {AlertService} from './alert.service';



@Component({ selector: 'alert', templateUrl: 'alert.component.html' })
export class AlertComponent implements OnInit, OnDestroy {
  private subscription: Subscription | any;
  showAlert  = true;
  message: any;
  type: any;

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.subscription = this.alertService.getAlert()
        .subscribe(message => {
          console.log('got message')
          console.log(message)
                this.message = message.text.error.message;
                this.message = message.type
                this.showAlert = true;
        });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
