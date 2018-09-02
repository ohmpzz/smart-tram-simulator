import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { HttpClient } from '@angular/common/http';

import { Tram } from './tram.model';

import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TramService {
  constructor(private db: AngularFireDatabase, private http: HttpClient) {}

  getTramById(id) {
    return this.db
      .object(`trams/${id}`)
      .snapshotChanges()
      .pipe(
        map(tram => {
          return { id: tram.key, ...(tram.payload.val() as Tram) };
        })
      );
  }

  getRouteOne() {
    return this.http.get('./assets/routeOne.json');
  }

  getRouteTwo() {
    return this.http.get('./assets/routeTwo.json');
  }

  updateTramById(id, tram) {
    this.db.object(`trams/${id}`).update(tram);
  }
}
