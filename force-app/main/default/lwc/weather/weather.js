import { LightningElement, track} from 'lwc';
import getWheaterData from '@salesforce/apex/WeatherController.getWeatherByLocation';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class weather extends NavigationMixin(LightningElement) {
    @track currentCity;
    @track weatherData = {};
    @track table = [];
    tables = [];

    handleTableSelected(event) {
        const selectedTableId = event.detail;
        this.createNewReservation(selectedTableId);
    }

    /**
     * @param {*valeur de l'input*} event
     * @description : Permet de récupérer la valeur de l'input
     */
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
    /**
     * @description : Permet de récupérer la position actuelle
     */
    async getCurrentPosition() {
        if (this.currentCity) {
            getWheaterData({ location: this.currentCity })
                .then(async result => {
                    if (result.status === 'success') {
                        this.weatherData = await this.handleWeatherCardCarouselChange(result.body);
                    } else {
                        this.showToast('Attention', 'Veuillez entrer une ville valide', 'error');
                    }
                })
                .catch(error => {
                    this.showToast('Fatal', `Erreur lors de la récupération des données météo : ${error}`, 'error');
                });
        } else {
            console.error('Veuillez entrer le nom de la ville.');
        }
    }
    /**
     * @param {*les valeurs de l'api de la météo*} event
     * @description : Permet d'afficher les données météo
     * @return {*les données météo*}
     */
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

    /**
     * @param {*le code de la météo*} weatherCondition
     * @description : Permet de récupérer la description de la météo
     * @return {*la description de la météo*}
     * @example : 1000 => Clear
     * */
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
    /**
     * @param {les valeurs de la date et de la description} selectedDay 
     * @description : Permet de créer une nouvelle réservation
     */
    async createNewReservation(selectedDay) {
        if (!selectedDay){
            console.error('Error : selectedDay n\'est pas défini');
            return;
        }
        console.log('selectedDay :', JSON.stringify(selectedDay));
        const formattedDate = this.formatDate(selectedDay.date);

        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Reservation__c',
                actionName: 'new'
            },
            state: {
                defaultFieldValues: `Debut__c=${formattedDate},Weather__c=${JSON.stringify(selectedDay.description)},`
            }
        });
    }
    /**
     * @param {*la date brute*} rawDate
     * @description : Permet de formater la date
     * @return {*la date formatée*}
     * @example : 2021-01-01
     * */
    formatDate(rawDate) {
        const months = {
            'janvier': '01',
            'février': '02',
            'mars': '03',
            'avril': '04',
            'mai': '05',
            'juin': '06',
            'juillet': '07',
            'août': '08',
            'septembre': '09',
            'octobre': '10',
            'novembre': '11',
            'décembre': '12'
        };
        const parts = rawDate.split(' ');
        const day = parts[0];
        const month = months[parts[1].toLowerCase()];
        const year = parts[2];
        return `${year}-${month}-${day}`;
    }

    /**
     * @param {*les valeurs de la date*} event
     * @description : Permet de gérer le click sur l'image
     */
    async handleImageClick(event) {
        const selectedDate = event.currentTarget.dataset.date;
        const selectedDay = this.table.find(day => day.date === selectedDate);

        if (selectedDay && this.shouldShowConfirmation(selectedDay.description)) {
            const confirmationMessage = `Êtes-vous sûr de vouloir réserver pour ${selectedDate}?`;
            if (window.confirm(confirmationMessage)){
                await this.createNewReservation(selectedDay);
            }else{
                this.showToast('Attention', 'Vous avez annulé la réservation', 'warning');
                return;
            }
        }
        await this.createNewReservation(selectedDay);
    }

    /**
     * @param {*la description de la météo*} description
     * @description : Permet de vérifier si la météo est mauvaise
     * @return {*true ou false*}
     * @example : Rain, Snow, Thunderstorm, Drizzle, Freezing, Ice, Pellets, Wintry
     * */
    shouldShowConfirmation(description) {
        const keywords = ['Rain', 'Snow', 'Thunderstorm', 'Drizzle', 'Freezing', 'Ice', 'Pellets', 'Wintry'];
        return keywords.some(keyword => description.includes(keyword));
    }

    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title: title,
            message : message,
            variant : variant
        });
        this.dispatchEvent(event);
    }

}