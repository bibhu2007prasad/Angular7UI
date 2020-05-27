import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HeaderGridNachUnSucessOn } from 'ClientApp/app/Models/NachUnSucessOnUs/headerGridNachUnSucessOn';
import { DetailGridNachUnSuccessOnUs } from 'ClientApp/app/Models/NachUnSucessOnUs/detailGridNachUnSucessOn';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { error } from 'util';

@Injectable({
  providedIn: 'root'
})
export class NachUnSucessOnUsService {

  baseUrl: string = "";UserId:string;
  constructor(private _http: HttpClient, @Inject('BASE_URL') myAppUrl: string) {
      //this.baseUrl = myAppUrl;
  this.baseUrl = "http://localhost:49512/";
  }

  GetAllHeader(UserId,EntityId,Status): Observable<any> {
      return this._http.get<any>(this.baseUrl + 'api/NachUnSucessOnUs/GetAllHeader/' + UserId + '/' + EntityId + '/' + Status);
      
  }
  GetAllDetails(UserId,EntityId,Status,FileNo,UploadID): Observable<any> {
    return this._http.get<any>(this.baseUrl + 'api/NachUnSucessOnUs/GetAllDetails/' + UserId + '/' + EntityId + '/' + Status + '/' + FileNo + '/'+ UploadID);
  }


  errorHandler(error: Response) {
      console.log(error);
      return Observable.throw(error);
  }

}
