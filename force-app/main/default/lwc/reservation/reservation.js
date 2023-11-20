import { LightningElement, track } from 'lwc';

export default class Reservation extends LightningElement {
    connectedCallback() {
        this.template.addEventListener('weatherdatachange', this.handleWeatherDataChange.bind(this));
    }

    handleWeatherDataChange(event) {
        this.weatherData = event.detail;
    }
}