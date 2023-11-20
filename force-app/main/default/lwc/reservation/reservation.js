import { LightningElement, wire } from 'lwc';
import { MessageContext, subscribe } from 'lightning/messageService';
import WEATHERMC from '@salesforce/messageChannel/WeatherMessageChannel__c';

export default class Reservation extends LightningElement {
    @wire(MessageContext)
    messageContext;

    date;
    description;
    

    subscription;

    connectedCallback() {
        this.subscribeToMessageChannel();
    }

    subscribeToMessageChannel() {
        this.subscription = subscribe(
            this.messageContext,
            WEATHERMC,
            (message) => this.handleMessage(message)
        );
    }

    handleMessage(message) {
        this.date = message.date;
        this.description = message.description;
    }
}