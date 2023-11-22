import { LightningElement, wire } from 'lwc';
import { refreshApex } from '@salesforce/apex';
import getTables from '@salesforce/apex/TableController.getTables';
import deleteTable from '@salesforce/apex/TableController.deleteTable';

const columns = [
    { label: 'Table Name', fieldName: 'Name', type: 'text' },
    { label: 'Statut', fieldName: 'Statut__c', type: 'text' },
    { label: 'Salle', fieldName: 'Salle__c', type: 'text' },
    { label: 'Equipement', fieldName: 'Equipement__c', type: 'text' },
    { type: 'button', label: 'Delete', initialWidth: 80, typeAttributes: { label: 'Delete', name: 'delete', title: 'Delete', variant: 'destructive', iconName: 'utility:delete' } },
];

export default class Tablerelated extends LightningElement {
    tables = [];
    columns = columns;
    error;

    @wire(getTables)
    wiredTables(result) {
        this.wiredResult = result;
        const { data, error } = result;
        if (data) {
            this.tables = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.tables = [];
        }
    }

    handleRowAction(event) {
        const action = event.detail.action;
        const row = event.detail.row;

        switch (action.name) {
            case 'delete':
                this.deleteTableRecord(row.Id);
                break;
            // Ajoutez d'autres cas pour d'autres actions si nécessaire
            default:
                break;
        }
    }

    handelRefreshClick() {
        // Actualiser les données en utilisant refreshApex
        return refreshApex(this.wiredResult);
    }
}
