import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './master/user/user.component';
import { DashboardComponent } from './master/dashboard/dashboard.component';
import { NachMandateComponent } from './master/nach-mandate/nach-mandate.component';
import { HolidayMasterComponent } from './master/holiday-master/holiday-master.component';
import { RegionMasterComponent } from './master/region-master/region-master.component';
import { EmployeeMasterComponent } from './master/employee-master/employee-master.component';
import { DesignationMasterComponent } from './master/designation-master/designation-master.component';
import { BranchMasterComponent } from './master/branch-master/branch-master.component';
import { ChargeMasterComponent } from './master/charge-master/charge-master.component';
import { DocumentMasterComponent } from './master/document-master/document-master.component';
import { TemplateMasterComponent } from './master/template-master/template-master.component';
import { SettlementTypeMasterComponent } from './master/settlement-type-master/settlement-type-master.component';
import { BusinessSegmentMasterComponent } from './master/business-segment-master/business-segment-master.component';
import { ReturnReasonMasterComponent } from './master/return-reason-master/return-reason-master.component';
import { AllumrnComponent } from './master/allumrn/allumrn.component';
import { NewhistoricalmandateComponent } from './master/newhistoricalmandate/newhistoricalmandate.component';
import { CommunicationtemplateComponent } from './master/communicationtemplate/communicationtemplate.component';
import { SubmembermasterComponent } from './master/submembermaster/submembermaster.component';
import { UtilitymasterComponent } from './master/utilitymaster/utilitymaster.component';
import { PsmmasterComponent } from './master/psmmaster/psmmaster.component';
import { RblBranchMasterComponent } from './master/rbl-branch-master/rbl-branch-master.component';
import { CorporatesetupComponent } from './master/corporatesetup/corporatesetup.component';
import { LinkSetupComponent } from './master/link-setup/link-setup.component';
import { DebitPresentmentSetupComponent } from './master/debit-presentment-setup/debit-presentment-setup.component';
import { UserRoleSetupComponent } from './master/user-role-setup/user-role-setup.component';
import { SubmemberBankSetupComponent } from './master/submember-bank-setup/submember-bank-setup.component';
import { RegSuccessComponent } from './master/reg-success/reg-success.component';
import { RegUnsuccessComponent } from './master/reg-unsuccess/reg-unsuccess.component';
import { RegUnsuccessOnusComponent } from './master/reg-unsuccess-onus/reg-unsuccess-onus.component';
import { RegSuccessOnusComponent } from './master/reg-success-onus/reg-success-onus.component';
import { HistoricalMandateOnusComponent } from './master/historical-mandate-onus/historical-mandate-onus.component';
import { UnprocessedMandatesComponent } from './master/unprocessed-mandates/unprocessed-mandates.component';
import { ProcessedMandatesComponent } from './master/processed-mandates/processed-mandates.component';
import { ProcessedMandatesOnusComponent } from './master/processed-mandates-onus/processed-mandates-onus.component';
import { UnprocessedMandatesOnusComponent } from './master/unprocessed-mandates-onus/unprocessed-mandates-onus.component';
import { LegacyUploadComponent } from './master/legacy-upload/legacy-upload.component';
import { ReCreateMandateComponent } from './master/re-create-mandate/re-create-mandate.component';
import { SingleMandateComponent } from './master/single-mandate/single-mandate.component';

import { NachsuccessonusComponent } from './master/nachsuccessonus/nachsuccessonus.component';
import { NachunsuccessonusComponent } from './master/nachunsuccessonus/nachunsuccessonus.component';
import { NachsuccessComponent } from './master/nachsuccess/nachsuccess.component';
import { NachunsuccessComponent } from './master/nachunsuccess/nachunsuccess.component';
const routes: Routes = [{ path: '', redirectTo: '', component: LoginComponent, pathMatch: 'full' },
    { path: 'Login', component: LoginComponent },
    { path: 'user', component: UserComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'NachMandate', component: NachMandateComponent },
    { path: 'HolidayMaster', component: HolidayMasterComponent },
    { path: 'RegionMaster', component: RegionMasterComponent },
    { path: 'EmployeeMaster', component: EmployeeMasterComponent },
    { path: 'DesignationMaster', component: DesignationMasterComponent },
    { path: 'BranchMaster', component: BranchMasterComponent },
    { path: 'ChargeMaster', component: ChargeMasterComponent },
    { path: 'DocumentMaster', component: DocumentMasterComponent },
    { path: 'TemplateMaster', component: TemplateMasterComponent },
    { path: 'SettlementTypeMaster', component: SettlementTypeMasterComponent },
    { path: 'BusinessSegmentMaster', component: BusinessSegmentMasterComponent },
    { path: 'ReturnReasonMaster', component: ReturnReasonMasterComponent },
    { path: 'Allumrn', component: AllumrnComponent },
    { path: 'Newhistoricalmandate', component: NewhistoricalmandateComponent },
    { path: 'Communicationtemplate', component: CommunicationtemplateComponent },
    { path: 'Submembermaster', component: SubmembermasterComponent },
    { path: 'Utilitymaster', component: UtilitymasterComponent },
    { path: 'Psmmaster', component: PsmmasterComponent }, 
    { path: 'RBLBranchmaster', component: RblBranchMasterComponent }, 
    { path: 'Corporatesetup', component: CorporatesetupComponent },
    { path: 'LinkSetup', component: LinkSetupComponent },
    { path: 'DebitPresentmentSetup', component: DebitPresentmentSetupComponent },
    { path: 'UserRoleSetup', component: UserRoleSetupComponent },
    { path: 'SubmemberBankSetup', component: SubmemberBankSetupComponent },
    { path: 'RegSuccess', component: RegSuccessComponent },
    { path: 'RegUnsuccess', component: RegUnsuccessComponent },
    { path: 'RegUnsuccessOnus', component: RegUnsuccessOnusComponent },
    { path: 'RegSuccessOnus', component: RegSuccessOnusComponent },
    { path: 'HistoricalMandateOnus', component: HistoricalMandateOnusComponent },
    { path: 'UnprocessedMandates', component: UnprocessedMandatesComponent },
    { path: 'ProcessedMandates', component: ProcessedMandatesComponent },
    { path: 'ProcessedMandatesOnus', component: ProcessedMandatesOnusComponent },
    { path: 'UnprocessedMandatesOnus', component: UnprocessedMandatesOnusComponent },
    { path: 'LegacyUpload', component: LegacyUploadComponent },
    { path: 'ReCreateMandate', component: ReCreateMandateComponent },
    { path: 'SingleMandate', component: SingleMandateComponent },
    { path: 'Nachsuccessonus', component: NachsuccessonusComponent },
    { path: 'Nachunsuccessonus', component: NachunsuccessonusComponent },
    { path: 'Nachsuccess', component: NachsuccessComponent },
    { path: 'Nachunsuccess', component: NachunsuccessComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
