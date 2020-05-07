import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Designation } from 'ClientApp/app/Models/Designation/designation';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { error } from 'util';

@Injectable({
  providedIn: 'root'
})
export class DesignationMasterService {
    UserId: string = ""; EntityId: string = "";
    baseUrl: string = "";
    constructor(private _http: HttpClient, @Inject('BASE_URL') myAppUrl: string) {
      //this.baseUrl = myAppUrl;
    this.baseUrl = "http://localhost:49512/";
    }

    getDesignations(): Observable<any> {
        let item = JSON.parse(sessionStorage.getItem('User'));
        this.UserId = item.UserId;
        this.EntityId = item.ReferenceId;

        return this._http.get<any>(this.baseUrl + 'api/Designation/Index/' + this.UserId + '/' + this.EntityId);
    }
    SaveDesignation(em: any): Observable<Designation> {
        const body = em;
        let item = JSON.parse(sessionStorage.getItem('User'));
        this.UserId = item.UserId;
        this.EntityId = item.ReferenceId;
        const headers = new HttpHeaders().set('content-type', 'application/json');
        return this._http.post<Designation>(this.baseUrl + 'api/Designation/Create/' + this.UserId + '/' + this.EntityId, body, {
            headers
        });
    }

    DeleteDesignation(DesignationId): Observable<Designation> {
        let item = JSON.parse(sessionStorage.getItem('User'));
        this.UserId = item.UserId;
        this.EntityId = item.ReferenceId;
        return this._http.delete<Designation>(this.baseUrl + 'api/Designation/Delete/' + DesignationId +'/' + this.UserId + '/' + this.EntityId );
    }

    UpdateDesignation(em: any, DesignationId): Observable<Designation> {
        const body = em;
        let item = JSON.parse(sessionStorage.getItem('User'));
        this.UserId = item.UserId;
        this.EntityId = item.ReferenceId;
        const headers = new HttpHeaders().set('content-type', 'application/json');
        return this._http.post<Designation>(this.baseUrl + 'api/Designation/Edit/' + DesignationId +'/' + this.UserId + '/' + this.EntityId , body, {
            headers
        });
    }


    errorHandler(error: Response) {
        console.log(error);
        return Observable.throw(error);
    }

}


