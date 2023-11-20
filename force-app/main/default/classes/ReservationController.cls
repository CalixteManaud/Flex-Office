public with sharing class ReservationController {

    @AuraEnabled(cacheable=true)
    public static List<Table__c> getAvailables(Date reservationDate){
        return [SELECT Id, Name, Salle__c, Equipement__c FROM Table__c];
    }

    @AuraEnabled
    public static void MakeReservation(Id tableId, Date startDate, Date endDate, String reason){
        Reservation__c reservation = new Reservation__c();
        reservation.Reserved_Table__c = tableId;
        reservation.Debut__c = startDate;
        reservation.Fin__c = endDate;
        reservation.Raison__c = 'En attente';
        insert reservation;
    }

    @AuraEnabled
    public static void modifyReservation(Id reservationId, Date startDate, Date endDate, String reason) {
        // Implémentez la logique de modification pour la réservation avec l'ID spécifié
        Reservation__c reservation = [SELECT Id, Debut__c, Fin__c, Raison__c FROM Reservation__c WHERE Id = :reservationId LIMIT 1];
        reservation.Debut__c = startDate;
        reservation.Fin__c = endDate;
        reservation.Raison__c = reason;
        update reservation;
    }

    @AuraEnabled
    public static void cancelReservation(Id reservationId) {
        // Implémentez la logique d'annulation pour la réservation avec l'ID spécifié
        Reservation__c reservation = [SELECT Id, Statut__c FROM Reservation__c WHERE Id = :reservationId LIMIT 1];
        reservation.Statut__c = 'Annulée'; // Ou tout autre statut d'annulation
        update reservation;
    }
}