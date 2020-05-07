import { Component, OnInit } from '@angular/core';
import { FormsModule, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AllUMRNService } from 'ClientApp/app/Services/all-umrn.service';
import { UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AllUMRN } from '../../models/AllUMRN/allUMRN';
import { LegacyDetails } from '../../models/AllUMRN/legacyDetails';

@Component({
  selector: 'app-allumrn',
  templateUrl: './allumrn.component.html',
  styleUrls: ['./allumrn.component.css']
})
export class AllumrnComponent implements OnInit {

  AllUMRNFormGroup: FormGroup;
  AllUMRNFormSearchGroup: FormGroup;
  allUMRN: AllUMRN; legacyDetails:LegacyDetails;Emplist = []; buttonDisabledReset: boolean = false; /*buttonDisabledDelete: boolean = true;*/ submitted = false; sucess = false; Show = true;
  Temp: number = 1; AllUMRNID: number = 0;CustomerName:string;Reference:string; loading: boolean = false;
  message: string;
//   showModal: boolean=false;
//   showModal1: boolean=false;
  setClickedRow: Function;
//   games: [{
//       DocumentCode: string,
//       DocumentName: string,
//       DocumentTypeid: string
//   }];
  constructor(private formbulider: FormBuilder, private _allUMRNService: AllUMRNService) {
      this.allUMRN = new AllUMRN();
      this.allUMRN.dataList = [];
      this.legacyDetails = new LegacyDetails();
      this.legacyDetails.dataList = [];
  }

  showModal: boolean;    
  showModal1: boolean;
    onClick(event) {
        debugger;
        this.showModal = true;
    }
     onClick1(event) {
         this.showModal1 = true;
     }
    hide() {
        this.showModal = false;
        this.showModal1 = false;
    }

  ngOnInit() {
      // debugger;
      this.AllUMRNFormGroup = this.formbulider.group({
        UMRN: ['', [Validators.required]],
        CustomerName: ['', [Validators.required]],
        Refrence: ['', [Validators.required]],
        Amount: ['', [Validators.required]],
        FromDate: ['', [Validators.required]],
        ToDate: ['', [Validators.required]],
      });

      this.AllUMRNFormSearchGroup = this.formbulider.group({
        UMRNSearch: ['', ],
        CustomerNameSearch: ['', ],
        RefrenceNumberSearch: ['', ],
      });
      this.setClickedRow = function (index) {
          this.selectedRow = index;
      }
      // this.AllEmployee();
      debugger;
      this.loadAllAllUMRNs();
  }


  isFieldValid(field: string) {
      return !this.AllUMRNFormGroup.get(field).valid && this.AllUMRNFormGroup.get(field).touched;
  }
  displayFieldCss(field: string) {
      return {
          'validate': this.isFieldValid(field),
      };
  }
  loadAllAllUMRNs() {
    debugger;
      this.loading = true;
      var currentContext = this;
      this._allUMRNService.getAllUMRNs().
          subscribe((data) => {
              currentContext.allUMRN.dataList = data.Table;
          });
      // console.log(sessionStorage.getItem('ID'));
      this.loading = false;
  }
SearchAllUMRN()
  {
    debugger;
    this.loading = true;
    var currentContext = this;
    const datat = this.AllUMRNFormSearchGroup.value;

    if(datat.UMRNSearch=="")
    {
      this.AllUMRNID=0;
    }
    else
    {
      this.AllUMRNID=datat.UMRNSearch;
    }

    if(datat.RefrenceNumberSearch=="")
    {
      this.Reference="0";
    }
    else
    {
      this.Reference=datat.RefrenceNumberSearch;
    }
    if(datat.CustomerNameSearch=="")
    {
      this.CustomerName="0";
    }
    else
    {
      this.CustomerName=datat.CustomerNameSearch;
    }
    this._allUMRNService.getAllUMRNsSearch(this.AllUMRNID,this.CustomerName,this.Reference).
        subscribe((data) => {
            currentContext.allUMRN.dataList = data.Table;
        });
    // console.log(sessionStorage.getItem('ID'));
    this.loading = false;
  }

  ResetAllUMRN() {
      this.AllUMRNFormGroup.reset();
      this.buttonDisabledReset = false;
      //this.buttonDisabledDelete = true
      this.submitted = false;
      this.sucess = false;
      this.Show = true;
      this.Temp = 1;
      this.AllUMRNID = 0;
      this.loading = false;
      this.message = null;
     // this.BindDesignations();
  }
  onRowClicked(data: any) {
    debugger;
    this.AllUMRNID = data.UMRN;

    this.loading = true;
    var currentContext = this;
    this._allUMRNService.getAllUMRNsPresentmentHistory(this.AllUMRNID).
        subscribe((data) => {
            currentContext.legacyDetails.dataList = data.Table;
        });
    // console.log(sessionStorage.getItem('ID'));
    this.loading = false;

      this.Temp = 2;
      this.showModal1 = true;
      
  }
  SaveUMRN() {
    //debugger;
    this._allUMRNService.SaveUMRN(JSON.stringify(this.AllUMRNFormGroup.value)).subscribe(
        (data) => {
           // this.allUMRN = data;
            if (this.allUMRN.Flag = 1) {
                sessionStorage.setItem('ID', this.allUMRN.Flag.toString());
                this.message = 'Record saved Successfully';
                alert(this.message);
            }
            else {
                this.message = 'Invalid Credential';
                alert(this.message);
            }
            //this.BusinessSegmentFormGroup.reset();
            //this.loadAllDocuments();
            this.hide();
            this.ResetAllUMRN();
            this.loadAllAllUMRNs();
        }
    )
}

  onSubmit() {
      debugger;
      //alert('OnSubmi Clicked');
      this.submitted = true;
      if (this.AllUMRNFormGroup.valid) {
          //this.sucess=true;
          const datat = this.AllUMRNFormGroup.value;
          if (this.Temp == 1) {
            this.SaveUMRN();
        }

      } else {
          this.validateAllFormFields(this.AllUMRNFormGroup);
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
