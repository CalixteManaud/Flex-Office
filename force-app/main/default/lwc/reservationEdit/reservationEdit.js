import { LightningElement, api, track } from 'lwc';
import getWheaterData from '@salesforce/apex/WeatherController.getWeatherByLocation';

export default class ReservationEdit extends LightningElement {
    @api reservationId;
    @api tableId;
    selectedDate;
    weatherData;
    isLoading = false;

    // Méthode pour obtenir la position de l'utilisateur
    getCurrentPosition() {
        if (navigator.geolocation){
            navigator.geolocation.getCurrentPosition(position => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                // Appel à la méthode getWeatherByLocation du WeatherController avec la position et la date
                getWheaterData({latitude, longitude, date: this.selectedDate})
                    .then(data => {
                        this.weatherData = JSON.parse(data);
                        this.isLoading = false;
                    })
                    .catch(error => {
                        console.error('Erreur lors de la récupération des données météo:', error);
                        this.isLoading = false;
                    });
        });
    } else {
        console.error('La géolocalisation n\'est pas prise en charge par ce navigateur.');
    }

    handleWeatherData(data) {
        this.weatherData = JSON.parse(data);
        this.isLoading = false;
    }

}