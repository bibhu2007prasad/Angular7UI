import { Component, OnInit, Inject } from '@angular/core';
import { FormsModule,FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MandateDetails } from '../../Models/ReCreateMandate/MandateDetails';
import { RecreateMandateService } from 'ClientApp/app/Services/recreate-mandate.service';
import { UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-re-create-mandate',
  templateUrl: './re-create-mandate.component.html',
  styleUrls: ['./re-create-mandate.component.css']
})
export class ReCreateMandateComponent implements OnInit {

  ReCreateMandateForm: FormGroup; HeaderArray;
  BindAllData: MandateDetails; TotalCount = 0;  dataArray: Array<MandateDetails> = [];
  Preloader: boolean = true;MandateId:string;ReferenceNo:string;ActivityName:string;loading: boolean = false;

  constructor(private HMService: RecreateMandateService, private formBuilder: FormBuilder) {
    this.BindAllData = new MandateDetails();
    this.BindAllData.dataList = [];
  }
  CurrentDate = new Date();
  ngOnInit() {
      this.ReCreateMandateForm = this.formBuilder.group({
          FromDate: [''],
          ToDate: [''],
          MandateId: [''],
          ReferenceNo: [''],
          ActivityName: ['']
         
      });
      debugger;
      this.Preloader = false;
//this.SearchFunction(ReCreateMandateForm.value.FromDate, ReCreateMandateForm.value.FromDate);
     
  }
  SearchIndiVisual(NewMandateId){
    debugger;
    var t=NewMandateId;
  }
  Recreate(MandateId){
    debugger;
    var t=MandateId;

  }
  SearchFunction(FromDate, ToDate) {
    
    debugger;
    const datat = this.ReCreateMandateForm.value;
      this.Preloader = true;
      let item = JSON.parse(sessionStorage.getItem('User'));
      if(datat.MandateId==0)
      {
        this.MandateId="0";
      }
      else
      {
        this.MandateId=datat.MandateId;
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
          this.HMService.BindGridData(FromDate, ToDate, item.UserId,item.ReferenceId,this.MandateId,this.ReferenceNo,this.ActivityName).subscribe(
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


  Search(ReferenceNo){
      debugger;
    console.log(ReferenceNo)
    alert(ReferenceNo);
  }

  
}
