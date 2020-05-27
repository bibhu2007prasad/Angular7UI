export class AllFieldOfForm
{
        AadhaarCardCh:boolean;
        ActivePaymentModeCh:boolean;
        Address:string;
        AppID:string;
        CA_Ch:boolean;
        CC_Ch:boolean;
        Cash_Ch:boolean;
        Cheque_Ch:boolean;
        City:string;
        Code:string;
        Country:string;
        DebitCardCh :boolean;
        DemandDraft_Ch :boolean;
        Electronic_Ch :boolean;
        Email:string;
        EntityBCode:string;
        EntityName:string;
        ISTodateMandatoryEnach_Ch :boolean;
        IsEMandate :boolean;
        IsOverPrintMandate :boolean;
        IsPhysicalMandateCh :boolean;
        IsRefCheck_Ch :boolean;
        IsRefNumerc:boolean;
        IsSendEmail :boolean;
        IsShowMandateMode :boolean;
        IsThirdTransactionCh :boolean;
        MerchantKey:string;
        MobileNo:string;
        Name :string;
        NetBankingCh :boolean;
        Other_Ch :boolean;
        PinCode:string;
        SB_Ch :boolean;
        SB_NRE_Ch :boolean;
        SB_NRO_Ch :boolean;
        State:string;
        UserName:string;
        chkIsAllowEManadte_Ch:boolean;
        chkIsRefrence2Mandatory:boolean;
        chkIsZipSure_Ch:boolean;
        recheckthepresentmentfileCh :boolean;

        BankName:string;
        BankCode:string;
        UtilityCode:string;
        Password:string;
        confirmpassword:string;
        AccountNumber:string;
       // ReCheck { get; set; }
        CheckerRequire:boolean;
        XmlModeType:string;
        //IsEnableUserCheck { get; set; }
        ISEnableCancelUser:boolean;
//dtEntityCode { get; set; }
        FullPath:string;
        BankValidationAdminCount :string;
        BankValidationUserCount:string;
        AcValidationAdminCount :string;
        AcValidationUserCount:string;
        EnableUserWise_Ch :string;
        IsValidationCountEnableCh :string;
        InstructingMenmerId :string;
        Type :string;
        DebitType :string;
        FrequencyType :string;
        ToDebit :string;
        Amount :string;
        Activate:boolean;
        FileName1 :string;
        FileName2 :string;
        FileName3 :string;
        FileName4 :string;
        FileName5 :string;
        FileName6 :string;
        FixedAmount_Ch :boolean;
        MaximumAmount_Ch:boolean;
        Half_Yearly_Ch:boolean;
        UntillCancelled_Ch:boolean;
        To_Ch :boolean;
        Monthly_Ch:boolean;
        Quarterly_Ch :boolean;
        Yearly_Ch :boolean;
        Presented_Ch :boolean;
        ValidationByCustomer_Ch:boolean;
        ValidationByCorporate_Ch:boolean;
        OCRCode_Ch :boolean;
        QRCode_Ch :boolean;
        Logo_Ch :boolean;


        //Added by Bibhu on 18May2020 start
        EmailId :string;
        IsAccountValidation :string;
        IsPhoneNumber :string;
        //IsReferenceNumeric { get; set; }
        IsrdoFixed :boolean;
        IsrdoMaxLength :boolean;
        IstxtMaxlenth :string;

        //Added by Bibhu on 18May2020 start //Financial and Billing 
        FinaceAndBillingName :string;
        FinaceAndBillingDesignation :string;
        FinaceAndBillingContactNo :string;
        FinaceAndBillingFaxNo :string;
        FinaceAndBillingAddress :string;
        PAN :string;
        TAN :string;


        GST :string;
        BillContractPerson :string;
        Designation :string;
        BillingContactNo :string;
        BillFaxNo :string;
        BillingAddress :string;
        BillingPicupContactPerson :string;


        BillingPicupLocationAddress :string;
        BillingCommunicationMailPrimary :string;
        BillingCommunicationMailBilling :string;
        BillingChargeDebitAccNo :string;
        BillingBankCorpId :string;
        BillingBranchName :string;
        BillingBranchCode :string;

        BillingIFSC :string;
        IsRequired :string;

        //Added by Bibhu on 18May2020 start //Financial and Billing 
        categorycodeid :string;
        UtilityCodeId :string;
        categorycodeidNach :string;
        BusinessSegmentId :string;
        RMId :string;
        PSMId :string;
        Arrangementdays :string;
        SettlementTypeId :string;


        //Added by Bibhu on 19may2020
        NachPresentment :boolean;
        BillingIP :string;
        BillingURL:string;
        BillingUserName :string;
        BillingPassword :string;
        dtBankCode :string[];
        XmlFileName :string[];
        dtcontactperson :string[];
}