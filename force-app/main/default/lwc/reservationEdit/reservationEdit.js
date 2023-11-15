import { LightningElement, api, track } from 'lwc';
import getWheaterData from '@salesforce/apex/WeatherController.getWeatherByLocation';
import images from '@salesforce/resourceUrl/images';
export default class ReservationEdit extends LightningElement {
    @track currentCity;
    @track weatherData = {};
    @track table = [];
    carouselInterval = 5000;
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
                console.log('Date : ', formattedate);
                const weatherCodeMax = timeline.values.weatherCodeMax;

                return{
                    date : formattedate,
                    imageSrc: await this.getImageSrc(weatherCodeMax),
                    description: await this.getWeatherDescription(weatherCodeMax),
                    temperature: timeline.values.temperatureMax,
                    humidity: timeline.values.humidityMax,
                    wind: timeline.values.windSpeedMax,
                    visibility: timeline.values.visibilityMax,
                };
            }));
            console.log('this.table : ', this.table);
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

    async getImageSrc(weatherCondition) {
        const imagePath = window.resourcesPath + '/images/';
        switch (weatherCondition) {
            case 1000:
                return `${imagePath}10000_clear_large.png`;
            case 1100:
                return `${imagePath}11000_mostly_clear_large.png`;
            case 1101:
                return `${imagePath}11010_partly_cloudy_large.png`;
            case 1102:
                return `${imagePath}11020_mostly_cloudy_large.png`;
            case 1001:
                return `${imagePath}10010_cloudy_large.png`;
            case 1103:
                return `${imagePath}11030_mostly_clear_large.png`;
            case 2100:
                return `${imagePath}21000_fog_light_large.png`;
            case 2000:
                return `${imagePath}20000_fog_large.png`;
            case 2101:
                return `${imagePath}21010_fog_light_mostly_clear_large.png`;
            case 2102:
                return `${imagePath}21020_fog_light_partly_cloudy_large.png`;
            case 2103:
                return `${imagePath}21030_fog_light_mostly_cloudy_large.png`;
            case 2106:
                return `${imagePath}21060_fog_mostly_clear_large.png`;
            case 2107:
                return `${imagePath}21070_fog_partly_cloudy_large.png`;
            case 2108:
                return `${imagePath}21080_fog_mostly_cloudy_large.png`;
            case 4000:
                return `${imagePath}40000_drizzle_large.png`;
            case 4200:
                return `${imagePath}42000_rain_light_large.png`;
            case 4001:
                return `${imagePath}40010_rain_large.png`;
            case 4201:
                return `${imagePath}42010_rain_heavy_large.png`;
            case 4203:
                return `${imagePath}42030_drizzle_mostly_clear_large.png`;
            case 4204:
                return `${imagePath}42040_drizzle_partly_cloudy_large.png`;
            case 4205:
                return `${imagePath}42050_drizzle_mostly_cloudy_large.png`;
            case 4213:
                return `${imagePath}42130_rain_light_mostly_clear_large.png`;
            case 4214:
                return `${imagePath}42140_rain_light_partly_cloudy_large.png`;
            case 4215:
                return `${imagePath}42150_rain_light_mostly_cloudy_large.png`;
            case 4209:
                return `${imagePath}42090_rain_mostly_clear_large.png`;
            case 4208:
                return `${imagePath}42080_rain_partly_cloudy_large.png`;
            case 4210:
                return `${imagePath}42100_rain_mostly_cloudy_large.png`;
            case 4211:
                return `${imagePath}42110_rain_heavy_mostly_clear_large.png`;
            case 4202:
                return `${imagePath}42020_rain_heavy_partly_cloudy_large.png`;
            case 4212:
                return `${imagePath}42120_rain_heavy_mostly_cloudy_large.png`;
            case 5001:
                return `${imagePath}50010_flurries_large.png`;
            case 5100:
                return `${imagePath}51000_snow_light_large.png`;
            case 5000:
                return `${imagePath}50000_snow_large.png`;
            case 5101:
                return `${imagePath}51010_snow_heavy_large.png`;
            case 5115:
                return `${imagePath}51150_flurries_mostly_clear_large.png`;
            case 5116:
                return `${imagePath}51160_flurries_partly_cloudy_large.png`;
            case 5117:
                return `${imagePath}51170_flurries_mostly_cloudy_large.png`;
            case 5122:
                return `${imagePath}51220_wintry_mix_large.png`;
            case 5102:
                return `${imagePath}51020_snow_light_mostly_clear_large.png`;
            case 5103:
                return `${imagePath}51030_snow_light_partly_cloudy_large.png`;
            case 5104:
                return `${imagePath}51040_snow_light_mostly_cloudy_large.png`;
            case 5105:
                return `${imagePath}51050_snow_mostly_clear_large.png`;
            case 5106:
                return `${imagePath}51060_snow_partly_cloudy_large.png`;
            case 5107:
                return `${imagePath}51070_snow_mostly_cloudy_large.png`;
            case 5119:
                return `${imagePath}51190_snow_heavy_mostly_clear_large.png`;
            case 5120:
                return `${imagePath}51200_snow_heavy_partly_cloudy_large.png`;
            case 5121:
                return `${imagePath}51210_snow_heavy_mostly_cloudy_large.png`;
            case 5110:
                return `${imagePath}51100_wintry_mix_large.png`;
            case 5108:
                return `${imagePath}51100_wintry_mix_large.png`;
            case 5114:
                return `${imagePath}51100_wintry_mix_large.png`;
            case 5112:
                return `${imagePath}51100_wintry_mix_large.png`;
            case 6000:
                return `${imagePath}60000_freezing_drizzle_large.png`;
            case 6200:
                return `${imagePath}62000_freezing_rain_light_large.png`;
            case 6001:
                return `${imagePath}60010_freezing_rain_large.png`;
            case 6201:
                return `${imagePath}62010_freezing_rain_heavy_large.png`;
            case 6003:
                return `${imagePath}60030_freezing_rain_drizzle_mostly_clear_large.png`;
            case 6002:
                return `${imagePath}60020_freezing_rain_drizzle_partly_cloudy_large.png`;
            case 6004:
                return `${imagePath}60040_freezing_rain_drizzle_mostly_cloudy_large.png`;
            case 6204:
                return `${imagePath}62040_wintry_mix_large.png`;
            case 6206:
                return `${imagePath}62060_wintry_mix_large.png`;
            case 6205:
                return `${imagePath}62050_freezing_rain_light_mostly_clear_large.png`;
            case 6203:
                return `${imagePath}62030_freezing_rain_light_partly_cloudy_large.png`;
            case 6209:
                return `${imagePath}62090_freezing_rain_light_mostly_cloudy_large.png`;
            case 6213:
                return `${imagePath}62130_freezing_rain_mostly_clear_large.png`;
            case 6214:
                return `${imagePath}62140_freezing_rain_partly_cloudy_large.png`;
            case 6215:
                return `${imagePath}62150_freezing_rain_mostly_cloudy_large.png`;
            case 6212:
                return `${imagePath}62120_wintry_mix_large.png`;
            case 6220:
                return `${imagePath}62200_wintry_mix_large.png`;
            case 6222:
                return `${imagePath}62220_wintry_mix_large.png`;
            case 6207:
                return `${imagePath}62070_freezing_rain_heavy_mostly_clear_large.png`;
            case 6202:
                return `${imagePath}62020_freezing_rain_heavy_partly_cloudy_large.png`;
            case 6208:
                return `${imagePath}62080_freezing_rain_heavy_mostly_cloudy_large.png`;
            case 7102:
                return `${imagePath}71020_ice_pellets_light_large.png`;
            case 7000:
                return `${imagePath}70000_ice_pellets_large.png`;
            case 7101:
                return `${imagePath}71010_ice_pellets_heavy_large.png`;
            case 7110:
                return `${imagePath}71100_ice_pellets_light_mostly_clear_large.png`;
            case 7111:
                return `${imagePath}71110_ice_pellets_light_partly_cloudy_large.png`;
            case 7112:
                return `${imagePath}71120_ice_pellets_light_mostly_cloudy_large.png`;
            case 7108:
                return `${imagePath}71080_ice_pellets_mostly_clear_large.png`;
            case 7107:
                return `${imagePath}71070_ice_pellets_partly_cloudy_large.png`;
            case 7109:
                return `${imagePath}71090_ice_pellets_mostly_cloudy_large.png`;
            case 7113:
                return `${imagePath}71130_ice_pellets_heavy_mostly_clear_large.png`;
            case 7114:
                return `${imagePath}71140_ice_pellets_heavy_partly_cloudy_large.png`;
            case 7116:
                return `${imagePath}71160_ice_pellets_heavy_mostly_cloudy_large.png`;
            case 7105:
                return `${imagePath}71050_wintry_mix_large.png`;
            case 7115:
                return `${imagePath}71150_wintry_mix_large.png`;
            case 7117:
                return `${imagePath}71170_wintry_mix_large.png`;
            case 7106:
                return `${imagePath}71060_wintry_mix_large.png`;
            case 7103:
                return `${imagePath}71030_wintry_mix_large.png`;
            case 8000:
                return `${imagePath}80000_tstorm_large.png`;
            case 8001:
                return `${imagePath}80010_tstorm_mostly_clear_large.png`;
            case 8003:
                return `${imagePath}80030_tstorm_partly_cloudy_large.png`;
            case 8002:
                return `${imagePath}80020_tstorm_mostly_cloudy_large.png`;
            default:
                return '';
        }
    }
}