public with sharing class ContactController {

    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactList() {
        return [
            SELECT AccountId, Id, FirstName, LastName, Title, Phone, Email
            FROM Contact           
            WITH USER_MODE Limit 10000
        ];
    }
}