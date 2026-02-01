import { LightningElement ,wire} from 'lwc';
import getopportunity from "@salesforce/apex/OpportunityDataTableController.getOpportunities"
import ID from '@salesforce/schema/Opportunity.Id'
import Name from '@salesforce/schema/Opportunity.Name'
import CloseDate from '@salesforce/schema/Opportunity.CloseDate'
import Amount from '@salesforce/schema/Opportunity.Amount'
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { refreshApex } from "@salesforce/apex";
import { updateRecord } from "lightning/uiRecordApi";
                              

const COLUMNS = [
    {
        label : 'Id',
        fieldName : ID.fieldApiName,
        type : 'text'

    },
    {
        label : 'Name',
        fieldName : Name.fieldApiName,
        type : 'text',
        editable : true
    },
    {
        label : 'Close Date',
        fieldName : CloseDate.fieldApiName,
        type : 'date',
        editable : true
    },
    {
        label : 'Amount',
        fieldName : Amount.fieldApiName,
        type : 'currency',
        editable : true
    }
];
export default class OpportunityDataTable extends LightningElement {
    opportunityRecords = [];
    opportunity;
    columns = COLUMNS;
    draftValues = [];
    @wire(getopportunity)    
    opportunitie(result){
        this.opportunity = result;
        if(result.data){
            this.opportunityRecords = result.data;
            console.log(result.data);
            console.log(this.opportunityRecords);
            this.dispatchEvent(
            new ShowToastEvent(
                {
                    title : 'Successfully Fetched Opportunity Records ',
                    message : 'Opportunity Records Fetched Successfully',
                    variant : 'success'
                }
            ));
        }
        if(result.error){
            console.log(result.error);
            this.dispatchEvent(
            new ShowToastEvent(
                {
                    title : 'Error Fetching Opportunity Records',
                    message : result.error.body.message,
                    variant : 'error'
                }
            ));
        }
    }

    async handleSave(event) {
    // Convert datatable draft values into record objects
    console.log('Draft Values '+ JSON.stringify(event.detail.draftValues));
    const records = event.detail.draftValues.slice().map((draftValue) => {
        console.log('draftValue '+ JSON.stringify(draftValue));
      //const fields = Object.assign({}, draftValue);
      const fields = {...draftValue};
      console.log('fields '+ JSON.stringify(fields));
      return { fields };
    });
    console.log('records '+ JSON.stringify(records));
    // Clear all datatable draft values
    this.draftValues = [];

    try {
      // Update all records in parallel thanks to the UI API
      const recordUpdatePromise = records.map((record) => console.log('record '+ JSON.stringify(record)));
      const recordUpdatePromises = records.map((record) => updateRecord(record));
      await Promise.all(recordUpdatePromises);

      // Report success with a toast
      console.log('before Toast');
      this.dispatchEvent(
        new ShowToastEvent({
          title: "Success",
          message: "Opportunity updated",
          variant: "success"
        })
      );
      console.log('After Toasst');

      // Display fresh data in the datatable
      console.log('before refresh apex');
      await refreshApex(this.opportunity);
      console.log('After refresh apex');
      console.log('this.opportunity '+ JSON.stringify(this.opportunity))
    } catch (error) {
      this.dispatchEvent(
        new ShowToastEvent({
          title: "Error updating or reloading contacts",
          message: error.body.message,
          variant: "error"
        })
      );
    }
  }
}