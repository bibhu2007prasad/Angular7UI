import { Component, OnInit } from '@angular/core';

import { FormsModule, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


import { ChargeMasterService } from 'ClientApp/app/Services/charge-master.service';
import { UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChargeMaster } from '../../models/ChargeMaster/chargeMaster';

@Component({
  selector: 'app-charge-master',
  templateUrl: './charge-master.component.html',
  styleUrls: ['./charge-master.component.css']
})
export class ChargeMasterComponent implements OnInit {

  ChargeMasterFormGroup: FormGroup; chargeMaster: ChargeMaster; Emplist = []; buttonDisabledReset: boolean = false; /*buttonDisabledDelete: boolean = true;*/ submitted = false; sucess = false; Show = true;
  Temp: number = 1; ChargeTypeId: number = 0; loading: boolean = false;
  message: string;
  setClickedRow: Function;
//   games: [{
//       DocumentCode: string,
//       DocumentName: string,
//       DocumentTypeid: string
//   }];
  constructor(private formbulider: FormBuilder, private _chargeMasterService: ChargeMasterService) {

     
      this.chargeMaster = new ChargeMaster();
      this.chargeMaster.dataList = [];
  }

  ngOnInit() {
      // debugger;
      this.ChargeMasterFormGroup = this.formbulider.group({
        ChargeTypeCode: ['', [Validators.required]],
        ChargeTypeName: ['', [Validators.required]],
        ChargeTypeDesc: ['', [Validators.required]],
        IsActive: [false],
		IsDefault: [false]

      });
      this.setClickedRow = function (index) {
          this.selectedRow = index;
      }
      // this.AllEmployee();
      debugger;
      this.loadAllChargeMasters();
  }

 
  isFieldValid(field: string) {
      return !this.ChargeMasterFormGroup.get(field).valid && this.ChargeMasterFormGroup.get(field).touched;
  }
  displayFieldCss(field: string) {
      return {
          'validate': this.isFieldValid(field),
      };
  }
  loadAllChargeMasters() {
    debugger;
      this.loading = true;
      var currentContext = this;
      this._chargeMasterService.getChargeMasters().
          subscribe((data) => {
              currentContext.chargeMaster.dataList = data.Table;
          });
      // console.log(sessionStorage.getItem('ID'));
      this.loading = false;
  }
 
  ResetChargeMaster() {
      this.ChargeMasterFormGroup.reset();
      
      this.buttonDisabledReset = false;
      //this.buttonDisabledDelete = true
      this.submitted = false;
      this.sucess = false;
      this.Show = true;
      this.Temp = 1;
      this.ChargeTypeId = 0;
      this.loading = false;
      this.message = null;
     // this.BindDesignations();
  }
  SaveChargeMaster() {
      //debugger;
      this._chargeMasterService.SaveChargeMaster(JSON.stringify(this.ChargeMasterFormGroup.value)).subscribe(
          (data) => {
              this.chargeMaster = data;
              if (this.chargeMaster.Flag = 1) {
                  sessionStorage.setItem('ID', this.chargeMaster.Flag.toString());
                  this.message = 'Record saved Successfully';
                  alert(this.message);
              }
              else {
                  this.message = 'Invalid Credential';
                  alert(this.message);
              }
              //this.ChargeMasterFormGroup.reset();
              //this.loadAllDocuments();
              this.ResetChargeMaster();
              this.loadAllChargeMasters()
          }
      )
  }
  onRowClicked(data: any) {
    debugger;
      const Currentrowid = this.ChargeMasterFormGroup.value;
      this.ChargeTypeId = data.ChargeTypeId;
      this.ChargeMasterFormGroup.controls['ChargeTypeCode'].setValue(data.ChargeTypeCode);
      this.ChargeMasterFormGroup.controls['ChargeTypeName'].setValue(data.ChargeTypeName);
      this.ChargeMasterFormGroup.controls['ChargeTypeDesc'].setValue(data.ChargeTypeDesc);
    
      this.ChargeMasterFormGroup.controls['IsActive'].setValue((data.IsActive == 'Active' ? true:false));
	  this.ChargeMasterFormGroup.controls['IsDefault'].setValue((data.IsDefault == 'Yes' ? true:false));

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
  //            this.ChargeMasterFormGroup.reset();
  //            this.buttonDisabledDelete = true;
  //            this.buttonDisabledReset = false;
  //        }
  //        else {
  //            this.message = 'Invalid Credential';
  //            alert(this.message);
  //        }
  //    });
  //}
  UpdateChargeMaster() {
      this._chargeMasterService.UpdateChargeMaster(JSON.stringify(this.ChargeMasterFormGroup.value), this.ChargeTypeId).subscribe(
          (data) => {
              if (this.chargeMaster.Flag = 1) {
                  this.message = 'Record updated Successfully';
                  alert(this.message);
                  //this.buttonDisabledDelete = true;
                  this.buttonDisabledReset = false;
              }
              else {
                  this.message = 'Invalid Credential';
                  alert(this.message);
              }
              this.chargeMaster = data;
              this.Emplist = this.chargeMaster.dataList;
              //this.ChargeMasterFormGroup.reset();
              this.ResetChargeMaster();
              this.loadAllChargeMasters();
          }
      )
  }
  onSubmit() {
      debugger;
      //alert('OnSubmi Clicked');
      this.submitted = true;
      if (this.ChargeMasterFormGroup.valid) {
          //this.sucess=true;
          const datat = this.ChargeMasterFormGroup.value;
          
          if (this.Temp == 1) {
              this.SaveChargeMaster();
          }
          else {
              this.UpdateChargeMaster();
          }
      } else {
          this.validateAllFormFields(this.ChargeMasterFormGroup);
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
