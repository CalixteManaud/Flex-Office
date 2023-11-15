import { LightningElement, track, wire, api } from 'lwc';

export default class TabList extends LightningElement {
    @track reservationDate;
    @track availableDates = [];

    handleDateChange(event) {
        this.reservationDate = event.detail.value;
    }

    loadAvailableDates() {
    }

    handleReservation(event) {
        const tableId = event.target.dataset.tableId;
    }

    handleModification(event) {
        const tableId = event.target.dataset.tableId;
        // Implémentez la logique de modification pour la table avec l'ID spécifié
    }

    handleCancellation(event) {
        const tableId = event.target.dataset.tableId;
        // Implémentez la logique d'annulation pour la table avec l'ID spécifié
    }
}