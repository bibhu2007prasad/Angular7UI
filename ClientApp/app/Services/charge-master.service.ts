import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChargeMaster } from 'ClientApp/app/Models/ChargeMaster/chargeMaster';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { error } from 'util';

@Injectable({
  providedIn: 'root'
})
export class ChargeMasterService {
  baseUrl: string = ""; UserId: string = ""; EntityId: string = "";
  constructor(private _http: HttpClient, @Inject('BASE_URL') myAppUrl: string) {
    //this.baseUrl = myAppUrl;
    this.baseUrl = "http://localhost:49512/";
  }
 
  

  getChargeMasters(): Observable<any> {

      let item = JSON.parse(sessionStorage.getItem('User'));
      this.UserId = item.UserId;
      this.EntityId = item.ReferenceId;
      return this._http.get<any>(this.baseUrl + 'api/ChargeMaster/Index/' + this.UserId + '/' + this.EntityId);
  }
  SaveChargeMaster(em: any): Observable<ChargeMaster> {
      const body = em;
      const headers = new HttpHeaders().set('content-type', 'application/json');
      let item = JSON.parse(sessionStorage.getItem('User'));
      this.UserId = item.UserId;
      this.EntityId = item.ReferenceId;
      return this._http.post<ChargeMaster>(this.baseUrl + 'api/ChargeMaster/Create/' + this.UserId + '/' + this.EntityId, body, {
          headers
      });
  }

  //DeleteDocument(em): Observable<SettlementType> {
  //    return this._http.delete<SettlementType>(this.baseUrl + 'api/SettlementType/Delete/' + em);
  //}

  UpdateChargeMaster(em: any, ChargeTypeId): Observable<ChargeMaster> {
      const body = em;
      let item = JSON.parse(sessionStorage.getItem('User'));
      this.UserId = item.UserId;
      this.EntityId = item.ReferenceId;
      const headers = new HttpHeaders().set('content-type', 'application/json');
      return this._http.post<ChargeMaster>(this.baseUrl + 'api/ChargeMaster/Edit/' + this.UserId + '/' + this.EntityId + '/' + ChargeTypeId, body, {
          headers
      });
  }


  errorHandler(error: Response) {
      console.log(error);
      return Observable.throw(error);
  }

}


