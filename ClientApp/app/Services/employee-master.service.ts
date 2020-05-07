import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from 'ClientApp/app/Models/Employee/employee';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { error } from 'util';

@Injectable({
  providedIn: 'root'
})
export class EmployeeMasterService {
    baseUrl: string = ""; UserId: string = ""; EntityId: string = "";
    constructor(private _http: HttpClient, @Inject('BASE_URL') myAppUrl: string) {
        //this.baseUrl = myAppUrl;
    this.baseUrl = "http://localhost:49512/";
    }
   
    BindDesignation(): Observable<any> {
        let item = JSON.parse(sessionStorage.getItem('User'));
        this.UserId = item.UserId;
        this.EntityId = item.ReferenceId;

        return this._http.get<any>(this.baseUrl + 'api/Employee/BindDesignation/' + this.UserId + '/' + this.EntityId);

    } 

    getEmployees(): Observable<any> {

        let item = JSON.parse(sessionStorage.getItem('User'));
        this.UserId = item.UserId;
        this.EntityId = item.ReferenceId;
        return this._http.get<any>(this.baseUrl + 'api/Employee/Index/' + this.UserId + '/' + this.EntityId);
    }
    SaveEmployee(em: any): Observable<Employee> {
        const body = em;
        const headers = new HttpHeaders().set('content-type', 'application/json');
        let item = JSON.parse(sessionStorage.getItem('User'));
        this.UserId = item.UserId;
        this.EntityId = item.ReferenceId;
        return this._http.post<Employee>(this.baseUrl + 'api/Employee/Create/' + this.UserId + '/' + this.EntityId, body, {
            headers
        });
    }

    //DeleteDocument(em): Observable<Employee> {
    //    return this._http.delete<Employee>(this.baseUrl + 'api/Employee/Delete/' + em);
    //}

    UpdateEmployee(em: any, EmpId): Observable<Employee> {
        const body = em;
        let item = JSON.parse(sessionStorage.getItem('User'));
        this.UserId = item.UserId;
        this.EntityId = item.ReferenceId;
        const headers = new HttpHeaders().set('content-type', 'application/json');
        return this._http.post<Employee>(this.baseUrl + 'api/Employee/Edit/' + this.UserId + '/' + this.EntityId + '/' + EmpId, body, {
            headers
        });
    }


    errorHandler(error: Response) {
        console.log(error);
        return Observable.throw(error);
    }

}


