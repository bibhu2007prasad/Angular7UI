import { Component, OnInit, Inject } from '@angular/core';
import { FormsModule,FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HistoricalMandateOnUsClass } from '../../Models/MandateRegInWordHistoricalMandate/HistoricalMandateOnUsClass';
import { Corporate } from '../../Models/MandateRegInWordHistoricalMandate/CorporateInWord/corporate';

import { HistoricalMandateOnUsService } from 'ClientApp/app/Services/historical-mandate-on-us.service';
import { UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-historical-mandate-onus',
  templateUrl: './historical-mandate-onus.component.html',
  styleUrls: ['./historical-mandate-onus.component.css']
})
export class HistoricalMandateOnusComponent implements OnInit {

  HistoricalOnUsMandateForm: FormGroup; HeaderArray;corporate:Corporate;
  BindAllData: HistoricalMandateOnUsClass; TotalCount = 0; dataArray: Array<HistoricalMandateOnUsClass> = [];
  Preloader: boolean = true;EntityId:string;ReferenceNo:string;ActivityName:string;loading: boolean = false;

  constructor(private HMService: HistoricalMandateOnUsService, private formBuilder: FormBuilder) {

    this.corporate = new Corporate();
      this.corporate.dataList = [];


  }
   CurrentDate = new Date();
  ngOnInit() {
      this.HistoricalOnUsMandateForm = this.formBuilder.group({
          FromDate: [''],
          ToDate: [''],
          EntityId: [0],
          ReferenceNo: [''],
          ActivityName: ['']
         
      });
      debugger;
      this.Preloader = false;
      this.loadAllCoporates();
  }
  loadAllCoporates() {
    debugger;
    this.loading = true;
    var currentContext = this;
    this.HMService.getCoporates().
        subscribe((data) => {
            currentContext.corporate.dataList = data.Table;
        });
    // console.log(sessionStorage.getItem('ID'));
    this.loading = false;
}

  SearchFunction(FromDate, ToDate) {
    
    debugger;
    const datat = this.HistoricalOnUsMandateForm.value;
      this.Preloader = true;
      let item = JSON.parse(sessionStorage.getItem('User'));
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
          this.HMService.BindGridData(FromDate, ToDate, item.UserId,this.EntityId,this.ReferenceNo,this.ActivityName).subscribe(
              (data) => {
                  this.Preloader = false;
                  this.BindAllData = data;
                  let json = JSON.stringify(this.BindAllData);
                  var CountRecordArray = typeof json != 'object' ? JSON.parse(json) : json;
                  this.TotalCount = CountRecordArray.length;
              });
         
      }
  }
  doubleClick(data: any) {
      this.dataArray.push(data);
      let json = JSON.stringify(data);
      alert(json);
      console.log(data.MandateFreshId);

  }

  ConvertToCSV(objArray) {
      this.HeaderArray = {
        ParentBankName: "Parent Bank Name", CorporateName: "Corporate Name", ActivityName: "Activity Name",
          MandateStatus: "Mandate Status", SendToBankDate: "Send To Bank Date", MandateFreshId: "Mandate ID", mandateMode: "mandate Mode",
          AutoRejectReason: "AutoRejectReason", updatedon: "updatedon", username: "username", UpdateBy: "UpdateBy", Enach: "Enach",
          IsMobileData: "IsMobileData", RejectedReason: "RejectedReason", REJECTED: "REJECTED", CreatedOn: "CreatedOn", is_enach_live: "is_enach_live",
          IsScan: "IsScan", JPGPath: "JPGPath", TIPPath: "TIPPath", IsPrint: "IsPrint", mandateid: "mandateid", status: "status", Amount: "Amount",
          Code: "Code", BankName: "BankName", DateOnMandate: "DateOnMandate", AcNo: "AcNo", Refrence1: "Refrence1", AcceptRefNo: "AcceptRefNo",
          NPCIErrorDesc: "NPCIErrorDesc", FromDate: "FromDate", Customer1: "Customer1", debittype: "debittype", Frequency: "Frequency", Monthly: "Monthly",
          ToDebit: "ToDebit", NPCIMsgId: "NPCIMsgId", MSGId: "MSGId", UMRN: "UMRN", AggregatorValue: "AggregatorValue", Amount_Numeric: "Amount_Numeric",
          SponsorBankCode: "SponsorBankCode", PhoneNumber: "PhoneNumber", EmailId: "EmailId", EmandateType: "EmandateType", ActivityId: "ActivityId",
          Refrence2: "Refrence2"
      }
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

          if (i == 0) {
              for (var index in this.HeaderArray) {
                  if (line != '') line += ','

                  line += this.HeaderArray[index];
              }
              str += line + '\r\n';
          }

          var line = '';
          for (var index in array[i]) {
              if (line != '') line += ','

              line += array[i][index];
          }
          str += line + '\r\n';
      }
      return str;
  }
  Search(ReferenceNo){
      debugger;
    console.log(ReferenceNo)
    alert(ReferenceNo);
  }
  download() {
      if (this.TotalCount > 0) {
          var csvData = this.ConvertToCSV(JSON.stringify(this.BindAllData));
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
      else { }
  }
  
}
