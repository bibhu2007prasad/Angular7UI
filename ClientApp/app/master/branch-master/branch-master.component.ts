import { Component, OnInit } from '@angular/core';

import { FormsModule, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BranchMaster } from '../../models/BranchMaster/branchMaster';
import { State } from '../../models/BranchMaster/state';

import { BranchMasterService } from 'ClientApp/app/Services/branch-master.service';
import { UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Component({
  selector: 'app-branch-master',
  templateUrl: './branch-master.component.html',
  styleUrls: ['./branch-master.component.css']
})
export class BranchMasterComponent implements OnInit {

  BranchFormGroup: FormGroup; branchMaster: BranchMaster; state:State ;Emplist = []; buttonDisabledReset: boolean = false; /*buttonDisabledDelete: boolean = true;*/ submitted = false; sucess = false; Show = true;
  Temp: number = 1; BranchId: number = 0; loading: boolean = false;
  message: string;
  setClickedRow: Function;
  games: [{
      DocumentCode: string,
      DocumentName: string,
      DocumentTypeid: string
  }];
  constructor(private formbulider: FormBuilder, private _branchService: BranchMasterService) {

      this.branchMaster = new BranchMaster();
      this.branchMaster.dataList = [];

      this.state = new State();
      this.state.dataList = [];
      
  }

  ngOnInit() {
      // debugger;
      this.BranchFormGroup = this.formbulider.group({
          BranchCode: ['', [Validators.required]],
          BranchName: ['', [Validators.required]],
          IFSC: ['', [Validators.required]],
          Address: ['', [Validators.required]],
          MICR: ['',],
		      StateId: [0, [Validators.required]],
          IsActive: [false],

      });
      this.setClickedRow = function (index) {
          this.selectedRow = index;
      }
      // this.AllBranchMaster();
      debugger;
      this.BindStates();
      this.loadAllBranchMasters();
  }

  BindStates() {
      this.loading = true;
      var currentContext = this;
      this._branchService.BindStates().
          subscribe((data) => {
              // this.branchMaster = data.Table;
              currentContext.state.dataList = data.Table;
          });
      this.loading = false;
  }
  isFieldValid(field: string) {
      return !this.BranchFormGroup.get(field).valid && this.BranchFormGroup.get(field).touched;
  }
  displayFieldCss(field: string) {
      return {
          'validate': this.isFieldValid(field),
      };
  }
  loadAllBranchMasters() {
      //debugger;
      this.loading = true;
      var currentContext = this;
      this._branchService.getBranchMasters().
          subscribe((data) => {
              currentContext.branchMaster.dataList = data.Table;
          });
      // console.log(sessionStorage.getItem('ID'));
      this.loading = false;
  }
  numberOnly(event): boolean {
      debugger;
      const charCode = (event.which) ? event.which : event.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
      }
      return true;
  
    }
    ResetBranch() {
      this.BranchFormGroup.reset();
      this.BranchFormGroup.controls['StateId'].setValue(0);
      this.buttonDisabledReset = false;
      //this.buttonDisabledDelete = true
      this.submitted = false;
      this.sucess = false;
      this.Show = true;
      this.Temp = 1;
      this.BranchId = 0;
      this.loading = false;
      this.message = null;
     // this.BindDesignations();
  }
  SaveBranchMaster() {
      //debugger;
      this._branchService.SaveBranchMaster(JSON.stringify(this.BranchFormGroup.value)).subscribe(
          (data) => {
              this.branchMaster = data;
              if (this.branchMaster.Flag = 1) {
                  sessionStorage.setItem('ID', this.branchMaster.Flag.toString());
                  this.message = 'Record saved Successfully';
                  alert(this.message);
              }
              else {
                  this.message = 'Invalid Credential';
                  alert(this.message);
              }
              //this.BranchFormGroup.reset();
              //this.loadAllDocuments();
              this.ResetBranch();
              this.loadAllBranchMasters()
          }
      )
  }
  onRowClicked(data: any) {
      debugger;
      const Currentrowid = this.BranchFormGroup.value;
      this.BranchId = data.BranchId;
      this.BranchFormGroup.controls['BranchCode'].setValue(data.BranchCode);
      this.BranchFormGroup.controls['BranchName'].setValue(data.BranchName);
      this.BranchFormGroup.controls['IFSC'].setValue(data.IFSC);
      this.BranchFormGroup.controls['Address'].setValue(data.Address);

      this.BranchFormGroup.controls['MICR'].setValue(data.MICR);
	  this.BranchFormGroup.controls['StateId'].setValue(data.StateId);

      this.BranchFormGroup.controls['IsActive'].setValue(data.IsActive);

      //this.buttonDisabledDelete = false;
      this.buttonDisabledReset = false;
      this.Temp = 2;
  }
  //DeleteDesignation() {
  //    this._branchService.DeleteDocument(this.Userid).subscribe(() => {
  //        if (this.branchMaster.Flag = 1) {
  //            this.message = 'Record deleted Successfully';
  //            alert(this.message);
  //            this.loadAllDocuments();
  //            this.BranchFormGroup.reset();
  //            this.buttonDisabledDelete = true;
  //            this.buttonDisabledReset = false;
  //        }
  //        else {
  //            this.message = 'Invalid Credential';
  //            alert(this.message);
  //        }
  //    });
  //}
  UpdateBranchMaster() {
      this._branchService.UpdateBranchMaster(JSON.stringify(this.BranchFormGroup.value), this.BranchId).subscribe(
          (data) => {
              if (this.branchMaster.Flag = 1) {
                  this.message = 'Record updated Successfully';
                  alert(this.message);
                  //this.buttonDisabledDelete = true;
                  this.buttonDisabledReset = false;
              }
              else {
                  this.message = 'Invalid Credential';
                  alert(this.message);
              }
              this.branchMaster = data;
              this.Emplist = this.branchMaster.dataList;
              //this.BranchFormGroup.reset();
              this.ResetBranch();
              this.loadAllBranchMasters();
          }
      )
  }
  onSubmit() {
      debugger;
      //alert('OnSubmi Clicked');
      this.submitted = true;
      if (this.BranchFormGroup.valid) {
          //this.sucess=true;
          const datat = this.BranchFormGroup.value;
          
          if (this.Temp == 1) {
              this.SaveBranchMaster();
          }
          else {
              this.UpdateBranchMaster();
          }
      } else {
          this.validateAllFormFields(this.BranchFormGroup);
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