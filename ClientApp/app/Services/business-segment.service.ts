import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BusinessSegment } from 'ClientApp/app/Models/BusinessSegment/businessSegment';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { error } from 'util';

@Injectable({
  providedIn: 'root'
})
export class BusinessSegmentService {

  baseUrl: string = ""; UserId: string = ""; EntityId: string = "";
  constructor(private _http: HttpClient, @Inject('BASE_URL') myAppUrl: string) {
    //this.baseUrl = myAppUrl;
    this.baseUrl = "http://localhost:49512/";
  }

  getBusinessSegments(): Observable<any> {

      let item = JSON.parse(sessionStorage.getItem('User'));
      this.UserId = item.UserId;
      this.EntityId = item.ReferenceId;
      return this._http.get<any>(this.baseUrl + 'api/BusinessSegment/Index/' + this.UserId + '/' + this.EntityId);
  }
  SaveBusinessSegment(em: any): Observable<BusinessSegment> {
      const body = em;
      const headers = new HttpHeaders().set('content-type', 'application/json');
      let item = JSON.parse(sessionStorage.getItem('User'));
      this.UserId = item.UserId;
      this.EntityId = item.ReferenceId;
      return this._http.post<BusinessSegment>(this.baseUrl + 'api/BusinessSegment/Create/' + this.UserId + '/' + this.EntityId, body, {
          headers
      });
  }

  //DeleteDocument(em): Observable<SettlementType> {
  //    return this._http.delete<SettlementType>(this.baseUrl + 'api/SettlementType/Delete/' + em);
  //}

  UpdateBusinessSegment(em: any, EmpId): Observable<BusinessSegment> {
      const body = em;
      let item = JSON.parse(sessionStorage.getItem('User'));
      this.UserId = item.UserId;
      this.EntityId = item.ReferenceId;
      const headers = new HttpHeaders().set('content-type', 'application/json');
      return this._http.post<BusinessSegment>(this.baseUrl + 'api/BusinessSegment/Edit/' + this.UserId + '/' + this.EntityId + '/' + EmpId, body, {
          headers
      });
  }


  errorHandler(error: Response) {
      console.log(error);
      return Observable.throw(error);
  }

}


