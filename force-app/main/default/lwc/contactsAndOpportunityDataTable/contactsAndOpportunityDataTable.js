import { LightningElement,api,wire } from 'lwc';
import getdata from '@salesforce/apex/ContactsAndOpportunityDataTableCtr.getRecords';
import updateRecords from '@salesforce/apex/ContactsAndOpportunityDataTableCtr.updateRecords';
import {refreshApex} from '@salesforce/apex';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import {updateRecord} from 'lightning/uiRecordApi';
const CONTACT_COLUMNS = [
    {label : 'Name', fieldName: 'Name'},
    {label : 'Email', fieldName: 'Email'},
    {label : 'Phone', fieldName: 'Phone', editable : true}
];

const OPP_COLUMNS = [
    {label : 'Name', fieldName: 'Name'},
    {label : 'StageName', fieldName: 'StageName'},
    {label : 'Amount', fieldName:   'Amount'}
];

export default class ContactsAndOpportunityDataTable extends LightningElement {
    @api recordId;
    showData = false;
    contactCols = CONTACT_COLUMNS;
    oppCols = OPP_COLUMNS;
    wiredData = [];
    contactList = [];
    opportunityList = [];
    draftValues = [];

    @wire(getdata, {accountId:'$recordId'})
    wiredDate(result){
        //alert('wired method called');
         this.wiredData = result;
        console.log('result ===> ', result);
        if(result.data){
            //alert('wired data recieved');
            this.showData = true;
            this.contactList = result.data[0].contactList;
            this.opportunityList = result.data[0].OpportunityList;
        }
    }

    async handleSave(event){
        await updateRecords({data : event.detail.draftValues});
        this.draftValues = [];
        await refreshApex(this.wiredData);
    }

    constructor(){
        super();
        //alert('constructor called');
    }

    connectedCallback(){
        //alert('connected callback called');
    }

    renderedCallback(){
        //alert('rendered callback called');
    }
    
    disconnectedCallback(){
        //alert('disconnected callback called');
    }

    errorCallback(error, stack){
        //alert('error callback called');
        console.log('error ===> ', error);
        console.log('stack ===> ', stack);
    }
}