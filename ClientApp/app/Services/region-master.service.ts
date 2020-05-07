import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegionMaster } from 'ClientApp/app/Models/RegionMaster/regionMaster';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { error } from 'util';

@Injectable({
  providedIn: 'root'
})
export class RegionMasterService {
  baseUrl: string = ""; UserId: string = ""; EntityId: string = "";
  constructor(private _http: HttpClient, @Inject('BASE_URL') myAppUrl: string) {
    //this.baseUrl = myAppUrl;
    this.baseUrl = "http://localhost:49512/";
  }
 
  BindStates(): Observable<any> {
      let item = JSON.parse(sessionStorage.getItem('User'));
      this.UserId = item.UserId;
      this.EntityId = item.ReferenceId;

      return this._http.get<any>(this.baseUrl + 'api/RegionMaster/BindStates/' + this.UserId + '/' + this.EntityId);

  } 

  getRegionMasters(): Observable<any> {

      let item = JSON.parse(sessionStorage.getItem('User'));
      this.UserId = item.UserId;
      this.EntityId = item.ReferenceId;
      return this._http.get<any>(this.baseUrl + 'api/RegionMaster/Index/' + this.UserId + '/' + this.EntityId);
  }
  SaveRegionMaster(em: any): Observable<RegionMaster> {
      const body = em;
      const headers = new HttpHeaders().set('content-type', 'application/json');
      let item = JSON.parse(sessionStorage.getItem('User'));
      this.UserId = item.UserId;
      this.EntityId = item.ReferenceId;
      return this._http.post<RegionMaster>(this.baseUrl + 'api/RegionMaster/Create/' + this.UserId + '/' + this.EntityId, body, {
          headers
      });
  }

  //DeleteDocument(em): Observable<RegionMaster> {
  //    return this._http.delete<RegionMaster>(this.baseUrl + 'api/RegionMaster/Delete/' + em);
  //}

  UpdateRegionMaster(em: any, RegionID): Observable<RegionMaster> {
      const body = em;
      let item = JSON.parse(sessionStorage.getItem('User'));
      this.UserId = item.UserId;
      this.EntityId = item.ReferenceId;
      const headers = new HttpHeaders().set('content-type', 'application/json');
      return this._http.post<RegionMaster>(this.baseUrl + 'api/RegionMaster/Edit/' + this.UserId + '/' + this.EntityId + '/' + RegionID, body, {
          headers
      });
  }


  errorHandler(error: Response) {
      console.log(error);
      return Observable.throw(error);
  }

}


