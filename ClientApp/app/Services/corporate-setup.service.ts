import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country } from 'ClientApp/app/Models/corporatesetup/country';
import { Bank } from 'ClientApp/app/Models/corporatesetup/bank';
import { Category } from 'ClientApp/app/Models/corporatesetup/category';
// import { AllFieldOfForm } from '../../Models/corporatesetup/allFieldOfForm';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { error } from 'util';
import { MainGrid } from 'ClientApp/app/Models/corporatesetup/main-grid';

@Injectable({
  providedIn: 'root'
})
export class CorporateSetupService {
  baseUrl: string = "";UserId:string;EntityId:string;_EntityId:string;

  constructor(private _http: HttpClient, @Inject('BASE_URL') myAppUrl: string) {
     // this.baseUrl = myAppUrl;
      this.baseUrl = "http://localhost:49512/";
  }

  BindUtility(): Observable<any> {
    return this._http.get<any>(this.baseUrl + 'api/CorporateSetUp/BindUtility');
}
BindCategoryWithRelated(): Observable<any> {
    return this._http.get<any>(this.baseUrl + 'api/CorporateSetUp/BindCategoryWithRelated');
}
  BindCountryAndBank(): Observable<any> {
      return this._http.get<any>(this.baseUrl + 'api/CorporateSetUp/BindCountryAndBank');
  }
  BingGrid(): Observable<any> {
    let item = JSON.parse(sessionStorage.getItem('User'));
    this.UserId = item.UserId;
    this.EntityId = item.ReferenceId;
      return this._http.get<any>(this.baseUrl + 'api/CorporateSetUp/BindGrid/' + this.UserId + '/' + this.EntityId);
  }
  EditEntity(EntityId): Observable<any> {
    let item = JSON.parse(sessionStorage.getItem('User'));
    this.UserId = item.UserId;
    this.EntityId = item.ReferenceId;
      return this._http.get<any>(this.baseUrl + 'api/CorporateSetUp/EditEntity/' +  EntityId);
  }
  UpdateData(em: any, _EntityId): Observable<any> {
    const body = em;
    // let item = JSON.parse(sessionStorage.getItem('User'));
    // this.UserId = item.UserId;
    // this.EntityId = item.ReferenceId;
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this._http.post<any>(this.baseUrl + 'api/CorporateSetUp/SaveData/' + _EntityId, body, {
        headers
    });
}
//   SaveData(em: any,dtBankCode,XmlFileName,dtcontactperson): Observable<any> {
    SaveData(em: any): Observable<any> {
      this._EntityId="0";
      const body = em;
      const headers = new HttpHeaders().set('content-type', 'application/json');
    //   return this._http.post<any>(this.baseUrl + 'api/SaveData/'+ dtBankCode+'/'+ XmlFileName+'/'+ dtcontactperson, body, {
    //       headers
    //   });
   return this._http.post<any>(this.baseUrl + 'api/CorporateSetUp/SaveData/'+ this._EntityId, body, {
          headers
      });
  }
  BindState(CountryId): Observable<any> {
      return this._http.get<any>(this.baseUrl + 'api/CorporateSetUp/BindState/'+ CountryId);
  }
  BindCity(StateId): Observable<any> {
      return this._http.get<any>(this.baseUrl + 'api/CorporateSetUp/BindCity/'+ StateId);
  }

  errorHandler(error: Response) {
      console.log(error);
      return Observable.throw(error);
  }  
}
