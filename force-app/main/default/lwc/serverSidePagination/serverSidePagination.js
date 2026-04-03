import { LightningElement,track } from 'lwc';
import getContacts from '@salesforce/apex/ServerSidePaginationController.getContacts';
import getTotalContacts from '@salesforce/apex/ServerSidePaginationController.getTotalContacts';

export default class ServerSidePagination extends LightningElement {
    @track contacts = [];
    currentPage = 1;
    pageSize = 5;
    totalPages = 0;

    columns = [
        { label: 'First Name', fieldName: 'FirstName' },
        { label: 'Last Name', fieldName: 'LastName' },
        { label: 'Email', fieldName: 'Email' }
    ];

    connectedCallback() {
        this.initPagination();
    }

    async initPagination() {
        const total = await getTotalContacts();
        this.totalPages = Math.ceil(total / this.pageSize);
        this.fetchContacts();
    }

    async fetchContacts() {
        this.contacts = await getContacts({ pageSize: this.pageSize, pageNumber: this.currentPage });
    }

    handlePrevious() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.fetchContacts();
        }
    }

    handleNext() {
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
            this.fetchContacts();
        }
    }

    get isPreviousDisabled() {
        return this.currentPage === 1;
    }

    get isNextDisabled() {
        return this.currentPage === this.totalPages;
    }
}