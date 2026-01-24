/**
 * @description This class is responsible for sending email notifications.
 * It uses Salesforce's Messaging API to send a single email message.
 * The email includes a subject, sender display name, plain text body, and an unsubscribe URL.
 */
public with sharing class SendEmailNotification {
    public static void sendEmailmethod() {
        Messaging.SingleEmailMessage message = new Messaging.SingleEmailMessage();
        // Set the recipient's email address
        // Replace IDs with valid record IDs in your org.
        message.toAddresses = new String[] { 'm.aravindhkarur@gmail.com' };
        message.subject = 'Test Message';
        message.plainTextBody = 'This is the message body.';
        
        
        // Create a list to hold unsubscribe URLs
        List<String> unsubscribeUrls = new List<String>();
        unsubscribeUrls.add('https://example.com/unsubscribe.html?opaque=123456789');
        
        
        // Assign the unsubscribe URLs to the email message
        message.unsubscribeUrls = unsubscribeUrls;
        
        
        // Enable the one-click unsubscribe feature
        message.oneClickPost = true;
        
        Messaging.SingleEmailMessage[] messages =
        new List<Messaging.SingleEmailMessage> {message};
        Messaging.SendEmailResult[] results = Messaging.sendEmail(messages);
        
        
        if (results[0].success) {
            System.debug('The email was sent successfully.');
        } else {
            System.debug('The email failed to send: '
                + results[0].errors[0].message);
        }
    }
}