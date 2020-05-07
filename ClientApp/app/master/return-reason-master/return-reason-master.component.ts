import { Component, OnInit } from '@angular/core';

import { FormsModule, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


import { ReturnRegionService } from 'ClientApp/app/Services/return-region.service';
import { UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ReturnRegion } from '../../models/ReturnRegion/returnRegion';

@Component({
  selector: 'app-return-reason-master',
  templateUrl: './return-reason-master.component.html',
  styleUrls: ['./return-reason-master.component.css']
})
export class ReturnReasonMasterComponent implements OnInit {

  ReturnRegionFormGroup: FormGroup; returnRegion: ReturnRegion; Emplist = []; buttonDisabledReset: boolean = false; /*buttonDisabledDelete: boolean = true;*/ submitted = false; sucess = false; Show = true;
  Temp: number = 1; ReasonID: number = 0; loading: boolean = false;
  message: string;
  setClickedRow: Function;
//   games: [{
//       DocumentCode: string,
//       DocumentName: string,
//       DocumentTypeid: string
//   }];
  constructor(private formbulider: FormBuilder, private _returnRegionService: ReturnRegionService) {

     
      this.returnRegion = new ReturnRegion();
      this.returnRegion.dataList = [];
  }

  ngOnInit() {
      // debugger;
      this.ReturnRegionFormGroup = this.formbulider.group({
        ReasonCode: ['', [Validators.required]],
        ReturnReason: ['', [Validators.required]],
        Description: ['', [Validators.required]],
        IsActive: [false],

      });
      this.setClickedRow = function (index) {
          this.selectedRow = index;
      }
      // this.AllEmployee();
      debugger;
      this.loadAllReturnRegions();
  }

 
  isFieldValid(field: string) {
      return !this.ReturnRegionFormGroup.get(field).valid && this.ReturnRegionFormGroup.get(field).touched;
  }
  displayFieldCss(field: string) {
      return {
          'validate': this.isFieldValid(field),
      };
  }
  loadAllReturnRegions() {
    debugger;
      this.loading = true;
      var currentContext = this;
      this._returnRegionService.getReturnRegions().
          subscribe((data) => {
              currentContext.returnRegion.dataList = data.Table;
          });
      // console.log(sessionStorage.getItem('ID'));
      this.loading = false;
  }
 
  ResetReturnRegion() {
      this.ReturnRegionFormGroup.reset();
      
      this.buttonDisabledReset = false;
      //this.buttonDisabledDelete = true
      this.submitted = false;
      this.sucess = false;
      this.Show = true;
      this.Temp = 1;
      this.ReasonID = 0;
      this.loading = false;
      this.message = null;
     // this.BindDesignations();
  }
  SaveReturnRegion() {
      //debugger;
      this._returnRegionService.SaveReturnRegion(JSON.stringify(this.ReturnRegionFormGroup.value)).subscribe(
          (data) => {
              this.returnRegion = data;
              if (this.returnRegion.Flag = 1) {
                  sessionStorage.setItem('ID', this.returnRegion.Flag.toString());
                  this.message = 'Record saved Successfully';
                  alert(this.message);
              }
              else {
                  this.message = 'Invalid Credential';
                  alert(this.message);
              }
              //this.ReturnRegionFormGroup.reset();
              //this.loadAllDocuments();
              this.ResetReturnRegion();
              this.loadAllReturnRegions()
          }
      )
  }
  onRowClicked(data: any) {
      debugger;
      const Currentrowid = this.ReturnRegionFormGroup.value;
      this.ReasonID = data.ReasonID;
      this.ReturnRegionFormGroup.controls['ReasonCode'].setValue(data.ReasonCode);
      this.ReturnRegionFormGroup.controls['ReturnReason'].setValue(data.ReturnReason);
      this.ReturnRegionFormGroup.controls['Description'].setValue(data.Description);
    
      this.ReturnRegionFormGroup.controls['IsActive'].setValue((data.IsActive == 'True' ? true:false));

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
  //            this.ReturnRegionFormGroup.reset();
  //            this.buttonDisabledDelete = true;
  //            this.buttonDisabledReset = false;
  //        }
  //        else {
  //            this.message = 'Invalid Credential';
  //            alert(this.message);
  //        }
  //    });
  //}
  UpdateReturnRegion() {
      this._returnRegionService.UpdateReturnRegion(JSON.stringify(this.ReturnRegionFormGroup.value), this.ReasonID).subscribe(
          (data) => {
              if (this.returnRegion.Flag = 1) {
                  this.message = 'Record updated Successfully';
                  alert(this.message);
                  //this.buttonDisabledDelete = true;
                  this.buttonDisabledReset = false;
              }
              else {
                  this.message = 'Invalid Credential';
                  alert(this.message);
              }
              this.returnRegion = data;
              this.Emplist = this.returnRegion.dataList;
              //this.ReturnRegionFormGroup.reset();
              this.ResetReturnRegion();
              this.loadAllReturnRegions();
          }
      )
  }
  onSubmit() {
      debugger;
      //alert('OnSubmi Clicked');
      this.submitted = true;
      if (this.ReturnRegionFormGroup.valid) {
          //this.sucess=true;
          const datat = this.ReturnRegionFormGroup.value;
          
          if (this.Temp == 1) {
              this.SaveReturnRegion();
          }
          else {
              this.UpdateReturnRegion();
          }
      } else {
          this.validateAllFormFields(this.ReturnRegionFormGroup);
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
