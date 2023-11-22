import { LightningElement } from 'lwc';
import generatePDF from '@salesforce/apex/PDFController.generatePDF';

export default class ReservationComponent extends LightningElement {
    handleGeneratePDF() {
        console.log('handleGeneratePDF');
        generatePDF({reservations})
        .then(result => {
            console.log('PDF généré avec succès:', result);
        })
        .catch(error => {
            console.error('Erreur lors de la génération du PDF 2 :', error);
        });
    }
}