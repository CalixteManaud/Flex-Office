import { LightningElement, track, wire, api } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import getWeatherByLocation from '@salesforce/apex/WeatherController.getWeatherByLocation';

const fields = [
    'Account.Name', // Replace with the appropriate API name
    'Acccout.Equipment__c' // Replace with the appropriate API name
];

export default class TabList extends LightningElement {
    @api recordId; // Account Id
    @track availabeTables = []; // List of available tabless

    @wire(getRecord, { recordId: '$recordId', fields })
    account;

    @wire(getWeatherByLocation, { latitude: '$latitude', longitude: '$longitude' })
    weatherData;

    get latitude() {
        if (this.account.data.fields)
            return this.account.data.fields.ShippingLatitude.value;
        return null;
    }

    get longitude() {
        if (this.account.data.fields)
            return this.account.data.fields.ShippingLongitude.value;
        return null;
    }

    get isWeatherBad () {
        if (this.weatherData.data) {
            const weather = this.weatherData.data.weather[0].main;
            return weather === 'Rain' || weather === 'Snow';
        }
        return false;
    }

    get availabeTables () {
        // Replace with the appropriate logic
        return [
            {
                Id: '001',
                Name: 'Table 1',
                Equipement__c: 'Multiprise, Ecran',
                Weather__c: this.isWeatherBad ? 'Confirmation requise' : 'Ensoleillé'
            },
            {
                Id: '002',
                Name: 'Table 2',
                Equipement__c: 'Clavier/Souris',
                Weather__c: this.isWeatherBad ? 'Confirmation requise' : 'Ensoleillé'
            },
            // Add more tables here
        ]
    }
}