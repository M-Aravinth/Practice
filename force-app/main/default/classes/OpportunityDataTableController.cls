public with sharing class OpportunityDataTableController {
    @AuraEnabled(Cacheable = True)
    Public static List<Opportunity> getOpportunities(){
        Return [Select Id,Name, CloseDate, Amount from Opportunity With System_Mode Limit 10000];
    }
}