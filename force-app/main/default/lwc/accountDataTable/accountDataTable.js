import { LightningElement , wire } from 'lwc';
import getAccountDetails from '@salesforce/apex/AccountDataTableController.getAccounts';
import updateAccounts from '@salesforce/apex/AccountDataTableController.updateAccounts';
import Id from '@salesforce/schema/Account.Id';
import Name from '@salesforce/schema/Account.Name';
import Phone from '@salesforce/schema/Account.Phone';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import {refreshApex} from '@salesforce/apex';
import {updateRecord} from 'lightning/uiRecordApi';
const COLUMNS = [
    {
        label: 'Name',
        fieldName: 'URL',
        type: 'url',
        typeAttributes: {
            label: {
                fieldName: 'Name'
            },
            target: '_self'
    },
    sortable: true 
    },
    {
        label : 'Name',
        fieldName : Name.fieldApiName,
        editable : true
    },
    {
        label : 'Phone',
        fieldName : Phone.fieldApiName,
        editable : true
    }
];
export default class AccountDataTable extends LightningElement {
columns = COLUMNS;
accountData;
account;
paginatedAccpuntData =[];
draftValues = [];
fetchToast = true;
currentPage = 1;
pageSize = 5;
totalPages = 0;

@wire(getAccountDetails)
accountDetails(result){
    this.accountData = result;
    if(result.data){
        this.account = result.data.map(a => ({
            ...a,
            URL: `/lightning/r/Account/${a.Id}/view`
        }));
        this.totalPages = Math.ceil(this.account.length / this.pageSize);
        this.updatePaginatedData();
        
        if (this.fetchToast) {
            this.dispatchEvent(
                new ShowToastEvent(
                    {
                        title: 'Successfully Fetched Account Records',
                        variant: 'success'
                    }
                )
            );
            this.fetchToast = false;
        }   
        
    }
}


updatePaginatedData(){
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedAccpuntData = this.account.slice(startIndex, endIndex);
}

handlePrevious(){
    if(this.currentPage > 1){
        this.currentPage--;
        this.updatePaginatedData();
    }
}
handleNext(){
    if(this.currentPage < this.totalPages){
        this.currentPage++;
        this.updatePaginatedData();
    }
}

get isPreviousDisabled(){
    return this.currentPage === 1;
}

get isNextDisabled(){
    return this.currentPage === this.totalPages;
}

async handleSave(event){
    const records = event.detail.draftValues.map((draftValue =>{
        const fields = {...draftValue};
        return {fields};
    }));

    try {
        //this.draftValues = [];
        const recordsForUpdate = records.map((record => updateRecord(record)));
        //await Promise.all(recordsForUpdate);
        await updateAccounts({data : event.detail.draftValues});
        this.draftValues = [];

        this.dispatchEvent(
            new ShowToastEvent(
                {
                    title : 'Successfully Updated Account Records',
                    variant : 'message'
                }
            )
        );
         await refreshApex(this.accountData);

    }catch(error){
        this.dispatchEvent(
            new ShowToastEvent(
                {
                    title : 'Error in Updating Account Records',
                    message : error.body.message,
                    variant : 'error'
                }
            )
        );
    }
    
}
}
