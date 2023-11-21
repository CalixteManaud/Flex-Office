public with sharing class ReservationReminderBatch implements Database.Batchable<sObject>, Schedulable {
    /**
     * The query to get the records to process.
     */
    public void execute(SchedulableContext sc) {
        Database.executeBatch(this);
    }
    /**
     * The method to process each batch of records.
     */
    public Database.QueryLocator start(Database.BatchableContext BC){
        // Query pour les reservations avec rappels aujourd'hui
        String query = 'SELECT Id, Debut__c, Email_Reserv__c FROM Rerservation__c WHERE Debut__c = TODAY AND Email_Reserv__c = TRUE';
        return Database.getQueryLocator(query);
    }

    // The method to process each record in a batch.
    public void execute(Database.BatchableContext BC, List<Reservation__c> scope){
        List<Messaging.SingleEmailMessage> emailMessages = new List<Messaging.SingleEmailMessage>();

        for (Reservation__c res : scope) {
            Messaging.SingleEmailMessage email = new Messaging.SingleEmailMessage();
            email.setToAddresses(new String[]{res.Email_Reserv__c});
            email.setSubject('Rappel de réservation');
            email.setPlainTextBody('Bonjour, vous avez une réservation aujourd\'hui à ' + res.Debut__c);
            emailMessages.add(email);
        }

        if (!emailMessages.isEmpty()) {
            Messaging.sendEmail(emailMessages);
        }
    }

    public void finish(Database.BatchableContext BC){
        // Nothing to do here
    }
}