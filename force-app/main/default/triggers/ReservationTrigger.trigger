trigger ReservationTrigger on Reservation__c (after insert) {
    // Get the table Ids from the reservations
    Set<Id> tableIdsToUpdate = new Set<Id>();

    for (Reservation__c reservation : Trigger.new) {
        // Vérifier si la réservation a une table associée
        if (reservation.Reserved_Table__c != null) {
            tableIdsToUpdate.add(reservation.Reserved_Table__c);
        }
    }

    // Get the tables
    List<Table__c> tablesToUpdate = new List<Table__c>();
    for (Id tableId : tableIdsToUpdate) {
        tablesToUpdate.add(new Table__c(
            Id = tableId,
            Statut__c = 'Réservé'
        ));
    }

    // Update the tables
    if (!tablesToUpdate.isEmpty()) {
        update tablesToUpdate;
    }
}