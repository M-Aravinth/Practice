public with sharing class CaseDataTableController {
    @AuraEnabled(Cacheable = true)
    public static List<Case> getCase(){
        return [Select id,CaseNumber,status,Subject,Priority from case Limit 10000];
    }
}