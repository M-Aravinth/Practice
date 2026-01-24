/**
 * @description This class is used to get the first name from an email address
 */
public with sharing class GetFirstNameFromEmail {
    /**
     * @description This method is used to get the first name from an email address
     * @param email The email address
     * @return The first name
     */
    public static String getFirstName(String email) {
        if(email != null){
            String firstName = email.substringBefore('_');
            return firstName;
        }
        return null;
      }
}