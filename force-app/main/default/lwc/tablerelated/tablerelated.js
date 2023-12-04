import { LightningElement, wire, track } from 'lwc';
//import { refreshApex } from '@salesforce/apex';
import getTables from '@salesforce/apex/TableController.getTables';
const columns = [
    { label: 'Table Name', fieldName: 'Name', type: 'text' },
    { label: 'Statut', fieldName: 'Statut__c', type: 'text' },
    { label: 'Salle', fieldName: 'Salle__c', type: 'text' },
    { label: 'Equipement', fieldName: 'Equipement__c', type: 'text' },
];

export default class Tablerelated extends LightningElement {
    @track tables = [];
    columns = columns;
    @track error;

    // Utilisation de wired pour obtenir les données depuis l'Apex
    @wire(getTables)
    wiredTables(result) {
        const { data, error } = result;
        if (data) {
            this.tables = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.tables = [];
        }
    }
}