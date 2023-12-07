public with sharing class TableController {
    @AuraEnabled(cacheable=true)
    public static List<Table__c> getTables() {
        return [SELECT Id, Equipement__c, Salle__c, Name, Statut__c FROM Table__c WHERE Statut__c = 'Non réservé'];
    }
    
    @AuraEnabled(cacheable=true)
    public static void updateTableStatus(String tableId){
        Table__c tableRecord = [SELECT Id, Statut__c FROM Table__c WHERE Id = :tableId LIMIT 1];
        tableRecord.Statut__c = 'Réservé';
        update tableRecord;
    }
}