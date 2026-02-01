public with sharing class AccountDataTableController {
    @AuraEnabled(Cacheable = true)
    Public static list<Account> getAccounts(){
        return [Select Id ,Name,Phone from Account Limit 10000];
    }

    @AuraEnabled
    Public static Void updateAccounts(List<Account> data){
        List<Account> accountList = new List<Account>(data); 
        try{
            System.Database.Update(accountList);
        }Catch(Exception e){

        }

    }
}