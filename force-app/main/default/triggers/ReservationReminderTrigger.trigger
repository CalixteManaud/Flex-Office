public with sharing class ReservationReminderTrigger implements Triggers.TriggerHandler {
    public void afterInsert(List<SObject> newRecords){
        List<Reservation__c> reservations = (List<Reservation__c>) newRecords;

        // Filtrer les réservations pour celles qui nécessitent un rappel
        List<Reservation__c> reservationsToSendReminder = new List<Reservation__c>();
        for (Reservation__c reservation : reservations) {
            if (shouldSendReminder(reservation)) {
                reservationsToSendReminder.add(reservation);
            }
        }

        // Envoyer les rappels
        sendReminders(reservationsToSendReminder);
    }

    private Boolean shouldSendReminder(Reservation__c reservation) {
        return reservation.Debut__c == Date.today().addDays(1) && reservation.Email_Reserv__c == true;
    }

    public void sendReminderEmails(List<Reservation__c> reservations) {
        // Envoyer des e-mails de rappel
        List<Messaging.SingleEmailMessage> emailMessages = new List<Messaging.SingleEmailMessage>();
        for (Reservation__c reservation : reservations) {
            Messaging.SingleEmailMessage email = new Messaging.SingleEmailMessage();
            email.setToAddresses(new String[]{reservation.Email_Reserv__c});
            email.setSubject('Rappel de réservation');
            email.setPlainTextBody('Bonjour, vous avez une réservation demain à ' + reservation.Debut__c);
            emailMessages.add(email);
        }

        // Envoyer les e-mails
        if (!emailMessages.isEmpty()) {
            Messaging.sendEmail(emailMessages);
        }
    }
}