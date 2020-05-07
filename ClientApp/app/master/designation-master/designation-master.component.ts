import { Component, OnInit } from '@angular/core';

import { FormsModule, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Designation } from '../../models/Designation/designation';

import { DesignationMasterService } from 'ClientApp/app/Services/designation-master.service';
import { UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-designation-master',
  templateUrl: './designation-master.component.html',
  styleUrls: ['./designation-master.component.css']
})
export class DesignationMasterComponent implements OnInit {
    DesignationForm: FormGroup; designation: Designation; Emplist = []; buttonDisabledReset: boolean = false; buttonDisabledDelete: boolean = true; submitted = false; sucess = false; Show = true;
    Temp: number = 1; DesignationId: number = 0; loading: boolean = false;
    message: string; textBoxDesignationCode: boolean = true;
    setClickedRow: Function;
    games: [{
        DesignationCode: string,
        DesignationName: string,
        DId: string
    }];
    constructor(private formbulider: FormBuilder, private _designationService: DesignationMasterService) {
        
        this.designation = new Designation();
        this.designation.dataList = [];
    }

    ngOnInit() {
        // debugger;
        this.DesignationForm = this.formbulider.group({
            DesignationCode: ['', [Validators.required]],
            DesignationName: ['', [Validators.required]],
            IsActive: [false,]

        });
        // this.DesignationForm.get('DesignationCode').disable();
        this.setClickedRow = function (index) {
            this.selectedRow = index;
        }
        // this.AllEmployee();
        this.loadAllDegignations();
    }
    isFieldValid(field: string) {
        return this.DesignationForm.get(field).touched;
    }
    displayFieldCss(field: string) {
        return {
            'validate': this.isFieldValid(field),
        };
    }
    loadAllDegignations() {
        
        this.loading = true;
        var currentContext = this;
        this._designationService.getDesignations().
            subscribe((data) => {
                currentContext.designation.dataList = data.Table;
            });
        // console.log(sessionStorage.getItem('ID'));
        this.loading = false;
    }
    ResetDesignation() {
        this.DesignationForm.reset();
        this.buttonDisabledReset = false;
        this.buttonDisabledDelete = true
        this.submitted = false;
        this.sucess = false;
        this.Show = true;
        this.Temp = 1;
        this.DesignationId = 0;
        this.loading = false;
        this.message = null;
    }
    SaveDesignation() {
        
        this._designationService.SaveDesignation(JSON.stringify(this.DesignationForm.value)).subscribe(
            (data) => {
                this.designation = data;
                if (this.designation.Flag = 1) {
                    sessionStorage.setItem('ID', this.designation.Flag.toString());
                    this.message = 'Record saved Successfully';
                    alert(this.message);
                }
                else {
                    this.message = 'Invalid Credential';
                    alert(this.message);
                }
                this.DesignationForm.reset();
                this.loadAllDegignations();
            }
        )
    }
    onRowClicked(data: any) {
        debugger;
        const Currentrowid = this.DesignationForm.value;
        this.DesignationId = data.DId;
        this.DesignationForm.controls['DesignationCode'].setValue(data.DesignationCode);
        this.DesignationForm.controls['DesignationName'].setValue(data.DesignationName);
        this.DesignationForm.controls['IsActive'].setValue(data.IsActive=="True"?true:false);

        this.textBoxDesignationCode=true;
        this.buttonDisabledDelete = false;
        this.buttonDisabledReset = false;
        this.Temp = 2;
    }
    DeleteDesignation() {
        this._designationService.DeleteDesignation(this.DesignationId).subscribe(() => {
            if (this.designation.Flag = 1) {
                this.message = 'Record deleted Successfully';
                alert(this.message);
                this.loadAllDegignations();
                this.DesignationForm.reset();
                this.buttonDisabledDelete = true;
                this.buttonDisabledReset = false;
            }
            else {
                this.message = 'Invalid Credential';
                alert(this.message);
            }
        });
    }
    UpdateDesignation() {
        this._designationService.UpdateDesignation(JSON.stringify(this.DesignationForm.value), this.DesignationId).subscribe(
            (data) => {
                if (this.designation.Flag = 1) {
                    this.message = 'Record updated Successfully';
                    alert(this.message);
                    this.loadAllDegignations()

                    this.buttonDisabledDelete = true;
                    this.buttonDisabledReset = false;
                }
                else {
                    this.message = 'Invalid Credential';
                    alert(this.message);
                }
                this.designation = data;
                this.Emplist = this.designation.dataList;
                this.DesignationForm.reset();
            }
        )
    }
    onSubmit() {
       debugger;
        //alert('OnSubmi Clicked');
        this.submitted = true;
        if (this.DesignationForm.valid) {
            //this.sucess=true;
            const datat = this.DesignationForm.value;
            
            if (this.Temp == 1) {
                this.SaveDesignation();
            }
            else {
                this.UpdateDesignation();
            }
        } else {
            this.validateAllFormFields(this.DesignationForm);
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