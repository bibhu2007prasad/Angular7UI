import { Component, OnInit, Inject } from '@angular/core';
import { FormsModule,FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Country } from '../../Models/corporatesetup/country';
import { Bank } from '../../Models/corporatesetup/bank';
import { Category } from '../../Models/corporatesetup/category';

import { CorporateSetUp_dtBank } from '../../Models/corporatesetup/corporateSetUp_dtBank';
import { CorporateSetUp_XmlFileName } from '../../Models/corporatesetup/corporateSetUp_XmlFileName';
import { CorporateSetUp_dtContactPerson } from '../../Models/corporatesetup/corporateSetUp_dtContactPerson';
import { AllFieldOfForm } from '../../Models/corporatesetup/allFieldOfForm';

import { CorporateSetupService } from 'ClientApp/app/Services/corporate-setup.service';
import { UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BindState } from '../../Models/corporatesetup/bind-state';
import { BindCity } from '../../Models/corporatesetup/bind-city';
import { SaveResult } from '../../Models/corporatesetup/save-result';
// import { EntityBusinessCode } from '../../../models/entity_setup/entity-business-code';
import { MainGrid } from '../../Models/corporatesetup/main-grid';
import { count } from 'rxjs/operators';
import { CategoryMaster } from 'ClientApp/app/Models/CorporateSetUp/categoryMaster';
import { SettlementTypeMaster } from 'ClientApp/app/Models/CorporateSetUp/settlementTypeMaster';
import { BussinessSegmentMaster } from 'ClientApp/app/Models/CorporateSetUp/bugginessSegmentMaster';
import { RegionalMaster } from 'ClientApp/app/models/CorporateSetUp/regionalMaster';
import { PSMMaster } from 'ClientApp/app/Models/CorporateSetUp/psmMaster';
import { UtilityCode } from 'ClientApp/app/Models/CorporateSetUp/utilityCode';

@Component({
  selector: 'app-corporatesetup',
  templateUrl: './corporatesetup.component.html',
  styleUrls: ['./corporatesetup.component.css']
})
export class CorporatesetupComponent implements OnInit {
//   MasterCorporateUpFormGroup:FormGroup;
setClickedRow: Function;
dtBankCode:string[];
XmlFileName:string[];
dtcontactperson:string[];
corporateSetUp_dtBank:CorporateSetUp_dtBank;
corporateSetUp_XmlFileName:CorporateSetUp_XmlFileName;
corporateSetUp_dtContactPerson:CorporateSetUp_dtContactPerson;
allFieldOfForm:AllFieldOfForm;

showModal: boolean;
isMainGridShow: boolean;
isMasterEntryFormShow: boolean;
isNewDisable:boolean;
isEditDisable:boolean;
isSaveDisable:boolean;
isBackDisable:boolean;
CountryData: Country;
BankData: Bank;
EntityBusinessCodeData: Category;
utilitycode:UtilityCode;
categoryMaster:CategoryMaster;
regionalMaster:RegionalMaster;
psmMaster:PSMMaster;
settlementTypeMaster:SettlementTypeMaster;
businessSegmentMaster:BussinessSegmentMaster;
showModalsave: boolean;
SaveResultData : SaveResult;
StateData: BindState;
CityData: BindCity

MainGridData: MainGrid;
MainGideDiv = true;
EntityFormDiv = false;
MasterCorporateUpFormGroup: FormGroup;
Preloader: boolean = true;
EMandateMode: boolean = false;
NetBankingTab: boolean = false;
DebitCardTab: boolean = false;
divaadhrTab:boolean=false;
AadhaarCardTab: boolean = false;
ActivePaymentModeTab: boolean = false;
PhysicalTab: boolean = false;
IsThirdTransactionTab: boolean = false;
isSelected: boolean = false;
liSave: boolean = true;
IsValidationCountEnableTab: boolean = false;
RecheckTab: boolean = false;
SponsorBankCodeArray = [];
FinaceAndBillingCodeArray = [];//Added by Bibhu on 18May2020
FileNameArray = [];//Added by Bibhu on 18May2020
i = 0;
liBack: boolean = true;
SB_Radio:boolean = true;
CA_Radio:boolean = true;
CC_Radio:boolean = true;
SB_NRE_Radio:boolean = true;
SB_NRO_Radio:boolean = true;
Other_Radio:boolean = true;
Monthly_Radio:boolean = true;
Quarterly_Radio:boolean = true;
Half_Yearly_Radio:boolean = true;
Yearly_Radio:boolean = true;
Presented_Radio:boolean = true;
FixedAmount_Radio:boolean = true;
MaximumAmount_Radio:boolean = true;
To_Radio:boolean = true; 
UntillCancelled_Radio:boolean = true; 
DivSponsorCode : boolean = false;
DivCheckRequired : boolean = false; //Added by Bibhu
DivFinaceAndBilling : boolean = false; //Added by Bibu on 18May2020
SponsoredBankcode;
FinanceAndBillingcode;//Added by Bibhu on 18May2020
HeaderArray ;
Temp: number = 1;
EntityId:any;
buttonDisabledBillingUserName: boolean = false; 
_EntityId:any;
constructor(private formBuilder: FormBuilder, private ESService: CorporateSetupService) {
  // this._country = new Country();
  // this._country.dataList = [];
  // this._bank = new Bank();
  // this._bank.dataList = [];
  // this._category = new Category();
  // this._category.dataList = [];  

  this.corporateSetUp_dtBank = new CorporateSetUp_dtBank();
  this.corporateSetUp_XmlFileName = new CorporateSetUp_XmlFileName();
  this.corporateSetUp_dtContactPerson = new CorporateSetUp_dtContactPerson();
  this.allFieldOfForm=new AllFieldOfForm();
        
}
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
    
  this.MasterCorporateUpFormGroup = this.formBuilder.group({
      //Added by Bibhu  for dropdownn start 18May2020
    categorycodeid:[0],
    // SponsoredBankName:[0],
    UtilityCodeId:[0],
    categorycodeidNach:[0],
    BusinessSegmentId:[0],
    RMId:[0],
    PSMId:[0],
    Arrangementdays:[-1],
    SettlementTypeId:[0],
    //Added by Bibhu  for dropdownn end 18May2020

    Code: [''],
    EntityName: [''],
    AppID: [''],
    MerchantKey: [''],
    Name: [''], 
    Email: [''],
    MobileNo: [''],
    Address: [''],
    Country: [0,],
    State: [0,],
    City: [0],
    PinCode: [''],
    UserName: [''],
    EntityBCode: [0,],
    IsEMandate: [false],
    IsOverPrintMandate: [false],
    NetBankingCh: [false],
    DebitCardCh: [false],
    AadhaarCardCh: [false],
    ActivePaymentModeCh: [false],

    IsPhysicalMandateCh: [false],
    EmailId:[''], //Added by Bibhu on 18May2020
    //NachPresentment:[''],

    IsThirdTransactionCh: [false],
    IsValidationCountEnableCh: [false],
    recheckthepresentmentfileCh: [false],
    SB_Ch: [false],
    CA_Ch: [false],
    CC_Ch: [false],
    SB_NRE_Ch: [false],
    SB_NRO_Ch: [false],
    Other_Ch: [false],
    IsSendEmail: [false],
    IsRefNumerc: [false],
    IsShowMandateMode: [false],
    ISTodateMandatoryEnach_Ch: [false],
    chkIsZipSure_Ch: [false],
    chkIsAllowEManadte_Ch: [false],
    chkIsRefrence2Mandatory: [false],
    IsRefCheck_Ch: [false],
    Cash_Ch: [false],
    Cheque_Ch: [false],
    DemandDraft_Ch: [false],
    Electronic_Ch: [false],
    BankValidationAdminCount: [''],
    BankValidationUserCount: [''],
    AcValidationAdminCount: [''],
    AcValidationUserCount: [''],
    EnableUserWise_Ch: [false],
    BankName: [0],
    BankCode: [''],
    UtilityCode: [''],
    IFSC: [''],
    AccountNumber: [''],
    FixedAmount_Ch: [false],
    MaximumAmount_Ch: [false],
    Monthly_Ch:[false],
    Quarterly_Ch: [false],
    Half_Yearly_Ch: [false],
    Half_Yearly_ChFun:[false],
    Yearly_Ch: [false],
    Presented_Ch: [false],
    To_Ch: [false],
    UntillCancelled_Ch: [false],
    FileName1: [''],
    FileName2: [''],
    FileName3: [''],
    FileName4: [''],
    FileName5: [''],
    FileName6: [''],
    InstructingMenmerId : [''],
    Type : [false],
    DebitType: [false],
    ToDebit: [false],
    FrequencyType: [false],
    Amount : [''],
    ISEnableCancelUser : [false],
    CheckerRequire:[false],
    ValidationByCustomer_Ch : [false],
    ValidationByCorporate_Ch:[false],
    OCRCode_Ch: [false],
    QRCode_Ch: [false],
    Logo_Ch: [false],
    // Added by Bibhu on 18May2020
     IsAccountValidation:[false], 
    IsPhoneNumber:[false],
    IsReferenceNumeric:[false],
    IsrdoFixed:[false],
    IsrdoMaxLength:[false],
    IstxtMaxlenth:[''],

    //Financial and Billing 
    FinaceAndBillingName:[''],
    FinaceAndBillingDesignation:[''],
    FinaceAndBillingContactNo:[''],
    FinaceAndBillingFaxNo:[''],
    FinaceAndBillingAddress:[''],
    PAN:[''],
    TAN:[''],
    GST:[''],
    BillContractPerson:[''],
    Designation:[''],
    BillingContactNo:[''],
    BillFaxNo:[''],
    BillingAddress:[''],
    BillingPicupContactPerson:[''],
    BillingPicupLocationAddress:[''],

    BillingCommunicationMailPrimary: [''],
    
    BillingCommunicationMailBilling: [''],

    BillingChargeDebitAccNo:[''],
    BillingBankCorpId:[''],
    BillingBranchName:[''],
    BillingBranchCode:[''],
    BillingIFSC:[''],
    IsRequired:[false],
    // recheckthepresentmentfileCh: [''],
    NachPresentment:[false],
    BillingIP:[''],
    BillingURL:[''],
    BillingUserName:[''],
    BillingPassword:[''],

    ChkNetMail:[false],
    ChkNetManual:[false],
    ChkNetSMS:[false],
    ChkDebitMail:[false],
    ChkDebitManual:[false],
    ChkDebitSMS:[false],

    ChkAdhar:[false],


});
this.Preloader = false;
debugger;
this.BindUtility();
this.BindCategoryWithRelated();
this.BindCountryAndBank();
this.BingGrid();
}

onRowClicked(data: any) {
    this._EntityId=data.EntityId;
    this.newClick();
    this.ESService.EditEntity(data.EntityId).subscribe(
        (data) => {
            this.BindUtility();
            this.BindCategoryWithRelated(); 
            // this.CountryData = data.Table;
            var i = 0;
            if (data.Table.length>0)
            {
                var IsRefrenceCheck=data.Table[i].IsValidationCountEnable;
                var Reflength=data.Table[i].Reflength;

                this.MasterCorporateUpFormGroup.controls['IstxtMaxlenth'].setValue(Reflength);
                if(data.Table[i].ReflengthType=='M')
                {
                    this.MasterCorporateUpFormGroup.controls['IsrdoMaxLength'].setValue(true);
                }
                if(data.Table[i].ReflengthType=='F')
                {
                    this.MasterCorporateUpFormGroup.controls['IsrdoFixed'].setValue(true);
                }
                // if(IsRefrenceCheck==1)
                // {
                // // jquery_1_11_3_min_p("#DivAdminUserCount").css('display', 'block');
                //     this.MasterCorporateUpFormGroup.controls[BankValidationAdminCount].setValue(data.Table.BankValidationAdminCount);
                //     jquery_1_11_3_min_p('#txtBankValidationUserCount').val(jsonData[i].BankValidationUserCount);
                //     jquery_1_11_3_min_p('#txtAcValidationAdminCount').val(jsonData[i].AcValidationAdminCount);
                //     jquery_1_11_3_min_p('#txtAcValidationUserCount').val(jsonData[i].AcValidationUserCount);
                //     jquery_1_11_3_min_p('#chkIsValidationCountEnable').prop('checked', true);
                // }else  
                // {
                //     jquery_1_11_3_min_p("#DivAdminUserCount").css('display', 'none');
                //     jquery_1_11_3_min_p('#chkIsValidationCountEnable').prop('checked', false);
                // }

                // var IsZipShorABPS=jsonData[i].IsZipShorABPS;
                // if(IsZipShorABPS==1)
                // {
                
                // jquery_1_11_3_min_p('#chkIsZipSure').prop('checked', true);
                // }else  
                // {
                // jquery_1_11_3_min_p('#chkIsZipSure').prop('checked', false);
                // }
                
                // var IsZipShorABPS=jsonData[i].IsZipShorABPS;
                // if(IsZipShorABPS==1)
                //          {
                         
                //           jquery_1_11_3_min_p('#chkIsZipSure').prop('checked', true);
                //           }else  
                //           {
                //            jquery_1_11_3_min_p('#chkIsZipSure').prop('checked', false);
                //           }
               
               
               
                //              var ISTodateMandatoryEnach=jsonData[i].ISTodateMandatoryEnach;
                // if(ISTodateMandatoryEnach==1)
                //          {
                         
                //           jquery_1_11_3_min_p('#chkIsToDateMandatory').prop('checked', true);
                //           }else  
                //           {
                //            jquery_1_11_3_min_p('#chkIsToDateMandatory').prop('checked', false);
                //           }

                // var IsAllowENachMobile=jsonData[i].IsAllowENachMobile;
                // if(IsAllowENachMobile==1)
                //          {
                         
                //           jquery_1_11_3_min_p('#chkIsAllowEManadteMobile').prop('checked', true);
                //           }else  
                //           {
                //            jquery_1_11_3_min_p('#chkIsAllowEManadteMobile').prop('checked', false);
                //           }
               
               
                //            var IsNachPresentment=jsonData[i].IsNachPresentment;
                // if(IsNachPresentment==1)
                //          {
                         
                //           jquery_1_11_3_min_p('#chkPresentment').prop('checked', true);
                //           }else  
                //           {
                //            jquery_1_11_3_min_p('#chkPresentment').prop('checked', false);
                //           }
               
               
               
                //                        var IsRefrenceNumeric=jsonData[i].IsRefrenceNumeric;
                // if(IsRefrenceNumeric==1)
                //          {
                         
                //           jquery_1_11_3_min_p('#chkRefNumerc').prop('checked', true);//
                //           }else  
                //           {
                //            jquery_1_11_3_min_p('#chkRefNumerc').prop('checked', false);
                //           }
               
                //              var IsRefrence2Mandatory=jsonData[i].IsRefrence2Mandatory;
                // if(IsRefrence2Mandatory==1)
                //          {
                         
                //           jquery_1_11_3_min_p('#chkIsRefrence2Mandatory').prop('checked', true);
                //           }else  
                //           {
                //            jquery_1_11_3_min_p('#chkIsRefrence2Mandatory').prop('checked', false);
                //           }

        var IsEmandate=data.Table[i].IsEmandate;
        if(IsEmandate==1)
          {
            this.MasterCorporateUpFormGroup.controls['IsEMandate'].setValue(true);
           //jquery_1_11_3_min_p('#chkEmandate').prop('checked', true);
           }else  
           {
            //jquery_1_11_3_min_p('#chkEmandate').prop('checked', false);
            this.MasterCorporateUpFormGroup.controls['IsEMandate'].setValue(false);
           }

          var IsPhysical=data.Table[i].IsPhysical;
          if(IsPhysical==1)
          {
            this.MasterCorporateUpFormGroup.controls['IsPhysicalMandateCh'].setValue(true);
           //jquery_1_11_3_min_p('#chkPhysical').prop('checked', true);
           }else  
           {
            //jquery_1_11_3_min_p('#chkPhysical').prop('checked', false);
            this.MasterCorporateUpFormGroup.controls['IsPhysicalMandateCh'].setValue(false);
           }
           

//             var IsShowMandateMode=jsonData[i].IsShowMandateMode;
//  if(IsShowMandateMode==1)
//           {
          
//            jquery_1_11_3_min_p('#IsShowMandateMode').prop('checked', true);
//            }else  
//            {
//             jquery_1_11_3_min_p('#IsShowMandateMode').prop('checked', false);
//            }


        //     var IsSendEmailCustomer=jsonData[i].IsSendEmailCustomer;
        //   if(IsSendEmailCustomer==1)
        //   {
          
        //    jquery_1_11_3_min_p('#IsSendEmail').prop('checked', true);
        //    }else  
        //    {
        //     jquery_1_11_3_min_p('#IsSendEmail').prop('checked', false);
        //    }
           
        //   var Type=jsonData[i].PeriodType;
        //   if(Type=='t')
        //   {
        //    jquery_1_11_3_min_p('input:radio[name="rdoPeriod"]').filter('[value="t"]').prop('checked', true);
        //    }else   if(Type=='u')
        //    {
        //     jquery_1_11_3_min_p('input:radio[name="rdoPeriod"]').filter('[value="u"]').prop('checked', true);
        //    }

       var Type=data.Table[i].DebitType;
        if(Type=='f')
        {
            this.MasterCorporateUpFormGroup.controls['FixedAmount_Ch'].setValue(true);
         //jquery_1_11_3_min_p('input:radio[name="rdoNomDebit"]').filter('[value="f"]').prop('checked', true);
         }else  if(Type=='m')
         {
            this.MasterCorporateUpFormGroup.controls['MaximumAmount_Ch'].setValue(true);
            
         // jquery_1_11_3_min_p('input:radio[name="rdoNomDebit"]').filter('[value="m"]').prop('checked', true);
         }
         

         Type=data.Table[i].FrequencyType;
         if(Type=='m')
         {
            this.MasterCorporateUpFormGroup.controls['Monthly_Ch'].setValue(true);
          }else  if(Type=='q')
          {
           //jquery_1_11_3_min_p('input:radio[name="rdoNomFrequency"]').filter('[value="q"]').prop('checked', true);
           this.MasterCorporateUpFormGroup.controls['Quarterly_Ch'].setValue(true);
          }
          else  if(Type=='h')
          {
           //jquery_1_11_3_min_p('input:radio[name="rdoNomFrequency"]').filter('[value="h"]').prop('checked', true);
           this.MasterCorporateUpFormGroup.controls['Half_Yearly_Ch'].setValue(true);
           
          }
          else  if(Type=='y')
          {
           //jquery_1_11_3_min_p('input:radio[name="rdoNomFrequency"]').filter('[value="y"]').prop('checked', true);
           this.MasterCorporateUpFormGroup.controls['Yearly_Ch'].setValue(true);
          }
            else  if(Type=='a')
          {
          // jquery_1_11_3_min_p('input:radio[name="rdoNomFrequency"]').filter('[value="a"]').prop('checked', true);
          this.MasterCorporateUpFormGroup.controls['Presented_Ch'].setValue(true);
          }


        Type=data.Table[i].ToDebit;
          if(Type=='sb')
          {
            this.MasterCorporateUpFormGroup.controls['SB_Ch'].setValue(true);
          // jquery_1_11_3_min_p('input:radio[name="rdoNomGender"]').filter('[value="sb"]').prop('checked', true);
           }else  if(Type=='ca')
           {
           // jquery_1_11_3_min_p('input:radio[name="rdoNomGender"]').filter('[value="ca"]').prop('checked', true);
           this.MasterCorporateUpFormGroup.controls['CA_Ch'].setValue(true);
           }
           else  if(Type=='cc')
           {
           // jquery_1_11_3_min_p('input:radio[name="rdoNomGender"]').filter('[value="cc"]').prop('checked', true);
           this.MasterCorporateUpFormGroup.controls['CC_Ch'].setValue(true);
           }
            else  if(Type=='re')
           {
           // jquery_1_11_3_min_p('input:radio[name="rdoNomGender"]').filter('[value="re"]').prop('checked', true);
           this.MasterCorporateUpFormGroup.controls['SB_NRE_Ch'].setValue(true);
           }
            else  if(Type=='rd')
           {
            //jquery_1_11_3_min_p('input:radio[name="rdoNomGender"]').filter('[value="rd"]').prop('checked', true);
            this.MasterCorporateUpFormGroup.controls['SB_NRO_Ch'].setValue(true);
           }
           else  if(Type=='ot')
           {
           // jquery_1_11_3_min_p('input:radio[name="rdoNomGender"]').filter('[value="ot"]').prop('checked', true);
           this.MasterCorporateUpFormGroup.controls['Other_Ch'].setValue(true);
           }

        // var Amount=data.Table.AmountBankMandate;
        // if(Amount.trim()=='PM')
        // {
        //  //jquery_1_11_3_min_p('input:radio[name="rdoAmount"]').filter('[value="PM"]').prop('checked', true);
        //  this.MasterCorporateUpFormGroup.controls['Other_Ch'].setValue(true);
        //  }else  if(Amount.trim()=='M')
        //  {
        //   //jquery_1_11_3_min_p('input:radio[name="rdoAmount"]').filter('[value="M"]').prop('checked', true);
        //   this.MasterCorporateUpFormGroup.controls['Other_Ch'].setValue(true);
        //  }

//            var Mode=jsonData[i].ModeOfPayment;
// if(Mode.trim()=='Y')
//         {
//          jquery_1_11_3_min_p("#ModeOfPayment").css('display', 'block');
//          jquery_1_11_3_min_p('#chkPaymentMode').prop('checked', true);
//          }else  
//          {
//           jquery_1_11_3_min_p('#chkPaymentMode').prop('checked', false);
//          }

//          var IsThirdTransaction=jsonData[i].IsThirdTransaction;
//            if(IsThirdTransaction==1)
//         {
//          jquery_1_11_3_min_p("#DivBankAmount").css('display', 'block');
//           jquery_1_11_3_min_p('#chkIsThirdTransaction').prop('checked', true);
//          }else 
//          {
//          jquery_1_11_3_min_p('#tblBankAmount tbody  tr td div').remove();  
//           jquery_1_11_3_min_p("#DivBankAmount").css('display', 'none');
//           jquery_1_11_3_min_p('#chkIsThirdTransaction').prop('checked', false);
//          }
         
//this.MasterCorporateUpFormGroup.controls['txtInstructingMenmerId'].setValue(data.Code);
        // jquery_1_11_3_min_p('#txtInstructingMenmerId').val(jsonData[i].InstructingMemberId)
        this.MasterCorporateUpFormGroup.controls['Code'].setValue(data.Table[i].Code);
          
            // kendo_all_min_js("#txtEntityBusinessCode").data("kendoDropDownList").value(jsonData[i].EntityBusinessCode);
         // jquery_1_11_3_min_p('#txtName').val(jsonData[i].Name);
         this.MasterCorporateUpFormGroup.controls['Name'].setValue(data.Table[i].ContactPerson);

         this.MasterCorporateUpFormGroup.controls['Code'].setValue(data.Table[i].Code);
         this.MasterCorporateUpFormGroup.controls['EntityName'].setValue(data.Table[i].Name);

         this.MasterCorporateUpFormGroup.controls['BankCode'].setValue(data.Table[i].SponsorBankCode);
         this.MasterCorporateUpFormGroup.controls['UtilityCode'].setValue(data.Table[i].UtilityCode);
         this.MasterCorporateUpFormGroup.controls['BankName'].setValue(data.Table[i].SponsorBankName);

        //  // jquery_1_11_3_min_p('#txtContatPerson').val(jsonData[i].Name);
        //   jquery_1_11_3_min_p('#txtFrom').val(jsonData[i].PeriodFrom);   
        //   jquery_1_11_3_min_p('#txtTo').val(jsonData[i].PeriodTo);
         
        //    jquery_1_11_3_min_p('#txtBankCode').val(jsonData[i].SponsorBankCode);
        //   jquery_1_11_3_min_p('#txtUtilityCode').val(jsonData[i].UtilityCode);
        //    jquery_1_11_3_min_p('#txtBankName').val(jsonData[i].SponsorBankName);


        var CheckerRequired=data.Table[i].CheckerRequired;
        if(CheckerRequired==1)
                 {
                    this.RecheckTab=true;
                    this.MasterCorporateUpFormGroup.controls['recheckthepresentmentfileCh'].setValue(true);
                 // jquery_1_11_3_min_p('#divRecheck').prop('checked', true);
                  //jquery_1_11_3_min_p("#divPresentCheck").css('display', 'block');
                  }else if(CheckerRequired==0) 
                  {
                    this.RecheckTab=false;
                    this.MasterCorporateUpFormGroup.controls['recheckthepresentmentfileCh'].setValue(false);
                    
                  // jquery_1_11_3_min_p('#divRecheck').prop('checked', false);
                  // jquery_1_11_3_min_p("#divPresentCheck").css('display', 'none');
                  }
                  //if(jquery_1_11_3_min_p('#divRecheck').prop('checked', true))
                 // {
                 var CheckerRecheck=data.Table[i].CheckerRecheck;
                  if(CheckerRecheck==1)
                  {
                    
                    this.MasterCorporateUpFormGroup.controls['CheckerRequire'].setValue(true);
                //    jquery_1_11_3_min_p('input:radio[name="rdoCheck"]').filter('[value="1"]').prop('checked', true);
                  }
                  else
                  {
                //    jquery_1_11_3_min_p('input:radio[name="rdoCheck"]').filter('[value="2"]').prop('checked', true);
                this.MasterCorporateUpFormGroup.controls['CheckerRequire'].setValue(true);
                  }


                  var i = 0;
                 // jsonData = eval(result.d.Table2);
     
                 
                 // kendo_all_min_js("#ddlCountry").data("kendoDropDownList").value(data.Table2.CountryId);
                  this.MasterCorporateUpFormGroup.controls['Country'].setValue(data.Table2[i].CountryId);
             this.CountryFunction(data.Table2[i].CountryId);
               //BindddlState();
                 //kendo_all_min_js("#ddlState").data("kendoDropDownList").value(jsonData[i].StateId);
                 this.MasterCorporateUpFormGroup.controls['State'].setValue(data.Table2[i].StateId);
                 this.StateFun(data.Table2[i].StateId);
               //  BindddlCity();
                // kendo_all_min_js("#ddlCity").data("kendoDropDownList").value(jsonData[i].CityId);

                this.MasterCorporateUpFormGroup.controls['City'].setValue(data.Table2[i].CityId); 
                this.MasterCorporateUpFormGroup.controls['Address'].setValue(data.Table2[i].Address);
                this.MasterCorporateUpFormGroup.controls['MobileNo'].setValue(data.Table2[i].Mobile);
                this.MasterCorporateUpFormGroup.controls['Email'].setValue(data.Table2[i].Email);
                this.MasterCorporateUpFormGroup.controls['PinCode'].setValue(data.Table2[i].Pincode);
                

                //  jquery_1_11_3_min_p('#txtAddr1').val(jsonData[i].Address);
                //  jquery_1_11_3_min_p('#txtMobile').val(jsonData[i].Mobile);
                //  jquery_1_11_3_min_p('#txtEmail').val(jsonData[i].Email);
                //  jquery_1_11_3_min_p('#txtPinCode').val(jsonData[i].Pincode);
     
     
            //          i = 0;
            //       jsonData = eval(result.d.Table1);
            //        jquery_1_11_3_min_p("#LogoImg").attr('src', jsonData[i].ImagePath);
                  
            //    jquery_1_11_3_min_p('#lblFinalImage').html(jsonData[i].ImagePath);
                  i = 0;
                 // jsonData = eval(result.d.Table3);
     
                 this.MasterCorporateUpFormGroup.controls['UserName'].setValue(data.Table3[i].UserName);
                this.buttonDisabledBillingUserName = true; 
                  //jquery_1_11_3_min_p('#txtUsername').val(jsonData[i].UserName);
                // jquery_1_11_3_min_p('#txtUsername').attr('disabled', true);

                // var isoverprintmandate=jsonData[i].isoverprintmandate;
                // if(isoverprintmandate==1)
                // {
                
                // jquery_1_11_3_min_p('#chkOverPrintMandate').prop('checked', true);
                // }else  
                // {
                // jquery_1_11_3_min_p('#chkOverPrintMandate').prop('checked', false);
                // }

                // IsRefrenceCheck=jsonData[i].IsRefrenceCheck;
                // if(IsRefrenceCheck==1)
                // {
                
                // jquery_1_11_3_min_p('#RefCheck').prop('checked', true);
                // }else  
                // {
                // jquery_1_11_3_min_p('#RefCheck').prop('checked', false);
                // }


               // jsonData = eval(result.d.Table5);
                i = 0;
               for (var x = 0; x < data.Table5[i].length; x++) {
                //this.MasterCorporateUpFormGroup.controls['BillingUserName'].app
                //  $("#TableSponsorBankCode tbody tr td").append("<div class='flexiblewidth'> <label id='lblBankCode' class='control-label no-padding'>" + jsonData[i].name  + "</label> <span class='crossimgDiv'><img src='../images/cross.png' id='lnkremoveEmail' class='crosswidth no-padding' /></span></div>");
                i++;
               }
               //$('body').delegate('#TableSponsorBankCode tbody tr td').on('click', '#lnkremoveEmail', function () {
                 
                // RemovesponsorbankcodeFile(this);
                  // $(this).closest('span').parent().remove();
   
   
               //});


            //    jsonData = eval(result.d.Table12);
            //    i = 0;
            //     var Value=[];
            //   for ( x = 0; x < jsonData.length; x++) {
       
  
            //   jquery_1_11_3_min_p("#DivSponsorBankCodeFiles").append("<div id=" +jsonData[i].sponsorbankcode +" class='form-group'><label class='col-sm-1 col-md-1 col-xs-4 control-label no-padding' for='form-field-1'>" + jsonData[i].sponsorbankcode  +"</label><div class='col-sm-11 col-md-11 col-xs-8 no-padding spDiv'><input type='text' id='Text1' value='"+jsonData[i].FileName1 +"' class='' placeholder='File Name 1' /><input type='text' id='Text2' value='"+jsonData[i].FileName2 +"' class='' placeholder='File Name 2' /><input type='text' value='"+jsonData[i].FileName3 +"' id='Text3' class='' placeholder='File Name 3' /><input type='text' value='"+jsonData[i].FileName4 +"' id='Text4' class='' placeholder='File Name 4' /> <input type='text' value='"+jsonData[i].FileName6 +"' id='Text5' class='' placeholder='File Name 5' /><input type='text' id='Text6' value='"+jsonData[i].FileName8 +"' class='' placeholder='File Name 6' /></div></div>");
            //   i++;
            //   }
  
            //      jsonData = eval(result.d.Table11);
            //       i=0;
            //         jQuery.each(jsonData, function (rec) {
            //     jquery_1_11_3_min_p("#tblBankAmount tbody tr td").append("<div class='flexiblewidth'> <label id='lblBankId' style='display:none' class='control-label no-padding'>" + jsonData[i].bankid+"</label> <label id='lblBankAmount' class='control-label no-padding'>" +  jsonData[i].bankname+"_" + jsonData[i].amount + "</label> <span class='crossimgDiv'><img src='../images/cross.png' id='lnkremoveEmail' class='crosswidth no-padding' /></span></div>");
            //     i++;
            //         });
                
            //         jquery_1_11_3_min_p('body').delegate('#tblBankAmount tbody tr td').on('click', '#lnkremoveEmail', function () {
            //         jquery_1_11_3_min_p(this).closest('span').parent().remove();
            
            //         });

           // jsonData = eval(result.d.Table7);
    //         jquery_1_11_3_min_p('#debittype input').each(function () {
    //            var row = jquery_1_11_3_min_p(this);
    //             if(row["0"].name!="rdoNomDebit")
    //            {
    //             var i=0;
    //             jQuery.each(jsonData, function (rec) {
    //            if(row.siblings("span").text()==jsonData[i].debittype)
    //            {
    //            if(jsonData[i].isenable==true)
    //            {
    //            jquery_1_11_3_min_p(row). prop("checked", true);
    //            }else{
    //            jquery_1_11_3_min_p(row). prop("checked", false);
    //            }


    debugger;
    if(data.Table7[0].isenable==true)
    {
        this.MasterCorporateUpFormGroup.controls['FixedAmount_Ch'].setValue(true);
        // jquery_1_11_3_min_p(row). prop("checked", true);
    }
    else{
        this.MasterCorporateUpFormGroup.controls['FixedAmount_Ch'].setValue(false);
    }
    if(data.Table7[1].isenable==true)
    {
        this.MasterCorporateUpFormGroup.controls['MaximumAmount_Ch'].setValue(true);
        // jquery_1_11_3_min_p(row). prop("checked", true);
    }
    else{
        this.MasterCorporateUpFormGroup.controls['MaximumAmount_Ch'].setValue(false);
    }
   

               
    //            }
    //            i++;
    //            });
    //            }
    //            });

             
    //          jsonData = eval(result.d.Table8);
    //          jquery_1_11_3_min_p('#frequency input').each(function () {
    //        var row = jquery_1_11_3_min_p(this);
    //        if(row["0"].name!="rdoNomFrequency")
    //        { var i=0;
    //         jQuery.each(jsonData, function (rec) {
    //        if(row.siblings("span").text()==jsonData[i].frequency)
    //        {
    //        if(jsonData[i].isenable==true)
    //        {
    //        jquery_1_11_3_min_p(row). prop("checked", true);
    //        }else{
    //        jquery_1_11_3_min_p(row). prop("checked", false);
    //        }
           
    //        }
    //        i++;
    //        });
    //   }
    //        });


    debugger;
    if(data.Table8[0].isenable==true)
    {
        this.MasterCorporateUpFormGroup.controls['Monthly_Ch'].setValue(true);
        // jquery_1_11_3_min_p(row). prop("checked", true);
    }
    else{
        this.MasterCorporateUpFormGroup.controls['Monthly_Ch'].setValue(false);
    }
    if(data.Table8[1].isenable==true)
    {
        this.MasterCorporateUpFormGroup.controls['Quarterly_Ch'].setValue(true);
        // jquery_1_11_3_min_p(row). prop("checked", true);
    }
    else{
        this.MasterCorporateUpFormGroup.controls['Quarterly_Ch'].setValue(false);
    }
    if(data.Table8[2].isenable==true)
    {
        this.MasterCorporateUpFormGroup.controls['Half_Yearly_ChFun'].setValue(true);
        // jquery_1_11_3_min_p(row). prop("checked", true);
    }
    else{
        this.MasterCorporateUpFormGroup.controls['Half_Yearly_ChFun'].setValue(false);
    }
    if(data.Table8[3].isenable==true)
    {
        this.MasterCorporateUpFormGroup.controls['Yearly_Ch'].setValue(true);
        // jquery_1_11_3_min_p(row). prop("checked", true);
    }
    else{
        this.MasterCorporateUpFormGroup.controls['Yearly_Ch'].setValue(false);
    }
    if(data.Table8[4].isenable==true)
    {
        this.MasterCorporateUpFormGroup.controls['Presented_Ch'].setValue(true);
        // jquery_1_11_3_min_p(row). prop("checked", true);
    }
    else{
        this.MasterCorporateUpFormGroup.controls['Presented_Ch'].setValue(false);
    }


    //           jsonData = eval(result.d.Table9);
    //          jquery_1_11_3_min_p('#DivradioPeriod input').each(function () {
    //        var row = jquery_1_11_3_min_p(this);
    //        if(row["0"].name!="rdoPeriod")
    //        { var i=0;
    //         jQuery.each(jsonData, function (rec) {
    //        if(row.siblings("span").text()==jsonData[i].periodenableon)
    //        {
    //        if(jsonData[i].isenable==true)
    //        {
    //        jquery_1_11_3_min_p(row). prop("checked", true);
    //        }else{
    //        jquery_1_11_3_min_p(row). prop("checked", false);
    //        }
           
    //        }
    //        i++;
    //        });
    //   }
    //        });

    if(data.Table9[0].isenable==true)
    {
        this.MasterCorporateUpFormGroup.controls['To_Ch'].setValue(true);
        // jquery_1_11_3_min_p(row). prop("checked", true);
    }
    else{
        this.MasterCorporateUpFormGroup.controls['To_Ch'].setValue(false);
    }
    if(data.Table9[1].isenable==true)
    {
        this.MasterCorporateUpFormGroup.controls['UntillCancelled_Ch'].setValue(true);
        // jquery_1_11_3_min_p(row). prop("checked", true);
    }
    else{
        this.MasterCorporateUpFormGroup.controls['UntillCancelled_Ch'].setValue(false);
    }

    

    //jsonData = eval(result.d.Table13);
           i=0;
    
     //Avinash
if(data.Table13.length>0)
{
           var IschkPresentment=data.Table13[i].IsPresentment;
             if(IschkPresentment==1)
          {
            this.MasterCorporateUpFormGroup.controls['NachPresentment'].setValue(true);
            
            //jquery_1_11_3_min_p('#chkPresentment').prop('checked', true);
           }else 
           {
           //jquery_1_11_3_min_p('#chkPresentment').prop('checked', false);
           this.MasterCorporateUpFormGroup.controls['NachPresentment'].setValue(false);
           }
      if(data.Table13[i].Customerphnumber==1)
     {
        this.MasterCorporateUpFormGroup.controls['IsPhoneNumber'].setValue(true);
        
      //jquery_1_11_3_min_p('#chkhone').prop('checked', true);
     }

      if(data.Table13[i].Customeremailid==1)
     {
      //jquery_1_11_3_min_p('#chkemail').prop('checked', true);
      this.MasterCorporateUpFormGroup.controls['EmailId'].setValue(true);
     }

//jquery_1_11_3_min_p('#chkphysical').prop('checked', true);
if(data.Table13[i].Physical==1)
{
    this.MasterCorporateUpFormGroup.controls['IsPhysicalMandateCh'].setValue(true);
     // jquery_1_11_3_min_p('#chkphysical').prop('checked', true);
     //jquery_1_11_3_min_p("#divphysical").css("display","block");
     this.PhysicalTab=true;

      if(data.Table13[i].ValidateByCustomer==1)
     {
        this.MasterCorporateUpFormGroup.controls['ValidationByCustomer_Ch'].setValue(true);
        
      //jquery_1_11_3_min_p('#chkcustomer').prop('checked', true);
     }
      if(data.Table13[i].ValidateByCooperate==1)
     {
        this.MasterCorporateUpFormGroup.controls['ValidationByCorporate_Ch'].setValue(true);
        
     // jquery_1_11_3_min_p('#Chkcooperate').prop('checked', true);
     }
     
     if(data.Table13[i].OCR==1)
     {
       // this.MasterCorporateUpFormGroup.controls['ValidationByCorporate_Ch'].setValue(true);
      //jquery_1_11_3_min_p('#Chkocr').prop('checked', true);
     }
}
else
{
    // jquery_1_11_3_min_p('#chkphysical').prop('checked', false);
    this.PhysicalTab=false;
}
      if(data.Table13[i].PrintQR==1)
     {
        this.MasterCorporateUpFormGroup.controls['QRCode_Ch'].setValue(true);
     // jquery_1_11_3_min_p('input:radio[name="rdoQRLogo"]').filter('[value="1"]').prop('checked', true);
     }
     if(data.Table13[i].PrintLogo==1)
     {
        this.MasterCorporateUpFormGroup.controls['Logo_Ch'].setValue(true);
      //jquery_1_11_3_min_p('input:radio[name="rdoQRLogo"]').filter('[value="2"]').prop('checked', true);
     }
      if(data.Table13[i].Emandate==1)
     {
        
        this.MasterCorporateUpFormGroup.controls['IsEMandate'].setValue(true);
      //jquery_1_11_3_min_p('#chkEmandate').prop('checked', true);
     //jquery_1_11_3_min_p("#divEmandatemode").css("display","block");
     this.EMandateMode=true;

      if(data.Table13[i].NetBanking==1)
     {
      //jquery_1_11_3_min_p('#chknet').prop('checked', true);
      //this.NetBankingTab=true;
     }
      if(data.Table13[i].Debit==1)
     {
      //jquery_1_11_3_min_p('#chkdebit').prop('checked', true);
     }
     
     if(data.Table13[i].Aadhar==1)
     {
      //jquery_1_11_3_min_p('#chkaadhar').prop('checked', true);
     }
     }
      if(data.Table13[i].NetBanking==1)
     {
      //jquery_1_11_3_min_p('#chknet').prop('checked', true);
      //jquery_1_11_3_min_p("#divnetbanking").css("display","block");
      this.NetBankingTab=true;
      if(data.Table13[i].NetValidateMail==1)
     {
      //jquery_1_11_3_min_p('#Chknetmail').prop('checked', true);
     }
     if(data.Table13[i].NetManual==1)
     {
      //jquery_1_11_3_min_p('#Chknetmanual').prop('checked', true);
     }
     if(data.Table13[i].NetSMS==1)
     {
      //jquery_1_11_3_min_p('#chknetsms').prop('checked', true);
     }
     }
     if(data.Table13[i].Debit==1)
     {
      //jquery_1_11_3_min_p('#chkdebit').prop('checked', true);
     // jquery_1_11_3_min_p("#divdebit").css("display","block");
     this.DebitCardTab=true;
     
     if(data.Table13[i].DebitValidateMail==1)
     {
      //jquery_1_11_3_min_p('#Chkdebitmail').prop('checked', true);
     }
     if(data.Table13[i].DebitManual==1)
     {
      //jquery_1_11_3_min_p('#Chkdebitmanual').prop('checked', true);
     }
     if(data.Table13[i].DebitSMS==1)
     {
      //jquery_1_11_3_min_p('#chkdebitsms').prop('checked', true);
     }

     }
      if(data.Table13[i].Aadhar==1)
     {
      //jquery_1_11_3_min_p('#chkaadhar').prop('checked', true);
      //jquery_1_11_3_min_p("#divaadhar").css("display","block");
      this.AadhaarCardTab=true;

       if(data.Table13[i].AadharValidateMail==1)
     {
     // jquery_1_11_3_min_p('#chkaadharmail').prop('checked', true);
     }
      if(data.Table13[i].AadharManual==1)
     {
      //jquery_1_11_3_min_p('#chkaadharmanual').prop('checked', true);
     }
      if(data.Table13.AadharSMS==1)
     {
      //jquery_1_11_3_min_p('#chkaadharsms').prop('checked', true);
     }
     }
     //var=jsonData[i].IsAccountValidation;
 if(data.Table13[i].IsAccountValidation==1)
          {
                   // jquery_1_11_3_min_p('#chkaccountvalidation').prop('checked', true);
           }else  
           {
           // jquery_1_11_3_min_p('#chkaccountvalidation').prop('checked', false);
           }


          // jsonData = eval(result.d.Table10);*******************************************************************
        //    jquery_1_11_3_min_p('#debitto input').each(function () {
        //     var row = jquery_1_11_3_min_p(this);
        //     if(row["0"].name!="rdoNomGender")
        //     { var i=0;
        //     jQuery.each(jsonData, function (rec) {
        //     if(row.siblings("span").text()==jsonData[i].todebit)
        //     {
        //     if(jsonData[i].isenable==true)
        //     {
        //     jquery_1_11_3_min_p(row). prop("checked", true);
        //     }else{
        //     jquery_1_11_3_min_p(row). prop("checked", false);
        //     }
            
        //     }
        //     i++;
        //     });
        //     }
        //  });

          // jsonData = eval(result.d.Table10);*******************************************************************
        //    jquery_1_11_3_min_p('#debitto input').each(function () {
        //     var row = jquery_1_11_3_min_p(this);
        //     if(row["0"].name!="rdoNomGender")
        //     { var i=0;
        //     jQuery.each(jsonData, function (rec) {
        //     if(row.siblings("span").text()==jsonData[i].todebit)
        //     {
           // var i=0;
            debugger;
            if(data.Table10[0].isenable==true)
            {
                this.MasterCorporateUpFormGroup.controls['SB_Ch'].setValue(true);
                // jquery_1_11_3_min_p(row). prop("checked", true);
            }
            else{
                this.MasterCorporateUpFormGroup.controls['SB_Ch'].setValue(false);
            }
            if(data.Table10[1].isenable==true)
            {
                this.MasterCorporateUpFormGroup.controls['CA_Ch'].setValue(true);
                // jquery_1_11_3_min_p(row). prop("checked", true);
            }
            else{
                this.MasterCorporateUpFormGroup.controls['CA_Ch'].setValue(false);
            }
            if(data.Table10[2].isenable==true)
            {
                this.MasterCorporateUpFormGroup.controls['CC_Ch'].setValue(true);
                // jquery_1_11_3_min_p(row). prop("checked", true);
            }
            else{
                this.MasterCorporateUpFormGroup.controls['CC_Ch'].setValue(false);
            }
            if(data.Table10[3].isenable==true)
            {
                this.MasterCorporateUpFormGroup.controls['SB_NRE_Ch'].setValue(true);
                // jquery_1_11_3_min_p(row). prop("checked", true);
            }
            else{
                this.MasterCorporateUpFormGroup.controls['SB_NRE_Ch'].setValue(false);
            }
            if(data.Table10[4].isenable==true)
            {
                this.MasterCorporateUpFormGroup.controls['SB_NRO_Ch'].setValue(true);
                // jquery_1_11_3_min_p(row). prop("checked", true);
            }
            else{
                this.MasterCorporateUpFormGroup.controls['SB_NRO_Ch'].setValue(false);
            }
            if(data.Table10[5].isenable==true)
            {
                this.MasterCorporateUpFormGroup.controls['Other_Ch'].setValue(true);
                // jquery_1_11_3_min_p(row). prop("checked", true);
            }
            else{
                this.MasterCorporateUpFormGroup.controls['Other_Ch'].setValue(false);
            }
            
        //     }
        //     i++;
        //     });
        //     }
        //  });



    //    jsonData = eval(result.d.Table6);
    //     i=0;
    //     jQuery.each(jsonData, function (rec) {
    //     if(jsonData[i].PaymentMode.toString().trim() =='Cash')
    //     {
    //     jquery_1_11_3_min_p('#Chkmode1').prop('checked', true);
    //     }
    //     if(jsonData[i].PaymentMode.toString().trim() =='Cheque')
    //     {
    //     jquery_1_11_3_min_p('#Chkmode2').prop('checked', true);
    //     }
    //     if(jsonData[i].PaymentMode.toString().trim() =='DD')
    //     {
    //     jquery_1_11_3_min_p('#Chkmode3').prop('checked', true);
    //     }
    //     if(jsonData[i].PaymentMode.toString().trim() =='E')
    //     {
    //     jquery_1_11_3_min_p('#Chkmode4').prop('checked', true);
    //     }
    //     i++;
    //     });


var categorycode = [];
             i = 0;
            // jsonData = eval(result.d)
            //  if(data.Table.length>0)
            // {
            // jQuery.each(jsonData.Table14, function (rec) {
            //     categorycode[i] = jsonData.Table14[i].categoryId;
            //     i++;
            // });
            // }
           
            //kendo_all_min_js("#ddlcategorycode").data("kendoMultiSelect").value(categorycode);
            // this.MasterCorporateUpFormGroup.controls['categorycodeid'].setValue(data.Table14.data.Table15[0].categoryId);
            this.MasterCorporateUpFormGroup.controls['categorycodeidNach'].setValue(data.Table14[0].categoryId);

             i = 0;
            // jsonData = eval(result.d.Table15)
             if(data.Table15.length>0)
            {
            
        // kendo_all_min_js("#txtEntityBusinessCode").data("kendoDropDownList").value(jsonData[i].categoryId);
                this.MasterCorporateUpFormGroup.controls['categorycodeid'].setValue(data.Table15[0].categoryId);
            }

             i = 0;
            // jsonData = eval(result.d.Table16);
            if(data.Table16.length>0)
            {
                
            //jquery_1_11_3_min_p('#txtpan').val(data.Table16.PAN_No);
            this.MasterCorporateUpFormGroup.controls['PAN'].setValue(data.Table16[i].PAN_No);
           // jquery_1_11_3_min_p('#txttan').val(data.Table16.TAN_No);
            this.MasterCorporateUpFormGroup.controls['TAN'].setValue(data.Table16[i].TAN_No);
            //jquery_1_11_3_min_p('#txtgstin').val(data.Table16.GSTIN_No);
            this.MasterCorporateUpFormGroup.controls['GST'].setValue(data.Table16[i].GSTIN_No);
            //jquery_1_11_3_min_p('#txtbillingaddress').val(data.Table16.BillingAddress);
            this.MasterCorporateUpFormGroup.controls['BillingAddress'].setValue(data.Table16[i].BillingAddress);
            //jquery_1_11_3_min_p('#txtdebitaccno').val(data.Table16.ChargeDebitAcNo);
            this.MasterCorporateUpFormGroup.controls['BillingChargeDebitAccNo'].setValue(data.Table16[i].ChargeDebitAcNo);
            //jquery_1_11_3_min_p('#txtcorpid').val(data.Table16.BankCorporateId);
            this.MasterCorporateUpFormGroup.controls['BillingBankCorpId'].setValue(data.Table16[i].BankCorporateId);
            //jquery_1_11_3_min_p('#txtbranchname').val(data.Table16.BranchName);
            this.MasterCorporateUpFormGroup.controls['BillingBranchName'].setValue(data.Table16[i].BranchName);
            //jquery_1_11_3_min_p('#txtbranchcode').val(data.Table16.BranchCode);
            this.MasterCorporateUpFormGroup.controls['BillingBranchCode'].setValue(data.Table16[i].BranchCode);
           // jquery_1_11_3_min_p('#txtbranchifsc').val(data.Table16.IFSC);
            this.MasterCorporateUpFormGroup.controls['BillingIFSC'].setValue(data.Table16[i].IFSC);
            //jquery_1_11_3_min_p('#txtbillingcontactperson').val(data.Table16.BillingContactPerson);
            this.MasterCorporateUpFormGroup.controls['BillContractPerson'].setValue(data.Table16[i].BillingContactPerson);
            //jquery_1_11_3_min_p('#txtdesignation').val(data.Table16.Designation);
            this.MasterCorporateUpFormGroup.controls['Designation'].setValue(data.Table16[i].Designation);
           // jquery_1_11_3_min_p('#txtcontactno').val(data.Table16.ContactNo);
            this.MasterCorporateUpFormGroup.controls['BillingContactNo'].setValue(data.Table16[i].ContactNo);
           // jquery_1_11_3_min_p('#txtfaxno').val(data.Table16.FaxNo);
            this.MasterCorporateUpFormGroup.controls['BillFaxNo'].setValue(data.Table16[i].FaxNo);
            if(data.Table16[i].ArrangementInDays==0)
            {
                this.MasterCorporateUpFormGroup.controls['Arrangementdays'].setValue(0);
            }
            else
            {
           // jquery_1_11_3_min_p('#ddlarrangementdays').val(data.Table16.ArrangementInDays);
           this.MasterCorporateUpFormGroup.controls['Arrangementdays'].setValue(data.Table16[i].ArrangementInDays);
            }
           // jquery_1_11_3_min_p('#txtpickupaddr').val(data.Table16.PickUpLocationAddress);
            this.MasterCorporateUpFormGroup.controls['BillingPicupLocationAddress'].setValue(data.Table16[i].PickUpLocationAddress);
            //jquery_1_11_3_min_p('#txtpickupcontactperson').val(data.Table16.PickUpContactPerson);
            this.MasterCorporateUpFormGroup.controls['BillingPicupContactPerson'].setValue(data.Table16[i].PickUpContactPerson);
            //jquery_1_11_3_min_p('#txtmailprimary').val(data.Table16.CommunicationMailPrimary);
            this.MasterCorporateUpFormGroup.controls['BillingCommunicationMailPrimary'].setValue(data.Table16[i].CommunicationMailPrimary);
            // this.MasterCorporateUpFormGroup.controls['BillingCommunicationMailBilling'].setValue(data.Table16[i].CommunicationMailPrimary);
            //kendo_all_min_js("#ddlpsm").data("kendoDropDownList").text(data.Table16.PSM_Name);
        // this.MasterCorporateUpFormGroup.controls['PSMId'].setValue(data.Table16[i].PSM_Name);
            //kendo_all_min_js("#ddlregionalmgr").data("kendoDropDownList").text(data.Table16.RM_Name);
            this.MasterCorporateUpFormGroup.controls['PSMId'].patchValue({PSM_Name : data.Table16[i].PSM_Name})
           this.MasterCorporateUpFormGroup.controls['RMId'].setValue(data.Table16[i].RM_Name);
          // this.MasterCorporateUpFormGroup.controls['RMId'].patchValue({RM_Name : data.Table16[i].RM_Name})
           // kendo_all_min_js("#ddlsettlementtype").data("kendoDropDownList").text(data.Table16.SettlementType);
            this.MasterCorporateUpFormGroup.controls['SettlementTypeId'].setValue(data.Table16[i].SettlementType);
           //this.MasterCorporateUpFormGroup.controls['SettlementTypeId'].patchValue({SettlementType : data.Table16[i].SettlementType})
            // kendo_all_min_js("#ddlbusinesssegment").data("kendoDropDownList").text(data.Table16.BusinessSegmentName);
             this.MasterCorporateUpFormGroup.controls['BusinessSegmentId'].setValue(data.Table16[i].BusinessSegmentName);
            // this.MasterCorporateUpFormGroup.controls['BusinessSegmentId'].patchValue({BusinessSegmentName : data.Table16[i].BusinessSegmentName})
            }

             i = 0;
            // jsonData = eval(result.d.Table17);
            if(data.Table17.length>0){
            if(data.Table17[i].Ip!="" || data.Table17[i].Url!="" || data.Table17[i].UserName !="" || data.Table17[i].Password !="")
            {
               // jquery_1_11_3_min_p("#chkIsRequired").prop("checked",true);
               this.MasterCorporateUpFormGroup.controls['IsRequired'].setValue(true);
               
                ////jquery_1_11_3_min_p('#txtip').val(jsonData[i].Ip);
                this.MasterCorporateUpFormGroup.controls['BillingIP'].setValue(data.Table17[i].Ip);
               // jquery_1_11_3_min_p('#txturl').val(jsonData[i].Url);
               this.MasterCorporateUpFormGroup.controls['BillingURL'].setValue(data.Table17[i].Url);
               // jquery_1_11_3_min_p('#txtuser').val(jsonData[i].UserName);
               this.MasterCorporateUpFormGroup.controls['BillingUserName'].setValue(data.Table17[i].UserName);
               // jquery_1_11_3_min_p('#txth2hpassword').val(jsonData[i].Password);
               this.MasterCorporateUpFormGroup.controls['BillingPassword'].setValue(data.Table17[i].Password);
               // jquery_1_11_3_min_p("#h2hDetails").css("display","block");
               this.DivCheckRequired=true;
            }
            else{
               // jquery_1_11_3_min_p("#chkIsRequired").prop("checked",false);
            }
            }


// var jsonData18=eval(result.d.Table18);
// if(jsonData18.length >0)
// { 
// jquery_1_11_3_min_p("#Table2 tbody tr td").empty();
// for( i=0;i<jsonData18.length;i++)
// {
// jquery_1_11_3_min_p("#divbillingmail").css("display","block");

// jquery_1_11_3_min_p("#Table2 tbody tr td").append("<div class='flexiblewidth'> <label id='lbladhoc' class='control-label no-padding'>" + jsonData18[i].EmailId + "</label> <span class='crossimgDiv'><img src='../images/cross.png' id='lnkremoveadhoc' class='crosswidth no-padding' /></span></div>");
// }
// }
// else{
// jquery_1_11_3_min_p("#Table2 tbody tr td").empty();
// //   jquery_1_11_3_min_p('body').delegate('#Table2 tbody tr td').each(function() {

// //        jquery_1_11_3_min_p(this).closest('span').parent().remove();
// //         });
// jquery_1_11_3_min_p("#divbillingmail").css("display","none");


// }

// var jsonData19=eval(result.d.Table19);
// if(jsonData19.length >0)
// { 
// jquery_1_11_3_min_p("#tblcontactpersondetail tbody tr td").empty();
// for( i=0;i<jsonData19.length;i++)
// {


// jquery_1_11_3_min_p("#tblcontactpersondetail tbody tr td").append("<div class='flexiblewidth'> <label id='lblcontactperson' class='control-label no-padding'>" + jsonData19[i].name1 + "</label> <span class='crossimgDiv'><img src='../images/cross.png' id='lnkremovecontact' class='crosswidth no-padding' /></span></div>");
// }
// }
// else{
// jquery_1_11_3_min_p("#tblcontactpersondetail tbody tr td").empty();
// jquery_1_11_3_min_p('body').delegate('#tblcontactpersondetail tbody tr td').each(function() {
// jquery_1_11_3_min_p(this).closest('span').parent().remove();         });



// }

// jquery_1_11_3_min_p('body').delegate('#tblcontactpersondetail tbody tr td').on('click', '#lnkremovecontact', function () {
      
     
//         jquery_1_11_3_min_p(this).closest('span').parent().remove();


//     });

//     var jsonData20=eval(result.d.Table20);
// if(jsonData20.length >0)
// { 
// for( i=0;i<jsonData20.length;i++)
//  {
//     if(jsonData20[i].DocumentPath!="")
//         {
//          jquery_1_11_3_min_p("#imgshow"+jsonData20[i].DocId+"").attr("src",jsonData20[i].DocumentPath);
//         }
//         else{
        
//        // jquery_1_11_3_min_p("#imgshow"+jsonData19[i].DocId+"").attr("src","../images/getData.png");
//         }

// }
// }

  

}
    






   



         }
            // this.BankData = data.Table1;
            // this.EntityBusinessCodeData = data.Table2;

            // this.EntityId = data.EntityId;
            // this.MasterCorporateUpFormGroup.controls['Code'].setValue(data.Code);
            // this.MasterCorporateUpFormGroup.controls['EntityName'].setValue(data.EntityName);
            // this.MasterCorporateUpFormGroup.controls['PhoneNo'].setValue(data.PhoneNo);
            // this.MasterCorporateUpFormGroup.controls['EmailID'].setValue(data.EmailId);
            // this.MasterCorporateUpFormGroup.controls['DesignationId'].setValue(data.DesignationId);
            // this.MasterCorporateUpFormGroup.controls['IsActive'].setValue((data.IsActive == 'Active' ? true:false));
        });
    

    //this.buttonDisabledDelete = false;
   // this.buttonDisabledReset = false;
    this.Temp = 2;

}
newClick() {
  debugger;
  
  this.Temp=1;
   this.isMainGridShow=false;this.isMasterEntryFormShow=true;}
editClick() {
  
}
saveClick() {

}
backClick() {
  debugger;
  this.MasterCorporateUpFormGroup.reset();
  this.isMainGridShow=true;this.isMasterEntryFormShow=false;}
  BindUtility() {
      debugger;
    this.ESService.BindUtility().subscribe(
        (data) => {
            this.utilitycode = data.Table;
        });
    }
    numberOnly(event): boolean {
        debugger;
        const charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
          return false;
        }
        return true;
    
      }
  BindCategoryWithRelated() {
      debugger;
    this.ESService.BindCategoryWithRelated().subscribe(
        (data) => {
            this.categoryMaster = data.Table;
            this.regionalMaster = data.Table1;
            this.psmMaster = data.Table2;

            this.businessSegmentMaster = data.Table3;
            this.settlementTypeMaster = data.Table4;
        });
    }
BindCountryAndBank() {
this.ESService.BindCountryAndBank().subscribe(
    (data) => {
        this.CountryData = data.Table;
        this.BankData = data.Table1;
        this.EntityBusinessCodeData = data.Table2;
    });
}
CountryFunction(CountryId) {
this.ESService.BindState(CountryId).subscribe(
    (data) => {
        this.StateData = data.Table;
    
    });
}
StateFun(StateId){
this.ESService.BindCity(StateId).subscribe(
    (data) => {
        this.CityData = data.Table;
    });
}
BingGrid() {
    debugger;
this.Preloader = true;
this.ESService.BingGrid().subscribe(
    (data) => {
        this.Preloader = false;
        this.MainGridData = data.Table;
    });
}
NewFun() {
this.MainGideDiv = false;
this.EntityFormDiv = true;
this.liBack = false;
this.liSave = false;
}
BackFun() {
this.MainGideDiv = true;
this.EntityFormDiv = false;
this.liBack = true;
this.liSave = true;
}
get AllFields() { return this.MasterCorporateUpFormGroup.controls; }

IsEMandateFun() {
if (this.AllFields.IsEMandate.value == true) {
    this.EMandateMode = true;
}
else {
    this.EMandateMode = false;
}
}
NetBankingFun() {
if (this.AllFields.NetBankingCh.value == true) {
    this.NetBankingTab = true;
}
else {
    this.NetBankingTab = false;
}
}
DebitCardFun() {
if (this.AllFields.DebitCardCh.value == true) {
    this.DebitCardTab = true;
}
else {
    this.DebitCardTab = false;
}
}
AadhaarCardFun() {
if (this.AllFields.AadhaarCardCh.value == true) {
    this.AadhaarCardTab = true;
}
else {
    this.AadhaarCardTab = false;
}
}
ActivePaymentModeFun() {
alert(this.AllFields.ActivePaymentModeCh.value);
if (this.AllFields.ActivePaymentModeCh.value == true) {
    alert("true");
    this.ActivePaymentModeTab = true;
   
}
else {
    alert("false");
    this.ActivePaymentModeTab = false;
}
}

IsPhysicalMandateFun() {
if (this.AllFields.IsPhysicalMandateCh.value == true) {
    this.PhysicalTab = true;
}
else {
    this.PhysicalTab = false;
}
}
IsThirdTransactionFun() {
if (this.AllFields.IsThirdTransactionCh.value == true) {
    this.IsThirdTransactionTab = true;
}
else {
    this.IsThirdTransactionTab = false;
}
}
selectallFun(event) {
if (event.target.checked) {
    this.isSelected = true;
}
else {
    this.isSelected = false;
}
}
IsValidationCountEnableFun() {
if (this.AllFields.IsValidationCountEnableCh.value == true) {
    this.IsValidationCountEnableTab = true;
}
else {
    this.IsValidationCountEnableTab = false;
}
}
RecheckthepresentmentfileFun() {
if (this.AllFields.recheckthepresentmentfileCh.value == true) {
    this.RecheckTab = true;
}
else {
    this.RecheckTab = false;
}
}
//Added by Bibhu on 19May2020
IsRequiredFun() {
debugger;
if (this.AllFields.IsRequired.value == true) {
    this.DivCheckRequired = true;
}
else {
    this.DivCheckRequired = false;
}
}
isFieldValid(field: string) {
    return !this.MasterCorporateUpFormGroup.get(field).valid && this.MasterCorporateUpFormGroup.get(field).touched;
}
displayFieldCss(field: string) {
    return {
        'validate': this.isFieldValid(field),
    };
}


// UpdateEmployee() {
//     this._documentService.UpdateEmployee(JSON.stringify(this.EmployeeForm.value), this.EmpId).subscribe(
//         (data) => {
//             if (this.employee.Flag = 1) {
//                 this.message = 'Record updated Successfully';
//                 alert(this.message);
//                 //this.buttonDisabledDelete = true;
//                 this.buttonDisabledReset = false;
//             }
//             else {
//                 this.message = 'Invalid Credential';
//                 alert(this.message);
//             }
//             this.employee = data;
//             this.Emplist = this.employee.dataList;
//             //this.EmployeeForm.reset();
//             this.ResetEmployee();
//             this.loadAllEmployees();
//         }
//     )
// }
SaveFun() {

    debugger;
    if(this.MasterCorporateUpFormGroup.valid)
    {
        this.allFieldOfForm = this.MasterCorporateUpFormGroup.value;

        this.SponsoredBankcode = this.AllFields.BankCode.value;
        this.FileNameArray.push(this.SponsoredBankcode); 
        this.FileNameArray.push(this.allFieldOfForm.FileName1); 
        this.FileNameArray.push(this.allFieldOfForm.FileName2);  
        this.FileNameArray.push(this.allFieldOfForm.FileName3); 
        this.FileNameArray.push(this.allFieldOfForm.FileName4); 
        this.FileNameArray.push(this.allFieldOfForm.FileName5); 
        this.FileNameArray.push(this.allFieldOfForm.FileName6); 
        console.log(this.FileNameArray);


        //const data = this.MasterCorporateUpFormGroup.value;

        this.allFieldOfForm.dtBankCode=this.SponsorBankCodeArray;
        this.allFieldOfForm.XmlFileName=this.FileNameArray;
        this.allFieldOfForm.dtcontactperson=this.FinaceAndBillingCodeArray;

        //console.log(data);
        // this.XmlFileName="<dtXml><dtXml SponsorBankCode='"+this.SponsoredBankcode+"' FileName1=''"+data.FileName1+"' FileName2='"+data.FileName2+"' FileName3='"+data.FileName3+"' FileName4='"+data.FileName4+"' FileName5='"+data.FileName5+"' FileName6='"+data.FileName6+"'  /></dtXml>";
        // console.log(this.XmlFileName);



        // this.corporateSetUp_XmlFileName.SponsorBankCode=this.SponsoredBankcode;
        // this.corporateSetUp_XmlFileName.FileName1=data.FileName1;
        // this.corporateSetUp_XmlFileName.FileName2=data.FileName2;
        // this.corporateSetUp_XmlFileName.FileName3=data.FileName3;
        // this.corporateSetUp_XmlFileName.FileName4=data.FileName4;
        // this.corporateSetUp_XmlFileName.FileName5=data.FileName5;
        // this.corporateSetUp_XmlFileName.FileName6=data.FileName6;
        // // this.dtBankCode="<dtXml><dtXml SponsorBankName ='"+this.AllFields.BankName.value+"' SponsorBankcode ='"+this.AllFields.BankCode.value+"' IFSC ='"+this.AllFields.IFSC.value+"' UtilityCode ='"+this.AllFields.UtilityCode.value+"' AccountNumber ='"+this.AllFields.AccountNumber.value+"'  /></dtXml>";
        //  console.log(this.corporateSetUp_XmlFileName);


        //this.ESService.SaveData(this.allFieldOfForm,this.corporateSetUp_dtBank,this.corporateSetUp_XmlFileName,this.corporateSetUp_dtContactPerson).subscribe(
            if (this.Temp == 1) {
                this.ESService.SaveData(JSON.stringify(this.allFieldOfForm)).subscribe(
                    (data) => {
                        this.SaveResultData = data.Table;
                        if(this.SaveResultData[0].Result==1){
                            alert("Entity created sucessfully !");
                            this.backClick();
                            this.BingGrid();
                            this.MasterCorporateUpFormGroup.reset();
                        }
                        else if(this.SaveResultData[0].Result==-1){
                            alert("User already Exist");
                        }
                        else if(this.SaveResultData[0].Result == '' || this.SaveResultData[0].Result==null){
                            alert("error");}
                        // else {
                        //     this.showModalsave = true;
                        // }
        
                    
                    // console.log(data);
                        //console.log(this.SaveResultData );
                    });
            }
            else {

                this.allFieldOfForm = this.MasterCorporateUpFormGroup.value;

                this.SponsoredBankcode = this.AllFields.BankCode.value;
                this.FileNameArray.push(this.SponsoredBankcode); 
                this.FileNameArray.push(this.allFieldOfForm.FileName1); 
                this.FileNameArray.push(this.allFieldOfForm.FileName2);  
                this.FileNameArray.push(this.allFieldOfForm.FileName3); 
                this.FileNameArray.push(this.allFieldOfForm.FileName4); 
                this.FileNameArray.push(this.allFieldOfForm.FileName5); 
                this.FileNameArray.push(this.allFieldOfForm.FileName6); 
                console.log(this.FileNameArray);
        
        
                //const data = this.MasterCorporateUpFormGroup.value;
        
                this.allFieldOfForm.dtBankCode=this.SponsorBankCodeArray;
                this.allFieldOfForm.XmlFileName=this.FileNameArray;
                this.allFieldOfForm.dtcontactperson=this.FinaceAndBillingCodeArray;
              //  this._documentService.UpdateEmployee(JSON.stringify(this.EmployeeForm.value), this.EmpId).subscribe(
                this.ESService.UpdateData(JSON.stringify(this.allFieldOfForm), this._EntityId).subscribe(
                    (data) => {
                        this.SaveResultData = data.Table;
                        if(this.SaveResultData[0].Result==1){
                            alert("Entity updated sucessfully !");
                            this.backClick();
                            this.BingGrid();
                            this.MasterCorporateUpFormGroup.reset();
                        }
                        else if(this.SaveResultData[0].Result==-1){
                            alert("User already Exist");
                        }
                        else if(this.SaveResultData[0].Result == '' || this.SaveResultData[0].Result==null){
                            alert("error");}
                        // else {
                        //     this.showModalsave = true;
                        // }
        
                    
                    // console.log(data);
                        //console.log(this.SaveResultData );
                    });
            }
            
    }
    else {
        this.validateAllFormFields(this.MasterCorporateUpFormGroup);
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
SB_ChFun(){
if (this.AllFields.SB_Ch.value == true) {
    this.SB_Radio = true;
}
else {
    this.SB_Radio = false;
}
}
CA_ChFun(){
if (this.AllFields.CA_Ch.value == true) {
    this.CA_Radio = true;
}
else {
    this.CA_Radio = false;
}
}
CC_ChFun(){
if (this.AllFields.CC_Ch.value == true) {
    this.CC_Radio = true;
}
else {
    this.CC_Radio = false;
}
}
SB_NRE_ChFun(){
if (this.AllFields.SB_NRE_Ch.value == true) {
    this.SB_NRE_Radio = true;
}
else {
    this.SB_NRE_Radio = false;
}
}
SB_NRO_ChFun(){
if (this.AllFields.SB_NRO_Ch.value == true) {
    this.SB_NRO_Radio = true;
}
else {
    this.SB_NRO_Radio = false;
} 
}
Other_ChFun(){
if (this.AllFields.Other_Ch.value == true) {
    this.Other_Radio = true;
}
else {
    this.Other_Radio = false;
} 
}
Monthly_ChFun(){
if (this.AllFields.Monthly_Ch.value == true) {
    this.Monthly_Radio = true;
}
else {
    this.Monthly_Radio = false;
} 
}
Quarterly_ChFun(){
if (this.AllFields.Quarterly_Ch.value == true) {
    this.Quarterly_Radio = true;
}
else {
    this.Quarterly_Radio = false;
}
}
Half_Yearly_ChFun(){
if (this.AllFields.Half_Yearly_Ch.value == true) {
    this.Half_Yearly_Radio = true;
}
else {
    this.Half_Yearly_Radio = false;
}
}
Yearly_ChFun(){
if (this.AllFields.Yearly_Ch.value == true) {
    this.Yearly_Radio = true;
}
else {
    this.Yearly_Radio = false;
}
}
Presented_ChFun(){
if (this.AllFields.Presented_Ch.value == true) {
    this.Presented_Radio = true;
}
else {
    this.Presented_Radio = false;
}
}
FixedAmount_ChFun(){
if (this.AllFields.FixedAmount_Ch.value == true) {
    this.FixedAmount_Radio = true;
}
else {
    this.FixedAmount_Radio = false;
}
}
MaximumAmount_ChFun(){
if (this.AllFields.MaximumAmount_Ch.value == true) {
    this.MaximumAmount_Radio = true;
}
else {
    this.MaximumAmount_Radio = false;
} 
}
To_ChFun(){
if (this.AllFields.To_Ch.value == true) {
    this.To_Radio = true;
}
else {
    this.To_Radio = false;
}   
}
UntillCancelled_ChFun(){
if (this.AllFields.UntillCancelled_Ch.value == true) {
    this.UntillCancelled_Radio = true;
}
else {
    this.UntillCancelled_Radio = false;
} 
}

SponCodBankAddFun() {
// alert("Add");
debugger;
this.DivSponsorCode=true;
this.i += 1;
//this.SponsorBankCodeArray.push(this.i);
this.SponsoredBankcode = this.AllFields.BankCode.value;
this.SponsorBankCodeArray.push(this.AllFields.BankName.value); 
this.SponsorBankCodeArray.push(this.AllFields.BankCode.value);  
this.SponsorBankCodeArray.push(this.AllFields.UtilityCode.value); 
this.SponsorBankCodeArray.push(this.AllFields.IFSC.value);
this.SponsorBankCodeArray.push(this.AllFields.AccountNumber.value);
console.log(this.SponsorBankCodeArray);
// this.dtBankCode="<dtXml><dtXml SponsorBankName ='"+this.AllFields.BankName.value+"' SponsorBankcode ='"+this.AllFields.BankCode.value+"' IFSC ='"+this.AllFields.IFSC.value+"' UtilityCode ='"+this.AllFields.UtilityCode.value+"' AccountNumber ='"+this.AllFields.AccountNumber.value+"'  /></dtXml>";
// console.log(this.dtBankCode);

this.corporateSetUp_dtBank.SponsorBankcode=this.SponsoredBankcode;
this.corporateSetUp_dtBank.SponsorBankName=this.AllFields.BankName.value;
this.corporateSetUp_dtBank.UtilityCode=this.AllFields.UtilityCode.value;
this.corporateSetUp_dtBank.IFSC=this.AllFields.IFSC.value;
this.corporateSetUp_dtBank.AccountNumber=this.AllFields.AccountNumber.value;

// this.dtBankCode="<dtXml><dtXml SponsorBankName ='"+this.AllFields.BankName.value+"' SponsorBankcode ='"+this.AllFields.BankCode.value+"' IFSC ='"+this.AllFields.IFSC.value+"' UtilityCode ='"+this.AllFields.UtilityCode.value+"' AccountNumber ='"+this.AllFields.AccountNumber.value+"'  /></dtXml>";
 console.log(this.corporateSetUp_dtBank);


}
FinaceAndBillingAddFun() {
    // alert("Add");
    debugger;
    this.DivFinaceAndBilling=true;
    this.i += 1;
    //this.SponsorBankCodeArray.push(this.i);
   // this.FinanceAndBillingcode = this.AllFields.FinaceAndBillingName.value;
    this.FinaceAndBillingCodeArray.push(this.AllFields.FinaceAndBillingName.value); 
    this.FinaceAndBillingCodeArray.push(this.AllFields.FinaceAndBillingDesignation.value);  
    this.FinaceAndBillingCodeArray.push(this.AllFields.FinaceAndBillingContactNo.value); 
    this.FinaceAndBillingCodeArray.push(this.AllFields.FinaceAndBillingFaxNo.value);
    this.FinaceAndBillingCodeArray.push(this.AllFields.FinaceAndBillingAddress.value);
    console.log(this.FinaceAndBillingCodeArray);

    // this.dtcontactperson="< dtXml >< dtXml ContactPersonName = '"+this.AllFields.FinaceAndBillingName.value+"' Designation = '"+this.AllFields.FinaceAndBillingDesignation.value+"' ContactNo = '"+this.AllFields.FinaceAndBillingContactNo.value+"' FaxNo = '"+this.AllFields.FinaceAndBillingFaxNo.value+"' Address = '"+this.AllFields.FinaceAndBillingAddress.value+"' /></ dtXml >";
    // console.log(this.dtcontactperson);

    
this.corporateSetUp_dtContactPerson.ContactPersonName=this.AllFields.FinaceAndBillingName.value;
this.corporateSetUp_dtContactPerson.Designation=this.AllFields.FinaceAndBillingDesignation.value;
this.corporateSetUp_dtContactPerson.ContactPersonName=this.AllFields.FinaceAndBillingContactNo.value;
this.corporateSetUp_dtContactPerson.FaxNo=this.AllFields.FinaceAndBillingFaxNo.value;
this.corporateSetUp_dtContactPerson.Address=this.AllFields.FinaceAndBillingAddress.value;

// this.dtBankCode="<dtXml><dtXml SponsorBankName ='"+this.AllFields.BankName.value+"' SponsorBankcode ='"+this.AllFields.BankCode.value+"' IFSC ='"+this.AllFields.IFSC.value+"' UtilityCode ='"+this.AllFields.UtilityCode.value+"' AccountNumber ='"+this.AllFields.AccountNumber.value+"'  /></dtXml>";
 console.log(this.corporateSetUp_dtContactPerson);
    }

ConvertToCSV(objArray) {
this.HeaderArray = {
    SrNo: "Sr No.", Code: "Code", Name: "Name", SponsorBankName: "Sponsor Bank Name"    
}
var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
var str = '';
var row = "";

for (var index in objArray[0]) {
    //Now convert each value to string and comma-separated
    row += index + ',';
}
row = row.slice(0, -1);
//append Label row with line break
str += row + '\r\n';

for (var i = 0; i < array.length; i++) {
    var line = '';

    if (i == 0) {
        for (var index in this.HeaderArray) {
            if (line != '') line += ','

            line += this.HeaderArray[index];
        }
        str += line + '\r\n';
        var line = '';
    }           
    for (var index in array[i]) {
        if (line != '') line += ','

        line += array[i][index];
    }
    str += line + '\r\n';
}
return str;
}
download() {
    var csvData = this.ConvertToCSV(JSON.stringify(this.MainGridData));
    var a = document.createElement("a");
    a.setAttribute('style', 'display:none;');
    document.body.appendChild(a);
    var blob = new Blob([csvData], { type: 'text/csv' });
    var url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = 'User_Results.csv';/* your file name*/
    a.click();
    return 'success';
}
}
