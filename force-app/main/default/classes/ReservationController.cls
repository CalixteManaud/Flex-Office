public with sharing class ReservationController {

    @AuraEnabled
    public static String updateReservation(String reservationId, Date newReservationDate, Time newReservationTime){
        try {
            // Récupérer la réservation en fonction de l'Id
            Reservation__c reservation = [Select Id, ReservationDate__c, ReservationTime__c, Status__c FROM Reservation__c WHERE Id = :reservationId];

            // Vérifier que la réservation peut être modifiée (au plus tard 2 jours avant)
            Date today = Date.today();
            Interger daysUntilReservation = newReservationDate.daysBetween(today);

            if (daysUntilReservation < 2)
                return 'La réservation ne peut pas être modifiée;';
            
            // Mettre à jour la réservation
            reservation.ReservationDate__c = newReservationDate;
            reservation.ReservationTime__c = newReservationTime;

            // Enregistrer la réservation mise à jour
            update reservation;

            return 'La réservation a été mise à jour';
        } catch (Exception e) {
            return 'Erreur lors de la mise à jour de la réservation : ' + e.getMessage();  
        }
    }

    @AuraEnabled
    public static String cancelReservation(String reservationId, String cancellationReason) {
        try {
            // Récupérer la réservation en fonction de reservationId
            Reservation__c reservation = [SELECT Id, Status__c FROM Reservation__c WHERE Id = :reservationId];
            
            // Vérifier que la réservation peut être annulée (au plus tard 2 jours avant)
            Date today = Date.today();
            Integer daysUntilReservation = reservation.ReservationDate__c.daysBetween(today);
            
            if (daysUntilReservation < 2) {
                return 'La réservation ne peut pas être annulée.';
            }

            // Mettre à jour le statut de la réservation à "Annulée"
            reservation.Status__c = 'Annulée';
            
            // Ajouter la raison de l'annulation
            reservation.CancellationReason__c = cancellationReason;
            
            // Enregistrer la réservation mise à jour
            update reservation;

            return 'Réservation annulée avec succès';
        } catch (Exception e) {
            return 'Erreur lors de l\'annulation de la réservation : ' + e.getMessage();
        }
    }

}