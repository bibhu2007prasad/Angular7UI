import { Component, OnInit, Inject } from '@angular/core';
import { FormsModule,FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HeaderGrid } from '../../Models/MandateRegOutWordRegSuccess/headerGrid';
import { DetailGrid } from '../../Models/MandateRegOutWordRegSuccess/detailGrid';


import { RegSuccessService } from 'ClientApp/app/Services/reg-success.service';
import { UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-reg-success',
  templateUrl: './reg-success.component.html',
  styleUrls: ['./reg-success.component.css']
})
export class RegSuccessComponent implements OnInit {
  showModal: boolean;
  isRegSuccess: boolean;
  isRegUnSuccess: boolean;
  isBackDisable:boolean;

  headerGrid: HeaderGrid; detailGrid: DetailGrid; Emplist = []; buttonDisabledReset: boolean = false;buttonDisabledDelete: boolean = true; submitted = false; sucess = false; Show = true;
  Temp: number = 1; Userid: number = 0;lotNo:string; loading: boolean = false;UserId:string;EntityId:string;Status:string;
  message: string;
  today: Date;
  setClickedRow: Function;
  // games: [{
  //     LinkSetUpID: string,
  //     LinkSetUpName: string,
  //     LinkSetUpDate: string
  // }];
  constructor(private formbulider: FormBuilder, private _regSuccessService: RegSuccessService) {
     
    this.headerGrid = new HeaderGrid();
    this.headerGrid.dataList = [];

    this.detailGrid = new DetailGrid();
    this.detailGrid.dataList = [];
  }
ngOnInit() {
  debugger;
  this.isRegSuccess=true;
  this.isRegUnSuccess=false;
 
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
  this.isRegSuccess=true;this.isRegUnSuccess=false;}


loadAllHeader() {
    this.loading = true;
    var currentContext = this;
    let item = JSON.parse(sessionStorage.getItem('User'));
        this.UserId = item.UserId;
        this.EntityId = item.ReferenceId;
        this.Status="1";
    this._regSuccessService.GetAllHeader(this.UserId,this.EntityId,this.Status).
        subscribe((data) => {
            currentContext.headerGrid.dataList = data.Table;
        });
    // console.log(sessionStorage.getItem('ID'));
    this.loading = false;
}

loadAllDetails(lotNo) {
  this.loading = true;
  var currentContext = this;
  let item = JSON.parse(sessionStorage.getItem('User'));
  this.UserId = item.UserId;
  this.EntityId = item.ReferenceId;
  this.Status="1";
  this._regSuccessService.GetAllDetails(this.UserId,this.EntityId,this.Status,lotNo).
      subscribe((data) => {
          currentContext.detailGrid.dataList = data.Table;
      });
  // console.log(sessionStorage.getItem('ID'));
  this.loading = false;
}

onRowClicked(data: any) {
    debugger;
  this.isRegSuccess=false;this.isRegUnSuccess=true;
//  const Currentrowid = this.MasterLinkSetUpFormGroup.value;
  this.lotNo = data.LOTNO;
  this.Temp = 2;
 
  this.loadAllDetails(this.lotNo)
}


}
