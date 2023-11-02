import { LightningElement, api, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import updateReservation from '@salesforce/apex/ReservationController.updateReservation';
import cancelReservation from '@salesforce/apex/ReservationController.cancelReservation';

export default class ReservationEdit extends LightningElement {
    @api tableName;
    @api reservationDate;
    @api reservationTime;

    @track newReservationDate;
    @track newReservationTime;
    @track cancellationReason;

    @track canEdit = false;
    @track canCancel = false;

    handleDateChange(event) {
        this.newReservationDate = event.target.value;
    }

    handleTimeChange(event) {
        this.newReservationTime = event.target.value;
    }

    handleReasonChange(event) {
        this.cancellationReason = event.target.value;
    }

    handleSave () {
        // Call the updateReservation Apex method
        updateReservation({
            // Pass reservation ID or other necessary parameters
            newReservationDate: this.newReservationDate,
            newReservationTime: this.newReservationTime
        })
        .then(result => {
            this.ShowToastEvent('Reservation modifiée avec succès');
        })
        .catch(error => {
            this.ShowToastEvent('Erreur lors de la modification de la réservation');
        });
    }

    handleCancel() {
        // Call the cancelReservation method to cancel the reservation
        cancelReservation({ 
            // Pass reservation ID and cancellation reason
            cancellationReason: this.cancellationReason
        })
        .then(result => {
            this.showSuccessToast('Réservation annulée avec succès.');
            // Perform any necessary post-cancellation actions
        })
        .catch(error => {
            this.showErrorToast('Erreur lors de l\'annulation de la réservation.');
        });
    }

    showSuccessToast(message){
        const event = new ShowToastEvent({
            title: 'Succès',
            message: message,
            variant: 'success'
        });
        this.dispatchEvent(event);
    }

    showErrorToast(message){
        const event = new ShowToastEvent({
            title: 'Erreur',
            message: message,
            variant: 'error'
        });
        this.dispatchEvent(event);
    }

}