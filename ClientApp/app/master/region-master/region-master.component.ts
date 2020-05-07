import { Component, OnInit } from '@angular/core';

import { FormsModule, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RegionMaster } from '../../models/RegionMaster/regionMaster';
import { State } from '../../models/BranchMaster/state';

import { RegionMasterService } from 'ClientApp/app/Services/region-master.service';
import { UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-region-master',
  templateUrl: './region-master.component.html',
  styleUrls: ['./region-master.component.css']
})
export class RegionMasterComponent implements OnInit {
  RegionMasterFormGroup: FormGroup; regionMaster: RegionMaster; state:State ;Emplist = []; buttonDisabledReset: boolean = false; /*buttonDisabledDelete: boolean = true;*/ submitted = false; sucess = false; Show = true;
  Temp: number = 1; RegionID: number = 0; loading: boolean = false; txtRegionCode: boolean = false;
  message: string;
  setClickedRow: Function;
//   games: [{
//       DocumentCode: string,
//       DocumentName: string,
//       DocumentTypeid: string
//   }];
  constructor(private formbulider: FormBuilder, private _regionService: RegionMasterService) {

      this.regionMaster = new RegionMaster();
      this.regionMaster.dataList = [];

      this.state = new State();
      this.state.dataList = [];
      
  }

  ngOnInit() {
      // debugger;
      this.RegionMasterFormGroup = this.formbulider.group({
          RegionCode: ['', [Validators.required]],
          RegionName: ['', [Validators.required]],
          StateIDs: [0, [Validators.required]],
          IsActive: [false],

      });
      this.setClickedRow = function (index) {
          this.selectedRow = index;
      }
      // this.AllRegionMaster();
      debugger;
      this.BindStates();
      this.loadAllRegionMasters();
  }

  BindStates() {
      this.loading = true;
      var currentContext = this;
      this._regionService.BindStates().
          subscribe((data) => {
              // this.RegionMaster = data.Table;
              currentContext.state.dataList = data.Table;
          });
      this.loading = false;
  }
  isFieldValid(field: string) {
      return !this.RegionMasterFormGroup.get(field).valid && this.RegionMasterFormGroup.get(field).touched;
  }
  displayFieldCss(field: string) {
      return {
          'validate': this.isFieldValid(field),
      };
  }
  loadAllRegionMasters() {
      //debugger;
      this.loading = true;
      var currentContext = this;
      this._regionService.getRegionMasters().
          subscribe((data) => {
              currentContext.regionMaster.dataList = data.Table;
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
    ResetRegion() {
      this.RegionMasterFormGroup.reset();
      this.RegionMasterFormGroup.controls['StateIDs'].setValue(0);
      this.buttonDisabledReset = false;
      this.txtRegionCode=false;
      //this.buttonDisabledDelete = true
      this.submitted = false;
      this.sucess = false;
      this.Show = true;
      this.Temp = 1;
      this.RegionID = 0;
      this.loading = false;
      this.message = null;
     // this.BindDesignations();
  }
  SaveRegionMaster() {
      //debugger;
      this._regionService.SaveRegionMaster(JSON.stringify(this.RegionMasterFormGroup.value)).subscribe(
          (data) => {
              this.regionMaster = data;
              if (this.regionMaster.Flag = 1) {
                  sessionStorage.setItem('ID', this.regionMaster.Flag.toString());
                  this.message = 'Record saved Successfully';
                  alert(this.message);
              }
              else {
                  this.message = 'Invalid Credential';
                  alert(this.message);
              }
              //this.RegionMasterFormGroup.reset();
              //this.loadAllDocuments();
              this.ResetRegion();
              this.loadAllRegionMasters()
          }
      )
  }
  onRowClicked(data: any) {
      debugger;
      const Currentrowid = this.RegionMasterFormGroup.value;
      this.RegionID = data.RegionID;
      this.RegionMasterFormGroup.controls['RegionCode'].setValue(data.RegionCode);
      this.RegionMasterFormGroup.controls['RegionName'].setValue(data.RegionName);
     
      //this.RegionMasterFormGroup.controls['StateIDs'].setValue(1);
      
      this.RegionMasterFormGroup.controls['StateIDs'].setValue(data.StateIDs);

      this.RegionMasterFormGroup.controls['IsActive'].setValue(data.IsActive=="Active" ? true:false);

      //this.buttonDisabledDelete = false;
      this.buttonDisabledReset = false;
      this.txtRegionCode=true;
      this.Temp = 2;
  }
  //DeleteDesignation() {
  //    this._regionService.DeleteDocument(this.Userid).subscribe(() => {
  //        if (this.RegionMaster.Flag = 1) {
  //            this.message = 'Record deleted Successfully';
  //            alert(this.message);
  //            this.loadAllDocuments();
  //            this.RegionMasterFormGroup.reset();
  //            this.buttonDisabledDelete = true;
  //            this.buttonDisabledReset = false;
  //        }
  //        else {
  //            this.message = 'Invalid Credential';
  //            alert(this.message);
  //        }
  //    });
  //}
  UpdateRegionMaster() {
      this._regionService.UpdateRegionMaster(JSON.stringify(this.RegionMasterFormGroup.value), this.RegionID).subscribe(
          (data) => {
              if (this.regionMaster.Flag = 1) {
                  this.message = 'Record updated Successfully';
                  alert(this.message);
                  //this.buttonDisabledDelete = true;
                  this.buttonDisabledReset = false;
              }
              else {
                  this.message = 'Invalid Credential';
                  alert(this.message);
              }
              this.regionMaster = data;
              this.Emplist = this.regionMaster.dataList;
              //this.RegionMasterFormGroup.reset();
              this.ResetRegion();
              this.loadAllRegionMasters();
          }
      )
  }
  onSubmit() {
      debugger;
      //alert('OnSubmi Clicked');
      this.submitted = true;
      if (this.RegionMasterFormGroup.valid) {
          //this.sucess=true;
          const datat = this.RegionMasterFormGroup.value;
          
          if (this.Temp == 1) {
              this.SaveRegionMaster();
          }
          else {
              this.UpdateRegionMaster();
          }
      } else {
          this.validateAllFormFields(this.RegionMasterFormGroup);
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
//    dropdownList = [];
//    selectedItems = [];
//    dropdownSettings = {};
//    ngOnInit() {
//        this.dropdownList = [
//            { item_id: 1, item_text: 'Mumbai' },
//            { item_id: 2, item_text: 'Bangaluru' },
//            { item_id: 3, item_text: 'Pune' },
//            { item_id: 4, item_text: 'Navsari' },
//            { item_id: 5, item_text: 'New Delhi' }
//        ];
//        this.selectedItems = [
//            { item_id: 3, item_text: 'Pune' },
//            { item_id: 4, item_text: 'Navsari' }
//        ];
//        //this.dropdownSettings: IDropdownSettings = {
//        //    singleSelection: false,
//        //    idField: 'item_id',
//        //    textField: 'item_text',
//        //    selectAllText: 'Select All',
//        //    unSelectAllText: 'UnSelect All',
//        //    itemsShowLimit: 3,
//        //    allowSearchFilter: true
//        //};
//    }
//    onItemSelect(item: any) {
//        console.log(item);
//    }
//    onSelectAll(items: any) {
//        console.log(items);
//    }
//}

