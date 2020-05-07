import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LinkSetUp } from 'ClientApp/app/Models/LinkSetUps/linkSetUp';
import { IconNameMaster } from 'ClientApp/app/Models/LinkSetUps/iconNameMaster';

import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { error } from 'util';

@Injectable({
  providedIn: 'root'
})
export class RegSucessOnUsService {

  baseUrl: string = "";UserId:string;
  constructor(private _http: HttpClient, @Inject('BASE_URL') myAppUrl: string) {
      //this.baseUrl = myAppUrl;
  this.baseUrl = "http://localhost:49512/";
  }

  GetAllHeader(UserId,EntityId,Status): Observable<any> {
      return this._http.get<any>(this.baseUrl + 'api/MandateRegSucessOnUs/GetAllHeader/' + UserId + '/' + EntityId + '/' + Status);
      
  }
  GetAllDetails(UserId,EntityId,Status,lotNo): Observable<any> {
    return this._http.get<any>(this.baseUrl + 'api/MandateRegSucessOnUs/GetAllDetails/' + UserId + '/' + EntityId + '/' + Status + '/' + lotNo);
  }


  errorHandler(error: Response) {
      console.log(error);
      return Observable.throw(error);
  }

}


