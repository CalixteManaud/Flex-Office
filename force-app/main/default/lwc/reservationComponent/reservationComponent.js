import { LightningElement } from 'lwc';
import { CloseActionSreentEvent } from 'lightning/actions';

export default class ReservationComponent extends LightningElement {
    showPdf = false;// boutton de pdf desactive
    siteURL; // lien de tous les reservation
    ShowBtnPdf = true;
 
 
    clickShowPdf() {
        this.showPdf = !this.showPdf;
    }
 
    closeModal(){
        this.showPdf = false;
      }
 
    siteURL = "/apex/ReservationPDF";
    get url() {
        return this.siteURL;
    }
 
    createPdf() {
        this.dispatchEvent(new CloseActionSreentEvent());
    }
}