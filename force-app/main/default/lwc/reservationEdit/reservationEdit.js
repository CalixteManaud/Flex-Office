import { LightningElement, api, track } from 'lwc';
import getWheaterData from '@salesforce/apex/WeatherController.getWeatherByLocation';
//import images from '@salesforce/resourceUrl/images';
export default class ReservationEdit extends LightningElement {
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
                    imageSrc: await this.getImageSrc(weatherCodeMax),
                    description: await this.getWeatherDescription(weatherCodeMax),
                    temperature: timeline.values.temperatureMax,
                    humidity: timeline.values.humidityMax,
                    wind: timeline.values.windSpeedMax,
                    visibility: timeline.values.visibilityMax,
                };
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

    async getImageSrc(weatherCondition) {
        const imagePath = window.resourcesPath + '/images/';
        switch (weatherCondition) {
            case 1000:
                return 'https://mindful-shark-l8by6a-dev-ed.trailblaze.file.force.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Png&versionId=0682o00000vmped&operationContext=DELIVERY&contentId=05T2o00002FXLoF&page=0&d=/a/2o000000r2aP/GD5A.M5D6k5EcrKSwCJ0m7j98ELUOE_7T_mblRv0NG8&oid=00D2o000000iu9F&dpt=null&viewId=';
            case 1100:
                return 'https://mindful-shark-l8by6a-dev-ed.trailblaze.file.force.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Png&versionId=0682o00000vmpej&operationContext=DELIVERY&contentId=05T2o00002FXLoP&page=0&d=/a/2o000000r2aQ/dZuv2PnPgGPjAjbyTFDd1RcLEnzKKM947zzGQ3yt4YA&oid=00D2o000000iu9F&dpt=null&viewId=';
            case 1101:
                return 'https://mindful-shark-l8by6a-dev-ed.trailblaze.file.force.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Png&versionId=0682o00000vmpek&operationContext=DELIVERY&contentId=05T2o00002FXLoU&page=0&d=/a/2o000000r2aU/YhFaVmfDv_m9Bj3f9U2hy3JWIquLZxFI31i4yv5hzn4&oid=00D2o000000iu9F&dpt=null&viewId=';
            case 1102:
                return 'https://mindful-shark-l8by6a-dev-ed.trailblaze.file.force.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Png&versionId=0682o00000vmpel&operationContext=DELIVERY&contentId=05T2o00002FXLVd&page=0&d=/a/2o000000r2aZ/NX698oKNQjuY4jfAmHnvxe4_K4P4J5v_6yjQ42CzPF0&oid=00D2o000000iu9F&dpt=null&viewId=';
            case 1001:
                return 'https://mindful-shark-l8by6a-dev-ed.trailblaze.file.force.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Png&versionId=0682o00000vmpei&operationContext=DELIVERY&contentId=05T2o00002FXLoK&page=0&d=/a/2o000000r2ae/9IwOjgXJrFgrqHsJdu8PxN4.1C47vkvv4gEoT4CHw4M&oid=00D2o000000iu9F&dpt=null&viewId=';
            case 1103:
                return 'https://mindful-shark-l8by6a-dev-ed.trailblaze.file.force.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Png&versionId=0682o00000vmpes&operationContext=DELIVERY&contentId=05T2o00002FXLoy&page=0&d=/a/2o000000r2aj/_Ybm.gPjQpjTQdefhGImSdNmAxEnC.udGsfc5BSHiBk&oid=00D2o000000iu9F&dpt=null&viewId=';
            case 2100:
                return 'https://mindful-shark-l8by6a-dev-ed.trailblaze.file.force.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Png&versionId=0682o00000vmpij&operationContext=DELIVERY&contentId=05T2o00002FXM0V&page=0&d=/a/2o000000r2ao/7y.q4O0muIZuN40WgX8MiLbf.LJ0iq4eKcbq1Qpx6Pg&oid=00D2o000000iu9F&dpt=null&viewId=';
            case 2000:
                return 'https://mindful-shark-l8by6a-dev-ed.trailblaze.file.force.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Png&versionId=0682o00000vmpee&operationContext=DELIVERY&contentId=05T2o00002FXM0Q&page=0&d=/a/2o000000r2at/HRj2XBuBlTlmZLis_1F_8ICnmdHJg.a5uSRC5nmEuME&oid=00D2o000000iu9F&dpt=null&viewId=';
            case 2101:
                return 'https://mindful-shark-l8by6a-dev-ed.trailblaze.file.force.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Png&versionId=0682o00000vmpef&operationContext=DELIVERY&contentId=05T2o00002FXM0a&page=0&d=/a/2o000000r2ap/4LpVAXXjgcLfp.JS2FuLazbCBk04Dhb8Fe0RWUM4Iu4&oid=00D2o000000iu9F&dpt=null&viewId=';
            case 2102:
                return 'https://mindful-shark-l8by6a-dev-ed.trailblaze.file.force.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Png&versionId=0682o00000vmpio&operationContext=DELIVERY&contentId=05T2o00002FXKVO&page=0&d=/a/2o000000r2ay/LODmwMEGqZLofFH4e6L9FY4SagD_rhRxa4PHf4Grb60&oid=00D2o000000iu9F&dpt=null&viewId=';
            case 2103:
                return 'https://mindful-shark-l8by6a-dev-ed.trailblaze.file.force.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Png&versionId=0682o00000vmpip&operationContext=DELIVERY&contentId=05T2o00002FXM0f&page=0&d=/a/2o000000r2b3/aYBLzHoj89o5HRYIgG2ilN.LCwKAI7XFuiXQv0CzFwA&oid=00D2o000000iu9F&dpt=null&viewId=';
            case 2106:
                return 'https://mindful-shark-l8by6a-dev-ed.trailblaze.file.force.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Png&versionId=0682o00000vmpiq&operationContext=DELIVERY&contentId=05T2o00002FXM0k&page=0&d=/a/2o000000r2b8/NnfxKTpUEbEbpQXXIQIkb7uvspC9lJeiWnkFzxFT6Qs&oid=00D2o000000iu9F&dpt=null&viewId=';
            case 2107:
                return 'https://mindful-shark-l8by6a-dev-ed.trailblaze.file.force.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Png&versionId=0682o00000vmpit&operationContext=DELIVERY&contentId=05T2o00002FXM0R&page=0&d=/a/2o000000r2bD/9a0AITnfkX8V6ax29w3UW_hv8wQ5B2zvnwZgs7E45TQ&oid=00D2o000000iu9F&dpt=null&viewId=';
            case 2108:
                return 'https://mindful-shark-l8by6a-dev-ed.trailblaze.file.force.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Png&versionId=0682o00000vmq3u&operationContext=DELIVERY&contentId=05T2o00002FXN10&page=0&d=/a/2o000000r2bI/CNQwGVX9DgQ5I.KaI_3vX1XNtg7Bv99Fpc_TRSjThg4&oid=00D2o000000iu9F&dpt=null&viewId=';
            case 4000:
                return 'https://mindful-shark-l8by6a-dev-ed.trailblaze.file.force.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Png&versionId=0682o00000vmqOF&operationContext=DELIVERY&contentId=05T2o00002FXNnd&page=0&d=/a/2o000000r2bN/bJGZTtZzXVUHr7SLWn.lYOZ7Y1pPErQpVLu7FbXkpeA&oid=00D2o000000iu9F&dpt=null&viewId=';
            case 4200:
                return 'https://mindful-shark-l8by6a-dev-ed.trailblaze.file.force.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Png&versionId=0682o00000vmqOG&operationContext=DELIVERY&contentId=05T2o00002FXNns&page=0&d=/a/2o000000r2bO/eaWqDyB61KlB9XpmyFXbzz79W_cuEhBF1EjzG252od8&oid=00D2o000000iu9F&dpt=null&viewId=';
            case 4001:
                return 'https://mindful-shark-l8by6a-dev-ed.trailblaze.file.force.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Png&versionId=0682o00000vmqHa&operationContext=DELIVERY&contentId=05T2o00002FXNnn&page=0&d=/a/2o000000r2bS/QqrdcS9TvZ72iupL4jMDqh8MG.75b4D9QOapTj9TO9Q&oid=00D2o000000iu9F&dpt=null&viewId=';
            case 4201:
                return 'https://mindful-shark-l8by6a-dev-ed.trailblaze.file.force.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Png&versionId=0682o00000vmqOP&operationContext=DELIVERY&contentId=05T2o00002FXNjN&page=0&d=/a/2o000000r2bX/KKhVe_rT9YtgBXuZuCiSyYgIHEH_VkN4X6reQkl5yU0&oid=00D2o000000iu9F&dpt=null&viewId=';
            case 4203:
                return 'https://mindful-shark-l8by6a-dev-ed.trailblaze.file.force.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Png&versionId=0682o00000vmqOP&operationContext=DELIVERY&contentId=05T2o00002FXNjN&page=0&d=/a/2o000000r2bX/KKhVe_rT9YtgBXuZuCiSyYgIHEH_VkN4X6reQkl5yU0&oid=00D2o000000iu9F&dpt=null&viewId=';
            case 4204:
                return 'https://mindful-shark-l8by6a-dev-ed.trailblaze.file.force.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Png&versionId=0682o00000vmqOI&operationContext=DELIVERY&contentId=05T2o00002FXNo2&page=0&d=/a/2o000000r2bY/5ngFvrjBcWbTC4uvGPjFWMk7Nu6m3RorGyQQRCI1KdU&oid=00D2o000000iu9F&dpt=null&viewId=';
            case 4205:
                return 'https://mindful-shark-l8by6a-dev-ed.trailblaze.file.force.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Png&versionId=0682o00000vmqOJ&operationContext=DELIVERY&contentId=05T2o00002FXNo7&page=0&d=/a/2o000000r2bc/TGGlOCBQnzW8Bh1YpxohprW4A_EoVlQp2tMAEKscnUg&oid=00D2o000000iu9F&dpt=null&viewId=';
            case 4213:
                return 'https://mindful-shark-l8by6a-dev-ed.trailblaze.file.force.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Png&versionId=0682o00000vmqPU&operationContext=DELIVERY&contentId=05T2o00002FXNrQ&page=0&d=/a/2o000000r2bh/1XDof5qeMWbwn9QW.WErXCzX9BDV7Zwwg6AolY6ZFJw&oid=00D2o000000iu9F&dpt=null&viewId=';
            case 4214:
                return 'https://mindful-shark-l8by6a-dev-ed.trailblaze.file.force.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Png&versionId=0682o00000vmqPV&operationContext=DELIVERY&contentId=05T2o00002FXNrV&page=0&d=/a/2o000000r2bQ/WnWYnajjDjazZRCjobw9YybCVs.LF7oqJNLAGTp0u6w&oid=00D2o000000iu9F&dpt=null&viewId=';
            case 4215:
                return 'https://mindful-shark-l8by6a-dev-ed.trailblaze.file.force.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Png&versionId=0682o00000vmqPX&operationContext=DELIVERY&contentId=05T2o00002FXNra&page=0&d=/a/2o000000r2bm/AOXd8BK.ALiv2GbIo0g9hTDtj42aBuJK69pvbSSFC98&oid=00D2o000000iu9F&dpt=null&viewId=';
            case 4209:
                return 'https://mindful-shark-l8by6a-dev-ed.trailblaze.file.force.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Png&versionId=0682o00000vmqOR&operationContext=DELIVERY&contentId=05T2o00002FXNrG&page=0&d=/a/2o000000r2br/22838dljY3QaeQSacnhBWuUXhhOSBeNPfrgoE38oD24&oid=00D2o000000iu9F&dpt=null&viewId=';
            case 4208:
                return 'https://mindful-shark-l8by6a-dev-ed.trailblaze.file.force.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Png&versionId=0682o00000vmqPN&operationContext=DELIVERY&contentId=05T2o00002FXNrB&page=0&d=/a/2o000000r2bw/_C4MD_QBvmMCBEDZvsdCrdEddJ_FP_AqTBVBnUyjwwA&oid=00D2o000000iu9F&dpt=null&viewId=';
            case 4210:
                return 'https://mindful-shark-l8by6a-dev-ed.trailblaze.file.force.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Png&versionId=0682o00000vmqPS&operationContext=DELIVERY&contentId=05T2o00002FXNfB&page=0&d=/a/2o000000r2bx/JH.f1yyS4k7z5hvvl4BaVAeqChLlagnO1CQe6xz._bU&oid=00D2o000000iu9F&dpt=null&viewId=';
            case 4211:
                return 'https://mindful-shark-l8by6a-dev-ed.trailblaze.file.force.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Png&versionId=0682o00000vmqPT&operationContext=DELIVERY&contentId=05T2o00002FXNrL&page=0&d=/a/2o000000r2bn/TjoZg1HY4nPH_Z0qLuYZ2.sgnk52OgywZ4mmorUTo7o&oid=00D2o000000iu9F&dpt=null&viewId=';
            case 4202:
                return 'https://mindful-shark-l8by6a-dev-ed.trailblaze.file.force.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Png&versionId=0682o00000vmqOQ&operationContext=DELIVERY&contentId=05T2o00002FXNr6&page=0&d=/a/2o000000r2bo/kr7uf7rrCm9C7s6KG0p08xN1YieJ7seuF0YwlZRnepo&oid=00D2o000000iu9F&dpt=null&viewId=';
            case 4212:
                return 'https://mindful-shark-l8by6a-dev-ed.trailblaze.file.force.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Png&versionId=0682o00000vmqQQ&operationContext=DELIVERY&contentId=05T2o00002FXNuA&page=0&d=/a/2o000000r2bs/ux3Zq_wK5Kfs9QhTsdHUiGdkx_lhxJJdjt0yI4J4mvY&oid=00D2o000000iu9F&dpt=null&viewId=';
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

    async handleImageClick (event){
        const selectedDate = event.detail.item.header; // Récupération de la date sélectionnée
        const selectedDay = this.table.find(day => day.date === selectedDate); // Récupération des données météo du jour sélectionné

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