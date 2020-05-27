import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  setClickedRow: Function;
  Temp:number;
  
  isMainGridShow: boolean;
isMasterEntryFormShow: boolean;
isNewDisable:boolean;
isEditDisable:boolean;
isSaveDisable:boolean;
isBackDisable:boolean;


  constructor() { }

  ngOnInit() {
  debugger;
    this.isMainGridShow=true;
    this.isMasterEntryFormShow=false;

    this.isNewDisable=true;
    this.isEditDisable=false;
    this.isSaveDisable=false;
    this.isBackDisable=false;

    
    // this.LinkSetUpFormGroup = this.formbulider.group({
    //     LinkName: ['', [Validators.required]],
    // });

    this.setClickedRow = function (index) {
        this.selectedRow = index;
    }
    
  //this.MasterSubCorporateUpFormGroup = this.formBuilder.group({
      //Added by Bibhu  for dropdownn start 18May2020
   


  }


// newClick()
// {
//   debugger;
//   this.Temp=1;
// this.isMainGridShow=false;this.isMasterEntryFormShow=true;
// }
// editClick() {
  
// }
// saveClick() {

// }
// backClick() {
//   debugger;
//   // this.MasterSubCorporateUpFormGroup.reset();
//    this.isMainGridShow=true;this.isMasterEntryFormShow=false;
// }



}
