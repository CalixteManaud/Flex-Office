public with sharing class PDFController {
    public static List<Reservation__c> getReservations(){
        List <Reservation__c> allReservationsByDate = [
            SELECT Id, Name, Debut__c, Fin__c, Raison__c, Reserved_Table__r.Name, Statut__c, Weather__c 
            FROM  Reservation__c
            ORDER BY Debut__c ASC
            ];
        return allReservationsByDate;  
    }
}