import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AllUMRN } from 'ClientApp/app/Models/AllUMRN/allUMRN';
import { LegacyDetails } from 'ClientApp/app/Models/AllUMRN/legacyDetails';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { error } from 'util';

@Injectable({
  providedIn: 'root'
})
export class AllUMRNService {

  baseUrl: string = ""; UserId: string = ""; EntityId: string = ""; topVal:string="50";
  constructor(private _http: HttpClient, @Inject('BASE_URL') myAppUrl: string) {
    //this.baseUrl = myAppUrl;
    this.baseUrl = "http://localhost:49512/";
  }

  getAllUMRNsSearch(AllUMRNID,CustomerName,Reference): Observable<any> {

    let item = JSON.parse(sessionStorage.getItem('User'));
   // this.UserId = item.UserId;
    this.EntityId = item.ReferenceId;
    return this._http.get<any>(this.baseUrl + 'api/AllUMRN/BindSearch/' + AllUMRNID + '/' + CustomerName+ '/'+Reference + '/' + this.EntityId);
}
  getAllUMRNsPresentmentHistory(AllUMRNID): Observable<any> {

    let item = JSON.parse(sessionStorage.getItem('User'));
   // this.UserId = item.UserId;
    this.EntityId = item.ReferenceId;
    return this._http.get<any>(this.baseUrl + 'api/AllUMRN/BindGridDetails/' + AllUMRNID + '/' + this.EntityId);
    
}
  getAllUMRNs(): Observable<any> {

      let item = JSON.parse(sessionStorage.getItem('User'));
      this.UserId = item.UserId;
      this.EntityId = item.ReferenceId;
      this.topVal="50";
      return this._http.get<any>(this.baseUrl + 'api/AllUMRN/Index/' + this.topVal + '/' + this.EntityId);
  }
  SaveUMRN(em: any): Observable<LegacyDetails> {
    const body = em;
    const headers = new HttpHeaders().set('content-type', 'application/json');
    let item = JSON.parse(sessionStorage.getItem('User'));
    this.UserId = item.UserId;
    this.EntityId = item.ReferenceId;
    return this._http.post<LegacyDetails>(this.baseUrl + 'api/AllUMRN/Create/' + this.UserId + '/' + this.EntityId, body, {
        headers
    });
}

  errorHandler(error: Response) {
      console.log(error);
      return Observable.throw(error);
  }

}


