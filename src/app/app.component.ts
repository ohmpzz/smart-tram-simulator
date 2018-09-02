import { Component, OnInit } from '@angular/core';
import { TramService } from './tram.service';

import { Tram } from './tram.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  tramOne$: Observable<Tram>;
  tramTwo$: Observable<Tram>;
  tramThree$: Observable<Tram>;

  routeOne$: Observable<any>;
  routeTwo$: Observable<any>;

  constructor(private tramService: TramService) {}

  ngOnInit() {
    this.tramOne$ = this.tramService.getTramById('tramOne');
    this.tramTwo$ = this.tramService.getTramById('tramTwo');
    this.tramThree$ = this.tramService.getTramById('tramThree');

    this.routeOne$ = this.tramService.getRouteOne();
    this.routeTwo$ = this.tramService.getRouteTwo();
  }

  onUpdate(event: Tram) {
    console.log(event);
    const { id, ...tram } = event;
    this.tramService.updateTramById(id, tram);
  }
}
