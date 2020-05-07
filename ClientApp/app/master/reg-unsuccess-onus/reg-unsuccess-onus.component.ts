import { Component, OnInit, Inject } from '@angular/core';
import { FormsModule,FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HeaderGridOnUs } from '../../Models/MandateRegInWordRegSuccess/headerGridOnUs';
import { DetailGridOnUs } from '../../Models/MandateRegInWordRegSuccess/detailsGridOnUs';


import { RegSucessOnUsService } from 'ClientApp/app/Services/reg-sucess-on-us.service';
import { UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-reg-unsuccess-onus',
  templateUrl: './reg-unsuccess-onus.component.html',
  styleUrls: ['./reg-unsuccess-onus.component.css']
})
export class RegUnsuccessOnusComponent implements OnInit {
  showModal: boolean;
  isRegSuccess: boolean;
  isRegUnSuccess: boolean;
  isBackDisable:boolean;

  headerGrid: HeaderGridOnUs; detailGrid: DetailGridOnUs; Emplist = []; buttonDisabledReset: boolean = false;buttonDisabledDelete: boolean = true; submitted = false; sucess = false; Show = true;
  Temp: number = 1; Userid: number = 0;lotNo:string; loading: boolean = false;UserId:string;EntityId:string;Status:string;
  message: string;
  today: Date;
  setClickedRow: Function;
  // games: [{
  //     LinkSetUpID: string,
  //     LinkSetUpName: string,
  //     LinkSetUpDate: string
  // }];
  constructor(private formbulider: FormBuilder, private _regSuccessServiceOnUs: RegSucessOnUsService) {
     
    this.headerGrid = new HeaderGridOnUs();
    this.headerGrid.dataList = [];

    this.detailGrid = new DetailGridOnUs();
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
        this.Status="2";
    this._regSuccessServiceOnUs.GetAllHeader(this.UserId,this.EntityId,this.Status).
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
  this.Status="2";
  this._regSuccessServiceOnUs.GetAllDetails(this.UserId,this.EntityId,this.Status,lotNo).
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
