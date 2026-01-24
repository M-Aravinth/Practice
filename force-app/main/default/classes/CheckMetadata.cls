/**
 * @description: This class is responsible for checking the metadata of a given planet.
 * @description This class provides a method to check the input planet name and log information about it.
 */
public with sharing class CheckMetadata {
    /**
     * @description Checks the input planet name and logs information about it.
     * @param planetName The name of the planet to check.
     */
    public static void checkInput(String planetName) {
        Planet__mdt mdt = Planet__mdt.getInstance(planetName);
        if(mdt != null && !String.isBlank(mdt.type__c)){
            System.debug('The given planet ' + planetName + 'is present in the system and has a type: ' + mdt.type__c); // NOPMD
        } else {
            System.debug('The given planet ' + planetName + 'is not present in the system'); // NOPMD
        }

    }
}