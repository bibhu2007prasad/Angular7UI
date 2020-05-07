import { Component, OnInit } from '@angular/core';

import { FormsModule, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Document } from '../../models/Document/document';

import { DocumentMasterService } from 'ClientApp/app/Services/document-master.service';
import { UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-document-master',
  templateUrl: './document-master.component.html',
  styleUrls: ['./document-master.component.css']
})
export class DocumentMasterComponent implements OnInit {

    DocumentForm: FormGroup; document: Document; Emplist = []; buttonDisabledReset: boolean = false; /*buttonDisabledDelete: boolean = true;*/ submitted = false; sucess = false; Show = true;
    Temp: number = 1; DocumentTypeid: number = 0; loading: boolean = false;
    message: string;
    setClickedRow: Function;
    // games: [{
    //     DocumentCode: string,
    //     DocumentName: string,
    //     DocumentTypeid: string
    // }];
    constructor(private formbulider: FormBuilder, private _documentService: DocumentMasterService) {
       
        this.document = new Document();
        this.document.dataList = [];
    }

    ngOnInit() {
        // debugger;
        this.DocumentForm = this.formbulider.group({
            DocumentCode: ['', [Validators.required]],
            DocumentName: ['', [Validators.required]],
            IsActive: [false,],

        });
        this.setClickedRow = function (index) {
            this.selectedRow = index;
        }
        // this.AllEmployee();
        this.loadAllDocuments();
    }
    isFieldValid(field: string) {
        return !this.DocumentForm.get(field).valid && this.DocumentForm.get(field).touched;
    }
    displayFieldCss(field: string) {
        return {
            'validate': this.isFieldValid(field),
        };
    }
    loadAllDocuments() {
        //debugger;
        this.loading = true;
        var currentContext = this;
        this._documentService.getDocuments().
            subscribe((data) => {
                currentContext.document.dataList = data.Table;
            });
        // console.log(sessionStorage.getItem('ID'));
        this.loading = false;
    }
    ResetDocument() {
        this.DocumentForm.reset();
        this.buttonDisabledReset = false;
        //this.buttonDisabledDelete = true
        this.submitted = false;
        this.sucess = false;
        this.Show = true;
        this.Temp = 1;
        this.DocumentTypeid = 0;
        this.loading = false;
        this.message = null;
    }
    SaveDocument() {
        //debugger;
        this._documentService.SaveDocument(JSON.stringify(this.DocumentForm.value)).subscribe(
            (data) => {
                this.document = data;
                if (this.document.Flag = 1) {
                    sessionStorage.setItem('ID', this.document.Flag.toString());
                    this.message = 'Record saved Successfully';
                    alert(this.message);
                }
                else {
                    this.message = 'Invalid Credential';
                    alert(this.message);
                }
                //this.DocumentForm.reset();
                //this.loadAllDocuments();
                this.ResetDocument();
                this.loadAllDocuments()
            }
        )
    }
    onRowClicked(data: any) {
        debugger;
        const Currentrowid = this.DocumentForm.value;
        this.DocumentTypeid = data.DocumentTypeid;
        this.DocumentForm.controls['DocumentCode'].setValue(data.DocumentCode);
        this.DocumentForm.controls['DocumentName'].setValue(data.DocumentName);
        this.DocumentForm.controls['IsActive'].setValue(data.IsActive=="Active"?true:false);

        //this.buttonDisabledDelete = false;
        this.buttonDisabledReset = false;
        this.Temp = 2;
    }
    //DeleteDesignation() {
    //    this._documentService.DeleteDocument(this.Userid).subscribe(() => {
    //        if (this.document.Flag = 1) {
    //            this.message = 'Record deleted Successfully';
    //            alert(this.message);
    //            this.loadAllDocuments();
    //            this.DocumentForm.reset();
    //            this.buttonDisabledDelete = true;
    //            this.buttonDisabledReset = false;
    //        }
    //        else {
    //            this.message = 'Invalid Credential';
    //            alert(this.message);
    //        }
    //    });
    //}
    UpdateDocument() {
        this._documentService.UpdateDocument(JSON.stringify(this.DocumentForm.value), this.DocumentTypeid).subscribe(
            (data) => {
                if (this.document.Flag = 1) {
                    this.message = 'Record updated Successfully';
                    alert(this.message);
                    //this.buttonDisabledDelete = true;
                    this.buttonDisabledReset = false;
                }
                else {
                    this.message = 'Invalid Credential';
                    alert(this.message);
                }
                this.document = data;
                this.Emplist = this.document.dataList;
                //this.DocumentForm.reset();
                this.ResetDocument();
                this.loadAllDocuments();
            }
        )
    }
    onSubmit() {
        //debugger;
        //alert('OnSubmi Clicked');
        this.submitted = true;
        if (this.DocumentForm.valid) {
            //this.sucess=true;
            const datat = this.DocumentForm.value;

            if (this.Temp == 1) {
                this.SaveDocument();
            }
            else {
                this.UpdateDocument();
            }
        } else {
            this.validateAllFormFields(this.DocumentForm);
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