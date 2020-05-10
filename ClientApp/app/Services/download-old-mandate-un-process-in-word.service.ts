import { Injectable, Inject} from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { error } from 'util';
import { UnderProcessMandateOutWard } from 'ClientApp/app/Models/UnderProcessMandateOutWard/underProcessMandateOutWard';
import { Corporate } from 'ClientApp/app/Models/UnderProcessMandateOutWard/corporate';
import { SponserBank } from 'ClientApp/app/Models/UnderProcessMandateOutWard/sponserBank';

@Injectable({
  providedIn: 'root'
})
export class DownloadOldMandateUnProcessInWordService {
  baseUrl: string = "";UserId: string = ""; EntityId: string = "";

  constructor(private _http: HttpClient, @Inject('BASE_URL') myAppUrl: string) {
     // this.baseUrl = myAppUrl;
      this.baseUrl = "http://localhost:49512/";
  }
  getBank(): Observable<any> {
    let item = JSON.parse(sessionStorage.getItem('User'));    
    this.UserId = item.UserId;
    this.EntityId = item.ReferenceId;  
    // var i = item.EntityId;
    return this._http.get<any>(this.baseUrl + 'api/DownloadoldemandateUnProcInWard/BankBind/' + this.UserId +'/'+ this.EntityId );
  }
  getCoporates(): Observable<any> {
    let item = JSON.parse(sessionStorage.getItem('User'));    
    this.UserId = item.UserId;
    this.EntityId = item.ReferenceId;  
    // var i = item.EntityId;
    return this._http.get<any>(this.baseUrl + 'api/DownloadoldemandateUnProcInWard/GetUserCorpData/' + this.EntityId );
  }
  BindGridData(FromDate, ToDate, UserId,sponsorbankcode,EntityId,ReferenceNo,ActivityName): Observable<UnderProcessMandateOutWard> {
     // alert(FromDate + " " + ToDate + " " + UserId);
      //alert("Service" + FromDate + " " + ToDate);
      //var Bank="DEMORBL0001";
      return this._http.get<UnderProcessMandateOutWard>(this.baseUrl + 'api/DownloadoldemandateUnProcInWard/SearchData/' + FromDate + '/' + ToDate + '/' + sponsorbankcode + '/' + UserId +'/' + EntityId + '/' + ReferenceNo+ '/' + ActivityName);
  }
  errorHandler(error: Response) {
      console.log(error);
      return Observable.throw(error);
  }  
}

