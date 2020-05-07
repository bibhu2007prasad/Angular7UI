import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BranchMaster } from 'ClientApp/app/Models/BranchMaster/branchMaster';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { error } from 'util';
@Injectable({
  providedIn: 'root'
})
export class BranchMasterService {
  baseUrl: string = ""; UserId: string = ""; EntityId: string = "";
  constructor(private _http: HttpClient, @Inject('BASE_URL') myAppUrl: string) {
    //this.baseUrl = myAppUrl;
    this.baseUrl = "http://localhost:49512/";
  }
 
  BindStates(): Observable<any> {
      let item = JSON.parse(sessionStorage.getItem('User'));
      this.UserId = item.UserId;
      this.EntityId = item.ReferenceId;

      return this._http.get<any>(this.baseUrl + 'api/BranchMaster/BindStates/' + this.UserId + '/' + this.EntityId);

  } 

  getBranchMasters(): Observable<any> {

      let item = JSON.parse(sessionStorage.getItem('User'));
      this.UserId = item.UserId;
      this.EntityId = item.ReferenceId;
      return this._http.get<any>(this.baseUrl + 'api/BranchMaster/Index/' + this.UserId + '/' + this.EntityId);
  }
  SaveBranchMaster(em: any): Observable<BranchMaster> {
      const body = em;
      const headers = new HttpHeaders().set('content-type', 'application/json');
      let item = JSON.parse(sessionStorage.getItem('User'));
      this.UserId = item.UserId;
      this.EntityId = item.ReferenceId;
      return this._http.post<BranchMaster>(this.baseUrl + 'api/BranchMaster/Create/' + this.UserId + '/' + this.EntityId, body, {
          headers
      });
  }

  //DeleteDocument(em): Observable<BranchMaster> {
  //    return this._http.delete<BranchMaster>(this.baseUrl + 'api/BranchMaster/Delete/' + em);
  //}

  UpdateBranchMaster(em: any, BranchId): Observable<BranchMaster> {
      const body = em;
      let item = JSON.parse(sessionStorage.getItem('User'));
      this.UserId = item.UserId;
      this.EntityId = item.ReferenceId;
      const headers = new HttpHeaders().set('content-type', 'application/json');
      return this._http.post<BranchMaster>(this.baseUrl + 'api/BranchMaster/Edit/' + this.UserId + '/' + this.EntityId + '/' + BranchId, body, {
          headers
      });
  }


  errorHandler(error: Response) {
      console.log(error);
      return Observable.throw(error);
  }

}


