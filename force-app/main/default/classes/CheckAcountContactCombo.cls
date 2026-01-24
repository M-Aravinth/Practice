/**
 * @description: This class provides a method to check if a combination of Account and Contact names exists.
 */
public with sharing class CheckAcountContactCombo {
    /**
     * Checks if a combination of account and contact names exists.
     *
     * @param accName The name of the account to check.
     * @param conName The name of the contact to check.
     * @return True if a combination exists, false otherwise.
     */
    public static Boolean checkCombination(String accName, String conName) {
        List<Contact> conList = [select id from contact where name =: conName and Account.name =: accName with User_Mode];
        if(conList.size() > 0){
            return true;
        } else {
            return false;
        }
    }
}