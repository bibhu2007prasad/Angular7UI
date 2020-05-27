import { Component, OnInit, Inject } from '@angular/core';
import { FormsModule,FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HeaderGridNachSucess} from '../../Models/NachSucess/headerGridNachSucess';
import { DetailGridNachSuccess } from '../../Models/NachSucess/detailGridNachSucess';


import { NachSucessService } from 'ClientApp/app/Services/nach-sucess.service';
import { UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-nachsuccess',
  templateUrl: './nachsuccess.component.html',
  styleUrls: ['./nachsuccess.component.css']
})
export class NachsuccessComponent implements OnInit {

  showModal: boolean;
  isParentShow: boolean;
  isChildShow: boolean;
  isBackDisable:boolean;

  headerGrid: HeaderGridNachSucess; detailGrid: DetailGridNachSuccess; Emplist = []; buttonDisabledReset: boolean = false;buttonDisabledDelete: boolean = true; submitted = false; sucess = false; Show = true;
  Temp: number = 1; Userid: number = 0;FileNo:string; loading: boolean = false;UserId:string;EntityId:string;Status:string;
  message: string;UploadID:any;
  today: Date;
  setClickedRow: Function;
  // games: [{
  //     LinkSetUpID: string,
  //     LinkSetUpName: string,
  //     LinkSetUpDate: string
  // }];
  constructor(private formbulider: FormBuilder, private _nachSucessService: NachSucessService) {
     
    this.headerGrid = new HeaderGridNachSucess();
    this.headerGrid.dataList = [];

    this.detailGrid = new DetailGridNachSuccess();
    this.detailGrid.dataList = [];
  }
ngOnInit() {
  debugger;
  this.isParentShow=true;
  this.isChildShow=false;
 
  this.isBackDisable=false;

  // this.LinkSetUpFormGroup = this.formbulider.group({
  //     LinkName: ['', [Validators.required]],
  // });
  // this.MasterLinkSetUpFormGroup = this.formbulider.group({
    
  // });
this.setClickedRow = function (index) {
    this.selectedRow = index;
}
debugger;
this.loadAllHeader();
//this.loadAllDetails();
}

hide() {
    this.showModal = false;
}

backClick() {
  debugger;
  this.isParentShow=true;this.isChildShow=false;}


loadAllHeader() {
    this.loading = true;
    var currentContext = this;
    let item = JSON.parse(sessionStorage.getItem('User'));
        this.UserId = item.UserId;
        this.EntityId = item.ReferenceId;
        this.Status="1";
    this._nachSucessService.GetAllHeader(this.UserId,this.EntityId,this.Status).
        subscribe((data) => {
            currentContext.headerGrid.dataList = data.Table;
        });
    // console.log(sessionStorage.getItem('ID'));
    this.loading = false;
}

loadAllDetails(FileNo,UploadID) {
  this.loading = true;
  var currentContext = this;
  let item = JSON.parse(sessionStorage.getItem('User'));
  this.UserId = item.UserId;
  this.EntityId = item.ReferenceId;
  this.Status="1";
  this._nachSucessService.GetAllDetails(this.UserId,this.EntityId,this.Status,FileNo,UploadID).
      subscribe((data) => {
          currentContext.detailGrid.dataList = data.Table;
      });
  // console.log(sessionStorage.getItem('ID'));
  this.loading = false;
}

onRowClicked(data: any) {
    debugger;
  this.isParentShow=false;this.isChildShow=true;
//  const Currentrowid = this.MasterLinkSetUpFormGroup.value;
  this.FileNo = data.FileNo;
  this.UploadID=data.UploadID;
  this.Temp = 2;
 
  this.loadAllDetails(this.FileNo,this.UploadID)
}


}