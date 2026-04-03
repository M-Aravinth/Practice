public with sharing class ContactsAndOpportunityDataTableCtr {
    public class dataTableWrapper{
        @Auraenabled public list<Contact> contactList;
        @AuraEnabled public List<Opportunity> OpportunityList;
        public dataTableWrapper(list<Contact> contactList, List<Opportunity> OpportunityList){
            this.contactList = contactList;
            this.OpportunityList = OpportunityList;
        }
    }
    @AuraEnabled(cacheable = true)
    public static List<dataTableWrapper> getRecords(String accountId){
        List<Account> accList = [
            Select id , Name,
            (select id,Name,Email,Phone from contacts),
            (select id,Name,StageName,Amount from Opportunities)
             from Account where id =: accountId
        ];

        List<dataTableWrapper> wrapperList = new List<dataTableWrapper>();
        for(Account acc : accList){
            wrapperList.add(new dataTableWrapper(acc.contacts,acc.Opportunities));
        }
        return wrapperList;
    }

    @Auraenabled
    public static void updateRecords(List<Contact> data){
        List<contact> contactList = new List<contact>(data);
        update contactList;

    }
}