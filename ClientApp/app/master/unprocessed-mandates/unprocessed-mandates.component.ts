import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UnderProcessMandateOutWard } from '../../Models/UnderProcessMandateOutWard/underProcessMandateOutWard';
import { Corporate } from '../../Models/UnderProcessMandateOutWard/corporate';
import { SponserBank } from '../../Models/UnderProcessMandateOutWard/sponserBank';
import { DownloadOldMandateService } from '../../Services/download-old-mandate.service';
import { forEach } from '@angular/router/src/utils/collection';
import { FormsModule,FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-unprocessed-mandates',
  templateUrl: './unprocessed-mandates.component.html',
  styleUrls: ['./unprocessed-mandates.component.css']
})
export class UnprocessedMandatesComponent implements OnInit {
  UnderProcessMandateForm: FormGroup; HeaderArray;corporate:Corporate; sponserBank:SponserBank;
  BindAllData: UnderProcessMandateOutWard; TotalCount = 0; dataArray: Array<UnderProcessMandateOutWard> = [];
  Preloader: boolean = true;sponsorbankcode:string;EntityId:string;ReferenceNo:string;ActivityName:string;loading: boolean = false;



  //loading: boolean = false;
  checkFlag: number = 0;
  Ischecked: number = 0;
  IsMandateID: string;
  Isallcheck: number = 0;
  SelectionStatusOfMutants = []
  selectMandateId = [];
  i: any;
  SponserBankCode: any;
  length: any;
  ZipDownloadArray: Array<UnderProcessMandateOutWard> = [];
  constructor(public myservice: DownloadOldMandateService, private formBuilder: FormBuilder) { 
    this.corporate = new Corporate();
      this.corporate.dataList = [];

      this.sponserBank = new SponserBank();
      this.sponserBank.dataList = [];

      this.BindAllData = new UnderProcessMandateOutWard();
      this.BindAllData.dataList = [];
  }
  showModal: boolean;

  show() {
      this.showModal = true;
  }
  hide() {
      this.showModal = false;
  }
  CurrentDate = new Date();
  ngOnInit() {
    this.UnderProcessMandateForm = this.formBuilder.group({
      FromDate: [''],
      ToDate: [''],
      EntityId: [0],
      sponsorbankcode: [0],
      ReferenceNo: [''],
      ActivityName: ['']
     
  });
  debugger;
  // this.Preloader = false;
  this.loadAllCoporates();
  this.loadAllBanks();
  }
 
  tabledata;
  toggleSelect = function (event) {   
    debugger;  
      this.all = event.target.checked;
      this.tabledata.forEach(function (item) {
          item.selected = event.target.checked;
      });
      this.checkFlag = 1;
      if (event.target.checked) {
          this.Ischecked = 1;
      }
      else {
          this.Ischecked = 0;
      }
  }   
  onChange(event, item) {
    debugger;
      this.checkFlag = 0;
      var CheckedCount = 0, UncheckedCount = 0;
      if (event.target.checked) {
          this.SelectionStatusOfMutants.push(item);
          this.selectMandateId.push(item.mandateid);
          this.Ischecked = 1;
          CheckedCount++;
      }
      else {
        alert('please select mandate ');
        this.SelectionStatusOfMutants.pop();
        UncheckedCount++;
        if (UncheckedCount == CheckedCount) {
            this.Ischecked = 0;
        }
      }
  } 
  loadAllCoporates() {
    debugger;
    this.loading = true;
    var currentContext = this;
    this.myservice.getCoporates().
        subscribe((data) => {
          currentContext.corporate.dataList = data.Table;
        });
    // console.log(sessionStorage.getItem('ID'));
    this.loading = false;
}

loadAllBanks() {
  debugger;
  this.loading = true;
  var currentContext = this;
  this.myservice.getBank().
      subscribe((data) => {
        currentContext.sponserBank.dataList = data.Table;
      });
  // console.log(sessionStorage.getItem('ID'));
  this.loading = false;
}

SearchFunction(FromDate, ToDate) {
    
  debugger;
  
  const datat = this.UnderProcessMandateForm.value;
    this.Preloader = true;
    let item = JSON.parse(sessionStorage.getItem('User'));
    if(datat.sponsorbankcode==0)
    {
      this.sponsorbankcode="0";
    }
    else
    {
      this.sponsorbankcode=datat.sponsorbankcode;
    }
    if(datat.EntityId==0)
    {
      this.EntityId="0";
    }
    else
    {
      this.EntityId=datat.EntityId;
    }

    if(datat.ReferenceNo=="")
    {
      this.ReferenceNo="0";
    }
    else
    {
      this.ReferenceNo=datat.ReferenceNo;
    }
    if(datat.ActivityName=="")
    {
      this.ActivityName="0";
    }
    else
    {
      this.ActivityName=datat.ActivityName;
    }
  //   var ReferenceNo="ABC-300";
  //   var ActivityName="5053327220142429";
  //   var EntityID="1";
    if (FromDate != "" && ToDate != "") {
        this.myservice.BindGridData(FromDate, ToDate, item.UserId,this.sponsorbankcode,this.EntityId,this.ReferenceNo,this.ActivityName).subscribe(
            (data) => {
                this.Preloader = false;
                this.BindAllData.dataList = data;
                this.tabledata = data;
                let json = JSON.stringify(this.BindAllData.dataList);
                var CountRecordArray = typeof json != 'object' ? JSON.parse(json) : json;
                this.TotalCount = CountRecordArray.length;
            });
       
    }
}

  ConvertToCSV(objArray) {     
      var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
      var str = '';
      var row = "";

      for (var index in objArray[0]) {
          //Now convert each value to string and comma-separated
          row += index + ',';
      }
      row = row.slice(0, -1);
      //append Label row with line break
      str += row + '\r\n';
      for (var i = 0; i < array.length; i++) {
          var line = '';
          for (var index in array[i]) {
              if (line != '') line += ','

              line += array[i][index];
          }
          str += line + '\r\n';
      }
      return str;
  }
  downloadExcel() {     
      if (this.Ischecked == 1) {
          if (this.checkFlag == 0) {
              var csvData = this.ConvertToCSV(JSON.stringify(this.SelectionStatusOfMutants));
          }
          else {
              var csvData = this.ConvertToCSV(JSON.stringify(this.tabledata));

          }
     // var csvData = this.ConvertToCSV(JSON.stringify(this.list));
      var a = document.createElement("a");
      a.setAttribute('style', 'display:none;');
      document.body.appendChild(a);
      var blob = new Blob([csvData], { type: 'text/csv' });
      var url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = 'User_Results.csv';/* your file name*/
      a.click();
          return 'success';
      }
      else {
          alert('checkbox not selected');
      }
  }
  
  downloadScannedMandate() {
    debugger;
      this.ZipDownloadArray = [];
      if (this.checkFlag == 0) {
         
          this.ZipDownloadArray = this.SelectionStatusOfMutants;
      }
      else {
          this.ZipDownloadArray = this.tabledata
      }
      if (this.ZipDownloadArray.length == 0) {
          alert("please select mandate");
      }
      else {
          this.getZipFile(JSON.stringify(this.ZipDownloadArray));
      }
  }


  getZipFile(data: any) {
    debugger;
      var a: any = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      var blob = new Blob([data], { type: 'application/zip' });
      var url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = "test.zip";
      a.click();
      window.URL.revokeObjectURL(url);
  }
}
