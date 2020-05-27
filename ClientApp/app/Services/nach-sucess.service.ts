import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HeaderGridNachSucess } from 'ClientApp/app/Models/NachSucess/headerGridNachSucess';
import { DetailGridNachSuccess } from 'ClientApp/app/Models/NachSucess/detailGridNachSucess';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { error } from 'util';

@Injectable({
  providedIn: 'root'
})
export class NachSucessService {
  baseUrl: string = "";UserId:string;
  constructor(private _http: HttpClient, @Inject('BASE_URL') myAppUrl: string) {
      //this.baseUrl = myAppUrl;
  this.baseUrl = "http://localhost:49512/";
  }

  GetAllHeader(UserId,EntityId,Status): Observable<any> {
      return this._http.get<any>(this.baseUrl + 'api/NachSucess/GetAllHeader/' + UserId + '/' + EntityId + '/' + Status);
      
  }
  GetAllDetails(UserId,EntityId,Status,FileNo,UploadID): Observable<any> {
    return this._http.get<any>(this.baseUrl + 'api/NachSucess/GetAllDetails/' + UserId + '/' + EntityId + '/' + Status + '/' + FileNo  + '/'+UploadID);
  }


  errorHandler(error: Response) {
      console.log(error);
      return Observable.throw(error);
  }

}
