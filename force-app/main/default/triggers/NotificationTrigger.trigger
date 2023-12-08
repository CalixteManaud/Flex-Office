trigger NotificationTrigger on Reservation__c (after update) {
    for (Reservation__c reservation : Trigger.new){
        Reservation__c oldReservation = Trigger.oldMap.get(reservation.Id);

        if (reservation.Statut__c == 'Confirmation' && oldReservation.Statut__c != 'Confirmation'){
            Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
            String[] toAddresses = new String[] {reservation.Contact__r.Email};
            mail.setToAddresses(toAddresses);
            mail.setSubject('Confirmation de votre réservation');
            mail.setPlainTextBody('Bonjour ' + reservation.Contact__r.FirstName + ',\n\nNous vous confirmons votre réservation du ' + reservation.Debut__c + ' au ' + reservation.Fin__c + '.\n\nCordialement,\n\nL\'équipe de la Résidence');
            Messaging.sendEmail(new Messaging.SingleEmailMessage[] { mail });
        }

        if (reservation.Statut__c == 'Annulation' && oldReservation.Statut__c != 'Annulation'){
            Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
            String[] toAddresses = new String[] {reservation.Contact__r.Email};
            mail.setToAddresses(toAddresses);
            mail.setSubject('Annulation de votre réservation');
            mail.setPlainTextBody('Bonjour ' + reservation.Contact__r.FirstName + ',\n\nNous vous confirmons l\'annulation de votre réservation du ' + reservation.Debut__c + ' au ' + reservation.Fin__c + '.\n\nCordialement,\n\nL\'équipe de la Résidence');
            Messaging.sendEmail(new Messaging.SingleEmailMessage[] { mail });
        }
    }
}