import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LinkSetUp } from 'ClientApp/app/Models/LinkSetUps/linkSetUp';
import { IconNameMaster } from 'ClientApp/app/Models/LinkSetUps/iconNameMaster';
import { ParentMenuMaster } from 'ClientApp/app/Models/LinkSetUps/parentMenuMaster';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { error } from 'util';

@Injectable({
  providedIn: 'root'
})
export class LinkSetupService {

  baseUrl: string = "";UserId:string;
  constructor(private _http: HttpClient, @Inject('BASE_URL') myAppUrl: string) {
      //this.baseUrl = myAppUrl;
  this.baseUrl = "http://localhost:49512/";
  }

  getLinkSetUps(): Observable<any> {
      return this._http.get<any>(this.baseUrl + 'api/LinkSetUp/Index');
  }
  getIconNames(): Observable<any> {
    return this._http.get<any>(this.baseUrl + 'api/LinkSetUp/BindIconName');
  }
getParentMenus(): Observable<any> {
  return this._http.get<any>(this.baseUrl + 'api/LinkSetUp/BindParentMenu');
}
  SaveLinkSetUp(em: any): Observable<LinkSetUp> {
      const body = em;
      let item = JSON.parse(sessionStorage.getItem('User'));
      this.UserId = item.UserId;
      const headers = new HttpHeaders().set('content-type', 'application/json');
      return this._http.post<LinkSetUp>(this.baseUrl + 'api/LinkSetUp/Create/' + this.UserId, body, {
          headers
      });
  }

  DeleteParentMenu(em): Observable<LinkSetUp> {
    let item = JSON.parse(sessionStorage.getItem('User'));
        this.UserId = item.UserId;
        
      return this._http.delete<LinkSetUp>(this.baseUrl + 'api/LinkSetUp/Delete/' + em+ '/' + this.UserId);
  }

  UpdateLinkSetUp(em: any, linkSetUpID): Observable<LinkSetUp> {
      const body = em;
      let item = JSON.parse(sessionStorage.getItem('User'));
        this.UserId = item.UserId;
      const headers = new HttpHeaders().set('content-type', 'application/json');
      return this._http.post<LinkSetUp>(this.baseUrl + 'api/LinkSetUp/Edit/' + linkSetUpID +'/' + this.UserId, body, {
          headers
      });
  }

  SaveMasterLinkSetUp(em: any): Observable<LinkSetUp> {
    const body = em;
    let item = JSON.parse(sessionStorage.getItem('User'));
    this.UserId = item.UserId;
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this._http.post<LinkSetUp>(this.baseUrl + 'api/LinkSetUp/CreateMaster/' + this.UserId, body, {
        headers
    });
}



UpdateMasterLinkSetUp(em: any, linkSetUpID): Observable<LinkSetUp> {
    const body = em;
    let item = JSON.parse(sessionStorage.getItem('User'));
      this.UserId = item.UserId;
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this._http.post<LinkSetUp>(this.baseUrl + 'api/LinkSetUp/EditMaster/' + linkSetUpID +'/' + this.UserId, body, {
        headers
    });
}


  errorHandler(error: Response) {
      console.log(error);
      return Observable.throw(error);
  }

}


