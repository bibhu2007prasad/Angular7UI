import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { LinkSetUp } from 'ClientApp/app/Models/LinkSetUps/linkSetUp';
// import { IconNameMaster } from 'ClientApp/app/Models/LinkSetUps/iconNameMaster';

import { HistoricalMandateClass } from 'ClientApp/app/Models/MandateRegOutWordHistoricalMandate/historicalMandateClass';
import { Corporate } from 'ClientApp/app/Models/MandateRegOutWordHistoricalMandate/Corporate/corporate';


import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { error } from 'util';

@Injectable({
  providedIn: 'root'
})
export class HitoricalMandateService {

  baseUrl: string = "";UserId: string = ""; EntityId: string = "";

    constructor(private _http: HttpClient, @Inject('BASE_URL') myAppUrl: string) {
       // this.baseUrl = myAppUrl;
        this.baseUrl = "http://localhost:49512/";
    }
    getCoporates(): Observable<any> {
      let item = JSON.parse(sessionStorage.getItem('User'));    
      this.UserId = item.UserId;
      this.EntityId = item.ReferenceId;  
      // var i = item.EntityId;
      return this._http.get<any>(this.baseUrl + 'api/BindData/BindCorp/' + this.EntityId );
  }
    BindGridData(FromDate, ToDate, UserId,EntityId,ReferenceNo,ActivityName): Observable<HistoricalMandateClass> {
       // alert(FromDate + " " + ToDate + " " + UserId);
        //alert("Service" + FromDate + " " + ToDate);
        return this._http.get<HistoricalMandateClass>(this.baseUrl + 'api/BindData/DatesWise/' + FromDate + '/' + ToDate + '/' + UserId +'/' + EntityId + '/' + ReferenceNo+ '/' + ActivityName);
    }
    errorHandler(error: Response) {
        console.log(error);
        return Observable.throw(error);
    }  
}
