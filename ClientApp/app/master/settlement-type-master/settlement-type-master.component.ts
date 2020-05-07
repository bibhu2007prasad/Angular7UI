import { Component, OnInit } from '@angular/core';

import { FormsModule, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


import { SettlementtypeMasterService } from 'ClientApp/app/Services/settlementtype-master.service';
import { UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SettlementType } from '../../models/SettlementType/settlementType';

@Component({
  selector: 'app-settlement-type-master',
  templateUrl: './settlement-type-master.component.html',
  styleUrls: ['./settlement-type-master.component.css']
})
export class SettlementTypeMasterComponent implements OnInit {

  SettlementFormGroup: FormGroup; settlementType: SettlementType; Emplist = []; buttonDisabledReset: boolean = false; /*buttonDisabledDelete: boolean = true;*/ submitted = false; sucess = false; Show = true;
  Temp: number = 1; SettleMentTypeID: number = 0; loading: boolean = false;
  message: string;
  setClickedRow: Function;
//   games: [{
//       DocumentCode: string,
//       DocumentName: string,
//       DocumentTypeid: string
//   }];
  constructor(private formbulider: FormBuilder, private _settlemetnService: SettlementtypeMasterService) {

     
      this.settlementType = new SettlementType();
      this.settlementType.dataList = [];
  }

  ngOnInit() {
      // debugger;
      this.SettlementFormGroup = this.formbulider.group({
        SettlementCode: ['', [Validators.required]],
        SettlementType: ['', [Validators.required]],
        Description: ['', [Validators.required]],
        IsActive: [false],

      });
      this.setClickedRow = function (index) {
          this.selectedRow = index;
      }
      // this.AllEmployee();
      debugger;
      this.loadAllSettlementTypes();
  }

 
  isFieldValid(field: string) {
      return !this.SettlementFormGroup.get(field).valid && this.SettlementFormGroup.get(field).touched;
  }
  displayFieldCss(field: string) {
      return {
          'validate': this.isFieldValid(field),
      };
  }
  loadAllSettlementTypes() {
    debugger;
      this.loading = true;
      var currentContext = this;
      this._settlemetnService.getSettlementTypes().
          subscribe((data) => {
              currentContext.settlementType.dataList = data.Table;
          });
      // console.log(sessionStorage.getItem('ID'));
      this.loading = false;
  }
 
  ResetSettlementType() {
      this.SettlementFormGroup.reset();
      
      this.buttonDisabledReset = false;
      //this.buttonDisabledDelete = true
      this.submitted = false;
      this.sucess = false;
      this.Show = true;
      this.Temp = 1;
      this.SettleMentTypeID = 0;
      this.loading = false;
      this.message = null;
     // this.BindDesignations();
  }
  SaveSettlementType() {
      //debugger;
      this._settlemetnService.SaveSettlementType(JSON.stringify(this.SettlementFormGroup.value)).subscribe(
          (data) => {
              this.settlementType = data;
              if (this.settlementType.Flag = 1) {
                  sessionStorage.setItem('ID', this.settlementType.Flag.toString());
                  this.message = 'Record saved Successfully';
                  alert(this.message);
              }
              else {
                  this.message = 'Invalid Credential';
                  alert(this.message);
              }
              //this.SettlementFormGroup.reset();
              //this.loadAllDocuments();
              this.ResetSettlementType();
              this.loadAllSettlementTypes()
          }
      )
  }
  onRowClicked(data: any) {
      const Currentrowid = this.SettlementFormGroup.value;
      this.SettleMentTypeID = data.SettleMentTypeID;
      this.SettlementFormGroup.controls['SettlementCode'].setValue(data.SettlementCode);
      this.SettlementFormGroup.controls['SettlementType'].setValue(data.SettlementType);
      this.SettlementFormGroup.controls['Description'].setValue(data.Description);
    
      this.SettlementFormGroup.controls['IsActive'].setValue((data.IsActive == 'Active' ? true:false));

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
  //            this.SettlementFormGroup.reset();
  //            this.buttonDisabledDelete = true;
  //            this.buttonDisabledReset = false;
  //        }
  //        else {
  //            this.message = 'Invalid Credential';
  //            alert(this.message);
  //        }
  //    });
  //}
  UpdateSettlementType() {
      this._settlemetnService.UpdateSettlementType(JSON.stringify(this.SettlementFormGroup.value), this.SettleMentTypeID).subscribe(
          (data) => {
              if (this.settlementType.Flag = 1) {
                  this.message = 'Record updated Successfully';
                  alert(this.message);
                  //this.buttonDisabledDelete = true;
                  this.buttonDisabledReset = false;
              }
              else {
                  this.message = 'Invalid Credential';
                  alert(this.message);
              }
              this.settlementType = data;
              this.Emplist = this.settlementType.dataList;
              //this.SettlementFormGroup.reset();
              this.ResetSettlementType();
              this.loadAllSettlementTypes();
          }
      )
  }
  onSubmit() {
      debugger;
      //alert('OnSubmi Clicked');
      this.submitted = true;
      if (this.SettlementFormGroup.valid) {
          //this.sucess=true;
          const datat = this.SettlementFormGroup.value;
          
          if (this.Temp == 1) {
              this.SaveSettlementType();
          }
          else {
              this.UpdateSettlementType();
          }
      } else {
          this.validateAllFormFields(this.SettlementFormGroup);
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
