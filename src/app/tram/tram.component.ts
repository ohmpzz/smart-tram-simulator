import { Component, Input, Output, EventEmitter } from '@angular/core';

import { interval } from 'rxjs';

import { Tram } from '../tram.model';

@Component({
  selector: 'tram',
  template: `
  <h4 class="subtitle is-4">{{tram?.name}} </h4>
  <div class="columns is-mobile">

    <div class="column is-4">
      <button 
      class="button is-primary" 
      [disabled]="this.isStart" 
      [class.is-loading]="this.isStart"
      (click)="onStart()">START</button>
    </div>


    <div class="column is-4">
      <button 
      class="button is-warning" 
      [disabled]="!this.isStart" 
      (click)="onStop()">STOP</button>
    </div>


    <div class="column is-4">
    <button 
    class="button is-danger"
    (click)="onReset()">RESET</button>
    </div>

  </div>
  <hr>
  `,
  styleUrls: ['./tram.component.css'],
})
export class TramComponent {
  isStart = false;
  index = 0;

  routeInterval: any;

  @Input()
  tram: Tram;
  @Input()
  route: any[];

  @Output()
  update = new EventEmitter<Tram>();

  constructor() {}

  onStart() {
    this.isStart = true;
    this.start();
  }

  onStop() {
    this.isStart = false;
    this.routeInterval.unsubscribe();
  }

  onReset() {
    this.isStart = false;
    this.routeInterval.unsubscribe();
    this.index = 0;
  }

  private start() {
    this.routeInterval = interval(2000).subscribe(() => {
      this.index++;
      if (this.route.length - 1 < this.index) {
        this.index = 0;
      }

      let lastLocation = this.route[this.index];
      console.log(this.index, this.tram.name);
      console.log(lastLocation);

      this.update.emit({ ...this.tram, lastLocation });
    });
  }
}
