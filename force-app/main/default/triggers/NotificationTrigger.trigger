trigger NotificationTrigger on Reservation__c (after update, after insert) {
    for (Reservation__c reservation : Trigger.new){
        
        String userId = [SELECT Id, CreatedById FROM Reservation__c WHERE Id = :reservation.Id].CreatedById;
        User user = [SELECT Id, Email, FirstName, LastName FROM User WHERE Id = :userId];
        String[] toAddresses = new String[] {user.Email};
        System.debug('toAddresses: ' + toAddresses);
    
        if (Trigger.isInsert){
            if (reservation.Statut__c == 'Confirmation'){
                Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
                mail.setToAddresses(toAddresses);
                mail.setSubject('Confirmation de votre réservation');
                mail.setPlainTextBody('Bonjour ' + user.FirstName + ',\n\nNous vous confirmons votre réservation du ' + reservation.Debut__c + ' au ' + reservation.Fin__c + '.\n\nCordialement,\n\nL\'équipe de la Résidence');
                Messaging.sendEmail(new Messaging.SingleEmailMessage[] { mail });
            }
        }
        if (Trigger.isUpdate){
            Reservation__c oldReservation = Trigger.oldMap.get(reservation.Id);
            if (reservation.Statut__c == 'Annulation' && oldReservation.Statut__c != 'Annulation'){
                Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
                mail.setToAddresses(toAddresses);
                mail.setSubject('Annulation de votre réservation');
                mail.setPlainTextBody('Bonjour ' + user.FirstName + ',\n\nNous vous confirmons l\'annulation de votre réservation du ' + reservation.Debut__c + ' au ' + reservation.Fin__c + '.\n\nCordialement,\n\nL\'équipe de la Résidence');
                Messaging.sendEmail(new Messaging.SingleEmailMessage[] { mail });
            }
        }
    }
}