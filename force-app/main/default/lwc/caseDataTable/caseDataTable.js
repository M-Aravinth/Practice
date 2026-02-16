import { LightningElement,wire } from 'lwc';
import getCase from '@salesforce/apex/CaseDataTableController.getCase';
//import {refreshApex} from '@salesforcce/apex';

const COLUMN = [
    {
        label : 'CaseNumber',
        fieldName : 'CaseNumber'
    },
    {
        label : 'Status',
        fieldName : 'Status'
    },
    {
        label : 'Subject',
        fieldName : 'Subject'
    },
    {
        label : 'Priority',
        fieldName : 'Priority',
        cellAttributes:{
        class:{fieldName:'colourCode'}
        }
    }
];

export default class CaseDataTable extends LightningElement {
    columns = COLUMN;
    caseData = [];
    caseDataToRefresh;
    totalPages = 0;
    currentPage = 1;
    PageSize = 10;
    paginatedCaseRecord = [];
    caseColourCodeData = [];

    @wire(getCase)
    caseDataList(result){
        console.log( result);
        this.caseDataToRefresh = result;
        if(result.data){
            this.caseData = result.data;
            console.log( this.caseData);
            this.totalPages = Math.ceil(this.caseData.length / this.PageSize);
            this.caseColourCodeData = this.caseData.map((cas)=>{
                return {...cas,
                    //"colourCode": "slds-text-color_success"
                    "colourCode": cas.Priority === 'High' ? 'slds-text-color_error'
                        : cas.Priority === 'Medium' ? 'slds-text-color_warning'
                        : 'slds-text-color_success'
                };

            });
            this.updatePaginatedData();
        }
    }

    handlePrevious(){
        this.currentPage -= 1;
        this.updatePaginatedData();
    }

    handleNext(){
        this.currentPage += 1;
        this.updatePaginatedData();
    }

    updatePaginatedData(){
        this.paginatedCaseRecord = this.caseColourCodeData.slice( (this.currentPage - 1) * this.PageSize, this.currentPage * this.PageSize);
    }

    get isPreviousDisabled(){
        return this.currentPage === 1;
    }

    get isNextDisabled(){
        return this.currentPage === this.totalPages;

    }
}