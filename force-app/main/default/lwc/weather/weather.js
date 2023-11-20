import { LightningElement, track, wire } from 'lwc';
import getWheaterData from '@salesforce/apex/WeatherController.getWeatherByLocation';

export default class weather extends LightningElement {
    @track currentCity;
    @track weatherData = {};
    @track table = [];
    // Méthode pour obtenir la valeur de l'input
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
    // Méthode pour obtenir la météo
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
            const weatherChangeEvent = new CustomEvent('weatherchange', {
                detail: {
                    date: this.table[0].date, // On récupère la date du premier élément du tableau
                    description: this.table[0].description, // On récupère la description du premier élément du tableau
                },
            });
            this.dispatchEvent(weatherChangeEvent);
            return this.table;
        } catch (error) {
            console.error('Erreur lors de la manipulation des données météo :', error);
            return [];
        }
    }

    // Méthode pour obtenir la description de la météo
    async getWeatherDescription(weatherCondition) {
        const weatherMapping = {
            1000: 'Clear',
            1100: 'Mostly Clear',
            1101: 'Partly Cloudy',
            1102: 'Mostly Cloudy',
            1001: 'Cloudy',
            1103: 'Mostly Clear',
            2100: 'Light Fog',
            2000: 'Fog',
            2101: 'Mostly Clear',
            2102: 'Partly Cloudy',
            2103: 'Mostly Cloudy',
            2106: 'Mostly Clear',
            2107: 'Partly Cloudy',
            2108: 'Mostly Cloudy',
            4000: 'Drizzle',
            4200: 'Light Rain',
            4001: 'Rain',
            4201: 'Heavy Rain',
            4203: 'Mostly Clear',
            4204: 'Partly Cloudy',
            4205: 'Mostly Cloudy',
            4213: 'Mostly Clear',
            4214: 'Partly Cloudy',
            4215: 'Mostly Cloudy',
            4209: 'Mostly Clear',
            4208: 'Partly Cloudy',
            4210: 'Mostly Cloudy',
            4211: 'Mostly Clear',
            4202: 'Partly Cloudy',
            4212: 'Mostly Cloudy',
            5001: 'Flurries',
            5100: 'Light Snow',
            5000: 'Snow',
            5101: 'Heavy Snow',
            5115: 'Mostly Clear',
            5116: 'Partly Cloudy',
            5117: 'Mostly Cloudy',
            5122: 'Drizzle',
            5102: 'Mostly Clear',
            5103: 'Partly Cloudy',
            5104: 'Mostly Cloudy',
            5105: 'Mostly Clear',
            5106: 'Partly Cloudy',
            5107: 'Mostly Cloudy',
            5119: 'Mostly Clear',
            5120: 'Partly Cloudy',
            5121: 'Mostly Cloudy',
            5110: 'Drizzle',
            5108: 'Rain',
            5114: 'Snow',
            5112: 'Snow',
            6000: 'Freezing Drizzle',
            6200: 'Light Freezing Drizzle',
            6001: 'Freezing Rain',
            6201: 'Heavy Freezing Rain',
            6003: 'Mostly Clear',
            6002: 'Partly Cloudy',
            6004: 'Mostly Cloudy',
            6204: 'Drizzle',
            6206: 'Light Rain',
            6205: 'Mostly Clear',
            6203: 'Partly Cloudy',
            6209: 'Mostly Cloudy',
            6213: 'Mostly Clear',
            6214: 'Partly Cloudy',
            6215: 'Mostly Cloudy',
            6212: 'Drizzle',
            6220: 'Light Rain',
            6222: 'Rain',
            6207: 'Mostly Clear',
            6202: 'Partly Cloudy',
            6208: 'Mostly Cloudy',
            7102: 'Light Ice Pellets',
            7000: 'Ice Pellets',
            7101: 'Heavy Ice Pellets',
            7110: 'Mostly Clear',
            7111: 'Partly Cloudy',
            7112: 'Mostly Cloudy',
            7108: 'Mostly Clear',
            7107: 'Partly Cloudy',
            7109: 'Mostly Cloudy',
            7113: 'Mostly Clear',
            7114: 'Partly Cloudy',
            7116: 'Mostly Cloudy',
            7105: 'Drizzle',
            7115: 'Light Rain',
            7117: 'Rain',
            7106: 'Freezing Rain',
            7103: 'Freezing Rain',
            8000: 'Thunderstorm',
            8001: 'Mostly Clear',
            8003: 'Partly Cloudy',
            8002: 'Mostly Cloudy'
        };
        return weatherMapping[weatherCondition] || 'Unknown';
    }
    // Méthode pour obtenir la météo
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
    // Méthode pour obtenir la météo
    shouldShowConfirmation(description) {
        const keywords = ['Rain', 'Snow', 'Thunderstorm', 'Drizzle', 'Freezing', 'Ice', 'Pellets', 'Wintry'];
        return keywords.some(keyword => description.includes(keyword));
    }

}