/**
 * @description Get the email addresses from contacts related to the account
 * @author Aravint
 * @date 2025-07-12
 */
public with sharing class GetEmailFromContacts {
    /**
     * @description Get the email addresses from contacts related to the account
     * @param accountname The name of the account
     * @return List of email addresses
     */
    public static List<String> getEmail(String accountname) {
        List<String> emailAddresses = new List<String>();
        // Query to get email addresses from contacts related to the account
        for (Contact con : [SELECT Email FROM Contact WHERE Account.Name = :accountname with USER_MODE]) {
            emailAddresses.add(con.Email);
        }
        return emailAddresses;
    }
}