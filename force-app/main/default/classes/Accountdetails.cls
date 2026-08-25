public with sharing class Accountdetails {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts(){
        return [Select Id,Name,phone from Account limit 10];
    }

    @AuraEnabled
    public static void updateAccount(List<Account> data){
        List<Account> accList = new List<Account>(data);
        try{
            update accList;
        }catch(DmlException e){
            throw new AuraHandledException(e.getMessage());
        }
    }
}