import { Component, OnInit, Inject } from '@angular/core';
import { FormsModule,FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LinkSetUp } from '../../Models/LinkSetUps/linkSetUp';
import { IconNameMaster } from '../../Models/LinkSetUps/iconNameMaster';
import { ParentMenuMaster } from '../../Models/LinkSetUps/parentMenuMaster';

import { LinkSetupService } from 'ClientApp/app/Services/link-setup.service';
import { UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-link-setup',
  templateUrl: './link-setup.component.html',
  styleUrls: ['./link-setup.component.css']
})
export class LinkSetupComponent implements OnInit {

  
    showModal: boolean;
    isMainGridShow: boolean;
    isMasterEntryFormShow: boolean;
    isNewDisable:boolean;
    isEditDisable:boolean;
    isSaveDisable:boolean;
    isBackDisable:boolean;


    LinkSetUpFormGroup: FormGroup; MasterLinkSetUpFormGroup:FormGroup; linkSetUp: LinkSetUp; iconNameMaster: IconNameMaster;parentMenuMaster: ParentMenuMaster; Emplist = []; buttonDisabledReset: boolean = false;buttonDisabledDelete: boolean = true; submitted = false; sucess = false; Show = true;
    Temp: number = 1; Userid: number = 0;linkSetUpID:number; loading: boolean = false;
    message: string;
    today: Date;
    setClickedRow: Function;
    // games: [{
    //     LinkSetUpID: string,
    //     LinkSetUpName: string,
    //     LinkSetUpDate: string
    // }];
    constructor(private formbulider: FormBuilder, private _linkSetUpService: LinkSetupService) {
       
      this.linkSetUp = new LinkSetUp();
      this.linkSetUp.dataList = [];

      this.iconNameMaster = new IconNameMaster();
      this.iconNameMaster.dataList = [];


      this.parentMenuMaster = new ParentMenuMaster();
      this.parentMenuMaster.dataList = [];
      
    }
  ngOnInit() {
    debugger;
    this.isMainGridShow=true;
    this.isMasterEntryFormShow=false;

    this.isNewDisable=true;
    this.isEditDisable=false;
    this.isSaveDisable=false;
    this.isBackDisable=false;

    this.LinkSetUpFormGroup = this.formbulider.group({
        LinkName: ['', [Validators.required]],
    });
    this.MasterLinkSetUpFormGroup = this.formbulider.group({
        LinkName: ['', [Validators.required]],
        url: ['', [Validators.required]],
        OrderNo: ['', [Validators.required]],
        ParentMenuId: [0, [Validators.required]],
        Purpose: ['',],
        IconName:[0,],
        IsActive: [false],
		IsDefault: [false]
    });
  this.setClickedRow = function (index) {
      this.selectedRow = index;
  }
  debugger;
  // this.AllEmployee();
  this.loadAllLinkSetUps();
  this.loadAllParentMenus();
  this.loadAllIconNames();
  
  }
  onClick(event) {
    this.loadAllParentMenus();
    this.showModal = true;
  }

  hide() {
      this.showModal = false;
  }
  newClick() {
    debugger;
    this.MasterLinkSetUpFormGroup.reset();
    this.MasterLinkSetUpFormGroup.controls['IconName'].setValue(0);
    this.MasterLinkSetUpFormGroup.controls['ParentMenuId'].setValue(0);
    this.Temp=1;
     this.isMainGridShow=false;this.isMasterEntryFormShow=true;}
  editClick() {
    
  }
  saveClick() {

  }
  backClick() {
    debugger;
    this.MasterLinkSetUpFormGroup.reset();
    this.isMainGridShow=true;this.isMasterEntryFormShow=false;}
  isFieldValid(field: string) {
      return this.LinkSetUpFormGroup.get(field).touched;
  }
  displayFieldCss(field: string) {
      return {
          'validate': this.isFieldValid(field),
      };
  }
 
loadAllLinkSetUps() {
    this.loading = true;
    var currentContext = this;
    this._linkSetUpService.getLinkSetUps().
        subscribe((data) => {
            currentContext.linkSetUp.dataList = data.Table;
        });
    // console.log(sessionStorage.getItem('ID'));
    this.loading = false;
}
  loadAllParentMenus() {
    this.loading = true;
    var currentContext = this;
    this._linkSetUpService.getParentMenus().
        subscribe((data) => {
            currentContext.parentMenuMaster.dataList = data.Table;
        });
    // console.log(sessionStorage.getItem('ID'));
    this.loading = false;
}
loadAllIconNames() {
  this.loading = true;
  var currentContext = this;
  this._linkSetUpService.getIconNames().
      subscribe((data) => {
          currentContext.iconNameMaster.dataList = data.Table;
      });
  // console.log(sessionStorage.getItem('ID'));
  this.loading = false;
}
  ResetLinkSetUp() {
      this.LinkSetUpFormGroup.reset();
     
      this.buttonDisabledReset = false;
      this.buttonDisabledDelete = true
      this.submitted = false;
      this.sucess = false;
      this.Show = true;
      this.Temp = 1;
      this.Userid = 0;
      this.loading = false;
      this.message = null;
  }
  ResetMasterLinkSetUp() {
    this.MasterLinkSetUpFormGroup.reset();
    this.MasterLinkSetUpFormGroup.controls['IconName'].setValue(0);
    this.MasterLinkSetUpFormGroup.controls['ParentMenuId'].setValue(0);
    this.buttonDisabledReset = false;
    this.buttonDisabledDelete = true
    this.submitted = false;
    this.sucess = false;
    this.Show = true;
    this.Temp = 1;
    this.Userid = 0;
    this.loading = false;
    this.message = null;
}
  SaveLinkSetUp() {
      
      this._linkSetUpService.SaveLinkSetUp(JSON.stringify(this.LinkSetUpFormGroup.value)).subscribe(
          (data) => {
              this.linkSetUp = data;
              if (this.linkSetUp.Flag = 1) {
                  sessionStorage.setItem('ID', this.linkSetUp.Flag.toString());
                  this.message = 'Record saved Successfully';
                  alert(this.message);
              }
              else {
                  this.message = 'Invalid Credential';
                  alert(this.message);
              }
              this.ResetLinkSetUp();
              this.loadAllLinkSetUps();
          }
      )
  }
  SaveMasterLinkSetUp() {
      
    this._linkSetUpService.SaveMasterLinkSetUp(JSON.stringify(this.MasterLinkSetUpFormGroup.value)).subscribe(
        (data) => {
            this.linkSetUp = data;
            if (this.linkSetUp.Flag = 1) {
                sessionStorage.setItem('ID', this.linkSetUp.Flag.toString());
                this.message = 'Record saved Successfully';
                alert(this.message);
            }
            else {
                this.message = 'Invalid Credential';
                alert(this.message);
            }
            this.ResetMasterLinkSetUp();
            this.loadAllLinkSetUps();
        }
    )
}
UpdateMasterLinkSetUp() {
    this._linkSetUpService.UpdateMasterLinkSetUp(JSON.stringify(this.MasterLinkSetUpFormGroup.value), this.linkSetUpID).subscribe(
        (data) => {
            if (this.linkSetUp.Flag = 1) {
                this.message = 'Record updated Successfully';
                alert(this.message);
                this.loadAllParentMenus();
                this.loadAllLinkSetUps()

                this.buttonDisabledDelete = true;
                this.buttonDisabledReset = false;
                this.Temp = 1;
            }
            else {
                this.message = 'Invalid Credential';
                alert(this.message);
            }
            this.linkSetUp = data;
            this.Emplist = this.linkSetUp.dataList;
            this.ResetMasterLinkSetUp();
            this.loadAllLinkSetUps();
        }
    )
}
  onParentMenuRowClicked(data: any) {
      const Currentrowid = this.LinkSetUpFormGroup.value;
      this.linkSetUpID = data.LinkID;
      ////let oldDate = "24.01.2017";
      ////let newDate = new Date(data.LinkSetUpDate);
      this.LinkSetUpFormGroup.controls['LinkName'].setValue(data.LinkName);
      //this.LinkSetUpFormGroup.controls['LinkSetUpDate'].setValue(newDate);
    //  this.today = new Date(data.LinkSetUpDate);
      
    //   this.buttonDisabledDelete = false;
    //   this.buttonDisabledReset = false;
      this.Temp = 2;
  }

  onRowClicked(data: any) {
      debugger;
    this.isMainGridShow=false;this.isMasterEntryFormShow=true;
    const Currentrowid = this.MasterLinkSetUpFormGroup.value;
    this.linkSetUpID = data.LinkID;
   
    this.MasterLinkSetUpFormGroup.controls['LinkName'].setValue(data.LinkName);
    this.MasterLinkSetUpFormGroup.controls['IconName'].setValue(data.IconName==""? 0:data.IconName);

    this.MasterLinkSetUpFormGroup.controls['url'].setValue(data.url);
    this.MasterLinkSetUpFormGroup.controls['Purpose'].setValue(data.Purpose);


    this.MasterLinkSetUpFormGroup.controls['OrderNo'].setValue(data.OrderNo);
    this.MasterLinkSetUpFormGroup.controls['ParentMenuId'].setValue(data.ParentMenuId=""? 0:data.ParentMenuId);

    this.MasterLinkSetUpFormGroup.controls['IsActive'].setValue(data.IsActive== true ? true:false);
    this.MasterLinkSetUpFormGroup.controls['IsDefault'].setValue(data.IsDefault== true ? true:false);
 
  //   this.buttonDisabledDelete = false;
  //   this.buttonDisabledReset = false;
    this.Temp = 2;
}
  DeleteParentMenu(linkSetUpID: number) {
    debugger;
      this._linkSetUpService.DeleteParentMenu(linkSetUpID).subscribe(() => {
          if (this.linkSetUp.Flag = 1) {
              this.message = 'Record deleted Successfully';
              alert(this.message);
              this.loadAllParentMenus();
              this.LinkSetUpFormGroup.reset();
              this.buttonDisabledDelete = true;
              this.buttonDisabledReset = false;
              
          }
          else {
              this.message = 'Invalid Credential';
              alert(this.message);
          }
      });
  }
  UpdateLinkSetUp() {
      this._linkSetUpService.UpdateLinkSetUp(JSON.stringify(this.LinkSetUpFormGroup.value), this.linkSetUpID).subscribe(
          (data) => {
              if (this.linkSetUp.Flag = 1) {
                  this.message = 'Record updated Successfully';
                  alert(this.message);
                  this.loadAllParentMenus();
                  this.loadAllLinkSetUps()
                  this.Temp = 1;
                  this.buttonDisabledDelete = true;
                  this.buttonDisabledReset = false;
              }
              else {
                  this.message = 'Invalid Credential';
                  alert(this.message);
              }
              this.linkSetUp = data;
              this.Emplist = this.linkSetUp.dataList;
              this.LinkSetUpFormGroup.reset();
          }
      )
  }
  onSubmit() {
      debugger;
    
    this.submitted = true;
    if (this.MasterLinkSetUpFormGroup.valid) {
        //this.sucess=true;
        const datat = this.MasterLinkSetUpFormGroup.value;
        if (this.Temp == 1) {
            this.SaveMasterLinkSetUp();
        }
        else {
            this.UpdateMasterLinkSetUp();
        }
    } else {
        this.validateAllFormFields(this.MasterLinkSetUpFormGroup);
    }
}
  onSubmitParentMenu() {
      debugger;
      //alert('OnSubmi Clicked');
      this.submitted = true;
      if (this.LinkSetUpFormGroup.valid) {
          //this.sucess=true;
          const datat = this.LinkSetUpFormGroup.value;
          if (this.Temp == 1) {
              this.SaveLinkSetUp();
          }
          else {
              this.UpdateLinkSetUp();
          }
      } else {
          this.validateAllFormFields(this.LinkSetUpFormGroup);
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
