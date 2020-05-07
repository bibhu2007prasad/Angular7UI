import { Component, OnInit } from '@angular/core';

import { FormsModule, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


import { BusinessSegmentService } from 'ClientApp/app/Services/business-segment.service';
import { UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BusinessSegment } from '../../models/BusinessSegment/businessSegment';


@Component({
  selector: 'app-business-segment-master',
  templateUrl: './business-segment-master.component.html',
  styleUrls: ['./business-segment-master.component.css']
})
export class BusinessSegmentMasterComponent implements OnInit {

  BusinessSegmentFormGroup: FormGroup; businessSegment: BusinessSegment; Emplist = []; buttonDisabledReset: boolean = false; /*buttonDisabledDelete: boolean = true;*/ submitted = false; sucess = false; Show = true;
  Temp: number = 1; BusinessSegmentID: number = 0; loading: boolean = false;
  message: string;
  setClickedRow: Function;
//   games: [{
//       DocumentCode: string,
//       DocumentName: string,
//       DocumentTypeid: string
//   }];
  constructor(private formbulider: FormBuilder, private _businessSegmentService: BusinessSegmentService) {

     
      this.businessSegment = new BusinessSegment();
      this.businessSegment.dataList = [];
  }

  ngOnInit() {
      // debugger;
      this.BusinessSegmentFormGroup = this.formbulider.group({
        BusinessSegmentCode: ['', [Validators.required]],
        BusinessSegmentName: ['', [Validators.required]],
        BusinessSegmentDesc: ['', [Validators.required]],
        IsActive: [false],

      });
      this.setClickedRow = function (index) {
          this.selectedRow = index;
      }
      // this.AllEmployee();
      debugger;
      this.loadAllBusinessSegments();
  }

 
  isFieldValid(field: string) {
      return !this.BusinessSegmentFormGroup.get(field).valid && this.BusinessSegmentFormGroup.get(field).touched;
  }
  displayFieldCss(field: string) {
      return {
          'validate': this.isFieldValid(field),
      };
  }
  loadAllBusinessSegments() {
    debugger;
      this.loading = true;
      var currentContext = this;
      this._businessSegmentService.getBusinessSegments().
          subscribe((data) => {
              currentContext.businessSegment.dataList = data.Table;
          });
      // console.log(sessionStorage.getItem('ID'));
      this.loading = false;
  }
 
  ResetBusinessSegment() {
      this.BusinessSegmentFormGroup.reset();
      
      this.buttonDisabledReset = false;
      //this.buttonDisabledDelete = true
      this.submitted = false;
      this.sucess = false;
      this.Show = true;
      this.Temp = 1;
      this.BusinessSegmentID = 0;
      this.loading = false;
      this.message = null;
     // this.BindDesignations();
  }
  SaveBusinessSegment() {
      //debugger;
      this._businessSegmentService.SaveBusinessSegment(JSON.stringify(this.BusinessSegmentFormGroup.value)).subscribe(
          (data) => {
              this.businessSegment = data;
              if (this.businessSegment.Flag = 1) {
                  sessionStorage.setItem('ID', this.businessSegment.Flag.toString());
                  this.message = 'Record saved Successfully';
                  alert(this.message);
              }
              else {
                  this.message = 'Invalid Credential';
                  alert(this.message);
              }
              //this.BusinessSegmentFormGroup.reset();
              //this.loadAllDocuments();
              this.ResetBusinessSegment();
              this.loadAllBusinessSegments()
          }
      )
  }
  onRowClicked(data: any) {
      const Currentrowid = this.BusinessSegmentFormGroup.value;
      this.BusinessSegmentID = data.BusinessSegmentID;
      this.BusinessSegmentFormGroup.controls['BusinessSegmentCode'].setValue(data.BusinessSegmentCode);
      this.BusinessSegmentFormGroup.controls['BusinessSegmentName'].setValue(data.BusinessSegmentName);
      this.BusinessSegmentFormGroup.controls['BusinessSegmentDesc'].setValue(data.BusinessSegmentDesc);
    
      this.BusinessSegmentFormGroup.controls['IsActive'].setValue((data.IsActive == 'Active' ? true:false));

      //this.buttonDisabledDelete = false;
      this.buttonDisabledReset = false;
      this.Temp = 2;
  }
  //DeleteDesignation() {
  //    this._settlemetnService.DeleteDocument(this.Userid).subscribe(() => {
  //        if (this.employee.Flag = 1) {
  //            this.message = 'Record deleted Successfully';
  //            alert(this.message);
  //            this.loadAllDocuments();
  //            this.BusinessSegmentFormGroup.reset();
  //            this.buttonDisabledDelete = true;
  //            this.buttonDisabledReset = false;
  //        }
  //        else {
  //            this.message = 'Invalid Credential';
  //            alert(this.message);
  //        }
  //    });
  //}
  UpdateBusinessSegment() {
      this._businessSegmentService.UpdateBusinessSegment(JSON.stringify(this.BusinessSegmentFormGroup.value), this.BusinessSegmentID).subscribe(
          (data) => {
              if (this.businessSegment.Flag = 1) {
                  this.message = 'Record updated Successfully';
                  alert(this.message);
                  //this.buttonDisabledDelete = true;
                  this.buttonDisabledReset = false;
              }
              else {
                  this.message = 'Invalid Credential';
                  alert(this.message);
              }
              this.businessSegment = data;
              this.Emplist = this.businessSegment.dataList;
              //this.BusinessSegmentFormGroup.reset();
              this.ResetBusinessSegment();
              this.loadAllBusinessSegments();
          }
      )
  }
  onSubmit() {
      debugger;
      //alert('OnSubmi Clicked');
      this.submitted = true;
      if (this.BusinessSegmentFormGroup.valid) {
          //this.sucess=true;
          const datat = this.BusinessSegmentFormGroup.value;
          
          if (this.Temp == 1) {
              this.SaveBusinessSegment();
          }
          else {
              this.UpdateBusinessSegment();
          }
      } else {
          this.validateAllFormFields(this.BusinessSegmentFormGroup);
      }
  }
  validateAllFormFields(formGroup: FormGroup) {
      Object.keys(formGroup.controls).forEach(field => {
          const control = formGroup.get(field);
          if (control instanceof FormControl) {
              control.markAsTouched({ onlySelf: true });
          } else if (control instanceof FormGroup) {
              this.validateAllFormFields(control);
          }
      });
  }

}
