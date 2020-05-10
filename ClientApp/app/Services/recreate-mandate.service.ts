import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MandateDetails } from 'ClientApp/app/Models/ReCreateMandate/MandateDetails';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { error } from 'util';

@Injectable({
  providedIn: 'root'
})
export class RecreateMandateService {
  baseUrl: string = "";UserId: string = ""; EntityId: string = "";

  constructor(private _http: HttpClient, @Inject('BASE_URL') myAppUrl: string) {
     // this.baseUrl = myAppUrl;
      this.baseUrl = "http://localhost:49512/";
  }
  BindGridData(FromDate, ToDate, UserId,EntityId,MandateId,ReferenceNo,ActivityName): Observable<MandateDetails> {
     // alert(FromDate + " " + ToDate + " " + UserId);
      //alert("Service" + FromDate + " " + ToDate);
      return this._http.get<MandateDetails>(this.baseUrl + 'api/BindData/ReCreateMandate/' + FromDate + '/' + ToDate + '/' + UserId + '/' + EntityId +'/' + MandateId + '/' + ReferenceNo+ '/' + ActivityName);
  }
  errorHandler(error: Response) {
      console.log(error);
      return Observable.throw(error);
  }  
}
