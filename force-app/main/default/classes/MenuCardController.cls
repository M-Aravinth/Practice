public without sharing class MenuCardController {
    @AuraEnabled(cacheable = true)
    Public static List<Menu_Item__c> fetchMenuItems(){
        Return [Select Id, Name, Price__c, Available_Quantity__c, Is_Out_of_Stock__c,Image_Resource_Name__c from Menu_Item__c with System_Mode];
    }
}