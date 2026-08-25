import { LightningElement, wire } from 'lwc';
import getAccounts from '@salesforce/apex/Accountdetails.getAccounts';
import updateAccount from '@salesforce/apex/Accountdetails.updateAccount';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import {refreshApex} from '@salesforce/apex';

const COLUMNS = [
    {
        label:'Name',
        fieldName: 'Name',
        editable:true,
        sortable:true
    },
    {
        label:'Phone',
        fieldName: 'Phone',
        editable:true,
        sortable:true
    }
];

export default class DataTableTest extends LightningElement {
    accounts = [];
    wiredAccountsResult = [];
    columns = COLUMNS;
    draftValues=[];
    sortedBy;
    sortedDirection = 'asc';

 constructor(){
    super();
    console.log('Constructor called');
    //alert('Constructor called');
}

connectedCallback(){
    console.log('Connected Callback called');
    //alert('Connected Callback called');
    // getAccounts()
    // .then(result => {
    //     console.log('connected call back Accounts fetched successfully');
    //     //alert('connected call back Accounts fetched successfully');
    //     this.accounts = result;
    // })
    // .catch(error => {
    //     console.error('Error fetching accounts:', error);
    // });
}

disconnectedCallback(){
    console.log('Disconnected Callback called');
    //alert('Disconnected Callback called');
}

renderedCallback(){
    console.log('Rendered Callback called');
    //alert('Rendered Callback called');
} 

    @wire(getAccounts)
    wiredAccounts(result){
        this.wiredAccountsResult = result;
        console.log('Wired Accounts called');
        //alert('Wired Accounts called');
        if(result.data){
            console.log('wired Data fetched successfully');
            //alert('wired Data fetched successfully');
            this.accounts = result.data;
        }
    }

   async handleSave(event){
            try{
                    await updateAccount({data: event.detail.draftValues});
                    this.draftValues = [];                    
                    this.dispatchEvent(
                        new ShowToastEvent({
                                    title: 'Success',
                                    message: 'Account updated successfully',
                                    variant: 'success'
                        })
                    );
                    await refreshApex(this.wiredAccountsResult);
            }catch(error){
                this.dispatchEvent(
                    new ShowToastEvent({
                                title: 'Error',
                                message: error.body?.message,
                                variant: 'error'
                    })
                );
            }
    }

    handleSort(event){
        this.sortedBy = event.detail.fieldName;
        this.sortedDirection = event.detail.sortDirection;
        this.sortData(this.sortedBy, this.sortedDirection);
    }

    sortData(fieldname, direction){
        let parseData = JSON.parse(JSON.stringify(this.accounts));
        let keyValue = (a) => {
            return a[fieldname];
        };
        let isReverse = direction === 'asc' ? 1: -1;
        parseData.sort((x,y) => {
            x = keyValue(x) ? keyValue(x) : '';
            y = keyValue(y) ? keyValue(y) : '';
            return isReverse * ((x > y) - (y > x));
        });
        this.accounts = parseData;
    }

    loadAccountData(){
        getAccounts()
        .then(result => {
            this.accounts = result;
        })
        .catch(error => {
            console.error('Error fetching accounts:', error);
        });
}   
}