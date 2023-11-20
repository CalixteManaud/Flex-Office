import { LightningElement, api, track, wire } from 'lwc';
import getWheaterData from '@salesforce/apex/WeatherController.getWeatherByLocation';
//import images from '@salesforce/resourceUrl/images';
export default class weather extends LightningElement {
    @track currentCity;
    @track weatherData = {};
    @track table = [];

    async handleCityChange(event){
         this.currentCity = event.target.value;
    }
    async handleSaveReservation() {
        try {
            await this.getCurrentPosition();
        } catch (error) {
            console.error('Error in handleSaveReservation:', error);
        }
    }
    // Méthode pour obtenir la position de l'utilisateur
    async getCurrentPosition() {
        if (this.currentCity) {
            getWheaterData({ location: this.currentCity })
                .then(async result => {
                    if (result.status === 'success') {
                        this.weatherData = await this.handleWeatherCardCarouselChange(result.body);
                    } else {
                        console.error('Erreur lors de la récupération des données météo 1:', result.message);
                    }
                })
                .catch(error => {
                    console.error('Erreur lors de la récupération des données météo 2:', error);
                });
        } else {
            console.error('Veuillez entrer le nom de la ville.');
        }
    }

    async handleWeatherCardCarouselChange(event) {
        try {
            this.weatherData = JSON.parse(event);
            const dailyTimelines = this.weatherData.timelines.daily;
    
            this.table = await Promise.all(dailyTimelines.map(async timeline => {
                const date = timeline.time;
                const formattedate = new Date(date).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                    timeZone: 'UTC' // Vous pouvez ajuster le fuseau horaire si nécessaire
                });
                const weatherCodeMax = timeline.values.weatherCodeMax;
                return{
                    date : formattedate,
                    description: await this.getWeatherDescription(weatherCodeMax),
                    temperature: timeline.values.temperatureMax
                }
            }));
            return this.table;
        } catch (error) {
            console.error('Erreur lors de la manipulation des données météo :', error);
            return [];
        }
    }


    async getWeatherDescription(weatherCondition) {
        switch (weatherCondition) {
            case 1000:
                return 'Clear';
            case 1100:
                return 'Mostly Clear';
            case 1101:
                return 'Partly Cloudy';
            case 1102:
                return 'Mostly Cloudy';
            case 1001:
                return 'Cloudy';
            case 1103:
                return 'Partly Cloudy';
            case 2100:
                return 'Light Fog';
            case 2000:
                return 'Fog';
            case 2101:
                return 'Mostly Clear';
            case 2102:
                return 'Partly Cloudy';
            case 2103:
                return 'Mostly Cloudy';
            case 2106:
                return 'Mostly Clear';
            case 2107:
                return 'Partly Cloudy';
            case 2108:
                return 'Mostly Cloudy';
            case 4000:
                return 'Drizzle';
            case 4200:
                return 'Light Rain';
            case 4001:
                return 'Rain';
            case 4201:
                return 'Heavy Rain';
            case 4203:
                return 'Mostly Clear';
            case 4204:
                return 'Partly Cloudy';
            case 4205:
                return 'Mostly Cloudy';
            case 4213:
                return 'Mostly Clear';
            case 4214:
                return 'Partly Cloudy';
            case 4215:
                return 'Mostly Cloudy';
            case 4209:
                return 'Mostly Clear';
            case 4208:
                return 'Partly Cloudy';
            case 4210:
                return 'Mostly Cloudy';
            case 4211:
                return 'Mostly Clear';
            case 4202:
                return 'Partly Cloudy';
            case 4212:
                return 'Mostly Cloudy';
            case 5001:
                return 'Flurries';
            case 5100:
                return 'Light Snow';
            case 5000:
                return 'Snow';
            case 5101:
                return 'Heavy Snow';
            case 5115:
                return 'Mostly Clear';
            case 5116:
                return 'Partly Cloudy';
            case 5117:
                return 'Mostly Cloudy';
            case 5122:
                return 'Drizzle';
            case 5102:
                return 'Mostly Clear';
            case 5103:
                return 'Partly Cloudy';
            case 5104:
                return 'Mostly Cloudy';
            case 5105:
                return 'Mostly Clear';
            case 5106:
                return 'Partly Cloudy';
            case 5107:
                return 'Mostly Cloudy';
            case 5119:
                return 'Mostly Clear';
            case 5120:
                return 'Partly Cloudy';
            case 5121:
                return 'Mostly Cloudy';
            case 5110:
                return 'Drizzle';
            case 5108:
                return 'Rain';
            case 5114:
                return 'Snow';
            case 5112:
                return 'Snow';
            case 6000:
                return 'Freezing Drizzle';
            case 6200:
                return 'Light Freezing Drizzle';
            case 6001:
                return 'Freezing Rain';
            case 6201:
                return 'Heavy Freezing Rain';
            case 6003:
                return 'Mostly Clear';
            case 6002:
                return 'Partly Cloudy';
            case 6004:
                return 'Mostly Cloudy';
            case 6204:
                return 'Drizzle';
            case 6206:
                return 'Light Rain';
            case 6205:
                return 'Mostly Clear';
            case 6203:
                return 'Partly Cloudy';
            case 6209:
                return 'Mostly Cloudy';
            case 6213:
                return 'Mostly Clear';
            case 6214:
                return 'Partly Cloudy';
            case 6215:
                return 'Mostly Cloudy';
            case 6212:
                return 'Drizzle';
            case 6220:
                return 'Light Rain';
            case 6222:
                return 'Rain';
            case 6207:
                return 'Mostly Clear';
            case 6202:
                return 'Partly Cloudy';
            case 6208:
                return 'Mostly Cloudy';
            case 7102:
                return 'Light Ice Pellets';
            case 7000:
                return 'Ice Pellets';
            case 7101:
                return 'Heavy Ice Pellets';
            case 7110:
                return 'Mostly Clear';
            case 7111:
                return 'Partly Cloudy';
            case 7112:
                return 'Mostly Cloudy';
            case 7108:
                return 'Mostly Clear';
            case 7107:
                return 'Partly Cloudy';
            case 7109:
                return 'Mostly Cloudy';
            case 7113:
                return 'Mostly Clear';
            case 7114:
                return 'Partly Cloudy';
            case 7116:
                return 'Mostly Cloudy';
            case 7105:
                return 'Drizzle';
            case 7115:
                return 'Light Rain';
            case 7117:
                return 'Rain';
            case 7106:
                return 'Freezing Rain';
            case 7103:
                return 'Freezing Rain';
            case 8000:
                return 'Thunderstorm';
            case 8001:
                return 'Mostly Clear';
            case 8003:
                return 'Partly Cloudy';
            case 8002:
                return 'Mostly Cloudy';
            default:
                return '';
        }
    }

    handleImageClick(event) {
        const selectedDate = event.currentTarget.dataset.date;
        const selectedDay = this.table.find(day => day.date === selectedDate);
    
        console.log('selectedDate:', selectedDate);
        console.log('selectedDay:', selectedDay);
    
        if (selectedDay && this.shouldShowConfirmation(selectedDay.description)) {
            const confirmationMessage = `Êtes-vous sûr de vouloir réserver pour ${selectedDate}?`;
            if (window.confirm(confirmationMessage))
                this.handleSaveReservation(selectedDay);
        }
    }

    shouldShowConfirmation(description) {
        return description.includes('Rain') || description.includes('Snow') || description.includes('Thunderstorm') || description.includes('Drizzle') || description.includes('Freezing') || description.includes('Ice') || description.includes('Pellets') || description.includes('Wintry');
    }

}