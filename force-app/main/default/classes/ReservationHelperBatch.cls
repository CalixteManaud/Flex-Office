public with sharing  class ReservationHelperBatch implements Database.Batchable<sObject>, Schedulable {
    
    public void execute(SchedulableContext sc) {
        Database.executeBatch(this);
    }
    
    public Database.QueryLocator start(Database.BatchableContext BC) {
        Date tomorrow = Date.today().addDays(1);
        return Database.getQueryLocator([
            SELECT Id, CreatedById, Debut__c
            FROM Reservation__c
            WHERE Debut__c = :tomorrow
        ]); 
    }

    public void execute(Database.BatchableContext bc, List<Reservation__c> records){
        for (Reservation__c reservation : records) {
            sendReminderREservation(reservation);
        }
    }

    // Méthode pour envoyer un rappel pour une réservation donnée
    private static void sendReminderReservation(Reservation__c reservation) {
        User user = [SELECT Id, Email FROM User WHERE Id = :reservation.CreatedById LIMIT 1];
        System.debug('Found user: ' + user);
        if (user != null && user.Email != null) {
            Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
            mail.setToAddresses(new List<String>{ user.Email });
            mail.setSubject('Rappel de réservation');
            mail.setPlainTextBody('Votre réservation commence demain.');
            Messaging.sendEmail(new List<Messaging.SingleEmailMessage>{ mail });
        } else {
            System.debug('No user or email found for UserId: ' + reservation.CreatedById);
        }
    }

    public void finish(Database.BatchableContext BC) {
        // nothing to do here
    }
}