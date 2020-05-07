import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Document } from 'ClientApp/app/Models/Document/document';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { error } from 'util';

@Injectable({
  providedIn: 'root'
})
export class DocumentMasterService {
    baseUrl: string = ""; UserId: string = ""; EntityId: string = "";
    constructor(private _http: HttpClient, @Inject('BASE_URL') myAppUrl: string) {
        //this.baseUrl = myAppUrl;
    this.baseUrl = "http://localhost:49512/";
    }

    getDocuments(): Observable<any> {
        
        let item = JSON.parse(sessionStorage.getItem('User'));
        this.UserId = item.UserId;
        this.EntityId = item.ReferenceId;
        return this._http.get<any>(this.baseUrl + 'api/Document/Index/' + this.UserId + '/' + this.EntityId);
    }
    SaveDocument(em: any): Observable<Document> {
        const body = em;
        const headers = new HttpHeaders().set('content-type', 'application/json');
        let item = JSON.parse(sessionStorage.getItem('User'));
        this.UserId = item.UserId;
        this.EntityId = item.ReferenceId;
        return this._http.post<Document>(this.baseUrl + 'api/Document/Create/' + this.UserId + '/' + this.EntityId, body, {
            headers
        });
    }

    //DeleteDocument(em): Observable<Document> {
    //    return this._http.delete<Document>(this.baseUrl + 'api/Document/Delete/' + em);
    //}

    UpdateDocument(em: any, DocumentTypeid): Observable<Document> {
        const body = em;
        let item = JSON.parse(sessionStorage.getItem('User'));
        this.UserId = item.UserId;
        this.EntityId = item.ReferenceId;
        const headers = new HttpHeaders().set('content-type', 'application/json');
        return this._http.post<Document>(this.baseUrl + 'api/Document/Edit/' + this.UserId + '/' + this.EntityId + '/' + DocumentTypeid, body, {
            headers
        });
    }


    errorHandler(error: Response) {
        console.log(error);
        return Observable.throw(error);
    }

}


