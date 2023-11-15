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
                return 'https://mindful-shark-l8by6a-dev-ed.trailblaze.file.force.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Png&versionId=0682o00000vmqQg&operationContext=DELIVERY&contentId=05T2o00002FXNuy&page=0&d=/a/2o000000r2c1/e66e6duTtva2Bf7nWeKqODxFI4GpXWQVSEQIQgxkHcs&oid=00D2o000000iu9F&dpt=null&viewId=';
            case 5100:
                return 'https://mindful-shark-l8by6a-dev-ed.trailblaze.file.force.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Png&versionId=0682o00000vmqQh&operationContext=DELIVERY&contentId=05T2o00002FXNv3&page=0&d=/a/2o000000r2c6/ADsbW5pb8CO89izbaVsvH_E5IIDK.MRL2YPu6o8h950&oid=00D2o000000iu9F&dpt=null&viewId=';
            case 5000:
                return 'https://mindful-shark-l8by6a-dev-ed.trailblaze.file.force.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Png&versionId=0682o00000vmqQf&operationContext=DELIVERY&contentId=05T2o00002FXNut&page=0&d=/a/2o000000r2bt/eS8asT52w2DxgptFqgoPmlP6rIm0prFIL70ePmjvFAE&oid=00D2o000000iu9F&dpt=null&viewId=';
            case 5101:
                return 'https://mindful-shark-l8by6a-dev-ed.trailblaze.file.force.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Png&versionId=0682o00000vmqQi&operationContext=DELIVERY&contentId=05T2o00002FXNv8&page=0&d=/a/2o000000r2c7/RFacILu2L3mOqteWW8ltq3HhWxaxtw1Nq.0Jg_Fpgys&oid=00D2o000000iu9F&dpt=null&viewId=';
            case 5115:
                return 'https://mindful-shark-l8by6a-dev-ed.trailblaze.file.force.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Png&versionId=0682o00000vmqQj&operationContext=DELIVERY&contentId=05T2o00002FXNvI&page=0&d=/a/2o000000r2c8/.jj_ywZFuSTecSmDZ_IRgXkXjCLQRfME6K0bSsUXMoE&oid=00D2o000000iu9F&dpt=null&viewId=';
            case 5116:
                return 'https://mindful-shark-l8by6a-dev-ed.trailblaze.file.force.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Png&versionId=0682o00000vmqQq&operationContext=DELIVERY&contentId=05T2o00002FXNvS&page=0&d=/a/2o000000r2cB/cih7t6tomrIp9on5kWKDW5ZoFpgxqMeC1NUnM5DjUd0&oid=00D2o000000iu9F&dpt=null&viewId=';
            case 5117:
                return 'https://mindful-shark-l8by6a-dev-ed.trailblaze.file.force.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Png&versionId=0682o00000vmqQu&operationContext=DELIVERY&contentId=05T2o00002FXNvX&page=0&d=/a/2o000000r2cC/ql_MYKPBe2c0QWg.ltK2fizt_MIygBbvDNP_4ULAjoQ&oid=00D2o000000iu9F&dpt=null&viewId=';
            case 5122:
                return 'https://mindful-shark-l8by6a-dev-ed.trailblaze.file.force.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Png&versionId=0682o00000vmqQr&operationContext=DELIVERY&contentId=05T2o00002FXNvc&page=0&d=/a/2o000000r2bu/DmeDTo1YBAinVX.DOfHIKAfaM.vmYvtujx4BulWsQIc&oid=00D2o000000iu9F&dpt=null&viewId=';
            case 5102:
                return 'https://mindful-shark-l8by6a-dev-ed.trailblaze.file.force.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Png&versionId=0682o00000vmqQk&operationContext=DELIVERY&contentId=05T2o00002FXNvD&page=0&d=/a/2o000000r2bR/L1sLqULal_djpL2SVJBr3q7DbXuxygwO2GpYtPo5w2M&oid=00D2o000000iu9F&dpt=null&viewId=';
            case 5103:
                return 'https://mindful-shark-l8by6a-dev-ed.trailblaze.file.force.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Png&versionId=0682o00000vmqSn&operationContext=DELIVERY&contentId=05T2o00002FXO2J&page=0&d=/a/2o000000r2cG/g4I5C0H3U2QRSD85JeEMBJVEJ4yswcR5_2VL6sn2M70&oid=00D2o000000iu9F&dpt=null&viewId=';
            case 5104:
                return 'https://mindful-shark-l8by6a-dev-ed.trailblaze.file.force.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Png&versionId=0682o00000vmqSs&operationContext=DELIVERY&contentId=05T2o00002FXO2O&page=0&d=/a/2o000000r2cL/_zJ6Ws0B.d10g8cfGggwDgJ1J7Q7mfvarjNf7rRgM6I&oid=00D2o000000iu9F&dpt=null&viewId=';
            case 5105:
                return 'https://mindful-shark-l8by6a-dev-ed.trailblaze.file.force.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Png&versionId=0682o00000vmqSt&operationContext=DELIVERY&contentId=05T2o00002FXO2T&page=0&d=/a/2o000000r2cQ/txxt.j8oKK9gFSnqTvykMuQsb4s_d5Y6t8lYovwT6B8&oid=00D2o000000iu9F&dpt=null&viewId=';
            case 5106:
                return 'https://mindful-shark-l8by6a-dev-ed.trailblaze.file.force.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Png&versionId=0682o00000vmqSo&operationContext=DELIVERY&contentId=05T2o00002FXO2Y&page=0&d=/a/2o000000r2cV/0rtq_azqtJfYqurPGEpe3tHu2mukk_RVcco6R5SGGjc&oid=00D2o000000iu9F&dpt=null&viewId=';
            case 5107:
                return 'https://mindful-shark-l8by6a-dev-ed.trailblaze.file.force.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Png&versionId=0682o00000vmqQs&operationContext=DELIVERY&contentId=05T2o00002FXO2d&page=0&d=/a/2o000000r2cW/6r0IZf5XJVnVOumxtGt4Q8N9_sDD0maZO7EZCeUfa54&oid=00D2o000000iu9F&dpt=null&viewId=';
            case 5119:
                return 'https://mindful-shark-l8by6a-dev-ed.trailblaze.file.force.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Png&versionId=0682o00000vmqSp&operationContext=DELIVERY&contentId=05T2o00002FXO2i&page=0&d=/a/2o000000r2ca/pGhOn0KLuwWMaYiqYDL3dGZTLuw2ULWr2z.e2ev1wms&oid=00D2o000000iu9F&dpt=null&viewId=';
            case 5120:
                return 'https://mindful-shark-l8by6a-dev-ed.trailblaze.file.force.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Png&versionId=0682o00000vmqSq&operationContext=DELIVERY&contentId=05T2o00002FXO2n&page=0&d=/a/2o000000r2cX/_G_Zr5N_35RkK5gvFrl5lkGST6ghtaM8QZz5PElSBto&oid=00D2o000000iu9F&dpt=null&viewId=';
            case 5121:
                return 'https://mindful-shark-l8by6a-dev-ed.trailblaze.file.force.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Png&versionId=0682o00000vmqSr&operationContext=DELIVERY&contentId=05T2o00002FXO2s&page=0&d=/a/2o000000r2cR/28o1YVTukJnB1DT.YYc.IpU2CkYzZJf7RtMolgXVVMw&oid=00D2o000000iu9F&dpt=null&viewId=';
            case 5110:
                return 'https://mindful-shark-l8by6a-dev-ed.trailblaze.file.force.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Png&versionId=0682o00000vmqbb&operationContext=DELIVERY&contentId=05T2o00002FXOSv&page=0&d=/a/2o000000r2cS/pJYndT5SkUG6G49skPg_2iSr.cO6XMPPELbl5kVlO2o&oid=00D2o000000iu9F&dpt=null&viewId=';
            case 5108:
                return 'https://mindful-shark-l8by6a-dev-ed.trailblaze.file.force.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Png&versionId=0682o00000vmqbW&operationContext=DELIVERY&contentId=05T2o00002FXOSq&page=0&d=/a/2o000000r2cf/XsyVbHwB3LicY7xWF7Oew5Xib3VdDX6rUvugSre1IZM&oid=00D2o000000iu9F&dpt=null&viewId=';
            case 5114:
                return 'https://mindful-shark-l8by6a-dev-ed.trailblaze.file.force.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Png&versionId=0682o00000vmqbd&operationContext=DELIVERY&contentId=05T2o00002FXOT5&page=0&d=/a/2o000000r2ck/JzaD9c2.Z02XhKYBu2oWYuqg288ngC3_htvy7f_dE0U&oid=00D2o000000iu9F&dpt=null&viewId=';
            case 5112:
                return 'https://mindful-shark-l8by6a-dev-ed.trailblaze.file.force.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Png&versionId=0682o00000vmqbc&operationContext=DELIVERY&contentId=05T2o00002FXOT0&page=0&d=/a/2o000000r2cp/DFoYLgd8GWP.bdN0uq6e0aAf28iObsutY7Smfs2WCCU&oid=00D2o000000iu9F&dpt=null&viewId=';
            case 6000:
                return 'https://mindful-shark-l8by6a-dev-ed.trailblaze.file.force.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Png&versionId=0682o00000vmqbX&operationContext=DELIVERY&contentId=05T2o00002FXOTo&page=0&d=/a/2o000000r2cu/xPUUuQSLKsflJkQNKyTekn7kLR6zWo_vSL7uHt61dRI&oid=00D2o000000iu9F&dpt=null&viewId=';
            case 6200:
                return 'https://mindful-shark-l8by6a-dev-ed.trailblaze.file.force.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Png&versionId=0682o00000vmqbx&operationContext=DELIVERY&contentId=05T2o00002FXOU8&page=0&d=/a/2o000000r2cb/N95hB1Qe5XU3QQZVkgRYR2TXSBYtZWVy.zrD1MFxCyo&oid=00D2o000000iu9F&dpt=null&viewId=';
            case 6001:
                return 'https://mindful-shark-l8by6a-dev-ed.trailblaze.file.force.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Png&versionId=0682o00000vmqbv&operationContext=DELIVERY&contentId=05T2o00002FXOTt&page=0&d=/a/2o000000r2cH/7IePhHqQ4Dg4nKYKAGtKhmAztbwvqeiNIeRvJ1Nm12U&oid=00D2o000000iu9F&dpt=null&viewId=';
            case 6201:
                return 'https://mindful-shark-l8by6a-dev-ed.trailblaze.file.force.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Png&versionId=0682o00000vmqc5&operationContext=DELIVERY&contentId=05T2o00002FXOUD&page=0&d=/a/2o000000r2cc/OZp3QtSovZXuKTP3sGxb3Mj0zA95VtB9y.XUmHULJYw&oid=00D2o000000iu9F&dpt=null&viewId=';
            case 6003:
                return 'https://mindful-shark-l8by6a-dev-ed.trailblaze.file.force.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Png&versionId=0682o00000vmqbw&operationContext=DELIVERY&contentId=05T2o00002FXOTy&page=0&d=/a/2o000000r2cg/xcfdsxBo.AEQ9U4rUDEyK_WlxE36kF6HeyH52c7tAHY&oid=00D2o000000iu9F&dpt=null&viewId=';
            case 6002:
                return 'https://mindful-shark-l8by6a-dev-ed.trailblaze.file.force.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Png&versionId=0682o00000vmqbY&operationContext=DELIVERY&contentId=05T2o00002FXOQx&page=0&d=/a/2o000000r2cl/5YP8HGSd8s5xxQABk90e2mhxDOHvwEhcBEUHVVxKfSM&oid=00D2o000000iu9F&dpt=null&viewId=';
            case 6004:
                return 'https://mindful-shark-l8by6a-dev-ed.trailblaze.file.force.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Png&versionId=0682o00000vmqc0&operationContext=DELIVERY&contentId=05T2o00002FXOU3&page=0&d=/a/2o000000r2cz/gzMcQ6UGrxTGHrn8ppt9pF0qSDhG.ttJLxMSGh0zgNk&oid=00D2o000000iu9F&dpt=null&viewId=';
            case 6204:
                return 'https://mindful-shark-l8by6a-dev-ed.trailblaze.file.force.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Png&versionId=0682o00000vmqby&operationContext=DELIVERY&contentId=05T2o00002FXOUI&page=0&d=/a/2o000000r2cm/aXzBWYIs6d88xkebCr7v4lo1PqKRIS57DYMUSAYx24E&oid=00D2o000000iu9F&dpt=null&viewId=';
            case 6206:
                return 'https://mindful-shark-l8by6a-dev-ed.trailblaze.file.force.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Png&versionId=0682o00000vmqce&operationContext=DELIVERY&contentId=05T2o00002FXOWi&page=0&d=/a/2o000000r2cd/nUrMbIYe5_.pw0IFmQKHx1ReXPppyiVGtfF9wPsj_gg&oid=00D2o000000iu9F&dpt=null&viewId=';
            case 6205:
                return 'https://mindful-shark-l8by6a-dev-ed.trailblaze.file.force.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Png&versionId=0682o00000vmqcd&operationContext=DELIVERY&contentId=05T2o00002FXOVl&page=0&d=/a/2o000000r2cq/Cu8MTRwU6WCSCzJLmudUnTiGEnZhjCoj8dGWZl7Q46w&oid=00D2o000000iu9F&dpt=null&viewId=';
            case 6203:
                return 'https://mindful-shark-l8by6a-dev-ed.trailblaze.file.force.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Png&versionId=0682o00000vmqcc&operationContext=DELIVERY&contentId=05T2o00002FXOWd&page=0&d=/a/2o000000r2ce/37UPmLsGr2AIVW7hKmTGcgGswW37txDuUmOXLVZTa4Q&oid=00D2o000000iu9F&dpt=null&viewId=';
            case 6209:
                return 'https://mindful-shark-l8by6a-dev-ed.trailblaze.file.force.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Png&versionId=0682o00000vmqcf&operationContext=DELIVERY&contentId=05T2o00002FXOWn&page=0&d=/a/2o000000r2d0/HtUpqO1HmpFl5x2DTjjA0YTmeePpmEBV0S.lSinTEZY&oid=00D2o000000iu9F&dpt=null&viewId=';
            case 6213:
                return 'https://mindful-shark-l8by6a-dev-ed.trailblaze.file.force.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Png&versionId=0682o00000vmqch&operationContext=DELIVERY&contentId=05T2o00002FXOWx&page=0&d=/a/2o000000r2d1/joYKwySLlhNHveY5JnMo8PgPi0x9JhqCsAaWcSmTvaw&oid=00D2o000000iu9F&dpt=null&viewId=';
            case 6214:
                return 'https://mindful-shark-l8by6a-dev-ed.trailblaze.file.force.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Png&versionId=0682o00000vmqci&operationContext=DELIVERY&contentId=05T2o00002FXOX2&page=0&d=/a/2o000000r2ch/ivzS8D3P7AeF4iYgzQlxolXQ5kmbE9YVzDpm7c5TiBg&oid=00D2o000000iu9F&dpt=null&viewId=';
            case 6215:
                return 'https://mindful-shark-l8by6a-dev-ed.trailblaze.file.force.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Png&versionId=0682o00000vmqcj&operationContext=DELIVERY&contentId=05T2o00002FXOX7&page=0&d=/a/2o000000r2cr/yJ36N43P0qn_nT8qX0UMscAF.KizZY4EIzmDW_PhVfs&oid=00D2o000000iu9F&dpt=null&viewId=';
            case 6212:
                return 'https://mindful-shark-l8by6a-dev-ed.trailblaze.file.force.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Png&versionId=0682o00000vmqcg&operationContext=DELIVERY&contentId=05T2o00002FXOWs&page=0&d=/a/2o000000r2cs/3J6ZMHcmxXPMNQxWdLMAO40bj9oOAvuK6OmQhsoiUF8&oid=00D2o000000iu9F&dpt=null&viewId=';
            case 6220:
                return 'https://mindful-shark-l8by6a-dev-ed.trailblaze.file.force.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Png&versionId=0682o00000vmqck&operationContext=DELIVERY&contentId=05T2o00002FXOXC&page=0&d=/a/2o000000r2cI/STdDmIeaQl7ueMjtFjJmFU844.2IETdS40nss4RnXFw&oid=00D2o000000iu9F&dpt=null&viewId=';
            case 6222:
                return 'https://mindful-shark-l8by6a-dev-ed.trailblaze.file.force.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Png&versionId=0682o00000vmqcm&operationContext=DELIVERY&contentId=05T2o00002FXOXH&page=0&d=/a/2o000000r2d4/LxcJEA.cvwFkl0yJrjUZ4XDDYCGPVIzoeZQG7XyqyfY&oid=00D2o000000iu9F&dpt=null&viewId=';
            case 6207:
                return 'https://mindful-shark-l8by6a-dev-ed.trailblaze.file.force.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Png&versionId=0682o00000vmqco&operationContext=DELIVERY&contentId=05T2o00002FXOY5&page=0&d=/a/2o000000r2ct/6LC6iDZmsx0gL2wuxYhD5RcZqvUQQ_OGP4RC1uWF.D8&oid=00D2o000000iu9F&dpt=null&viewId=';
            case 6202:
                return 'https://mindful-shark-l8by6a-dev-ed.trailblaze.file.force.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Png&versionId=0682o00000vmqcn&operationContext=DELIVERY&contentId=05T2o00002FXOY0&page=0&d=/a/2o000000r2d9/cs8I_ifttByVHa2ffY1uoi1Aj6Kt2H77xnbWdRTH1Bs&oid=00D2o000000iu9F&dpt=null&viewId=';
            case 6208:
                return 'https://mindful-shark-l8by6a-dev-ed.trailblaze.file.force.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Png&versionId=0682o00000vmqbZ&operationContext=DELIVERY&contentId=05T2o00002FXOYA&page=0&d=/a/2o000000r2dA/ET4cQWLAGGfvavEqn5tNdCDgQYAuGGKP_V7Jnw9h35Y&oid=00D2o000000iu9F&dpt=null&viewId=';
            case 7102:
                return 'https://mindful-shark-l8by6a-dev-ed.trailblaze.file.force.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Png&versionId=0682o00000vmqdW&operationContext=DELIVERY&contentId=05T2o00002FXOa6&page=0&d=/a/2o000000r2dB/jd80niuHrtHIJM25MBXPwhM6c8bFnkFQq1a_62bbMho&oid=00D2o000000iu9F&dpt=null&viewId=';
            case 7000:
                return 'https://mindful-shark-l8by6a-dev-ed.trailblaze.file.force.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Png&versionId=0682o00000vmqdR&operationContext=DELIVERY&contentId=05T2o00002FXOa1&page=0&d=/a/2o000000r2cJ/drcNX3OMhWQ8_Wb35b9.Zeob.ezeLjlaCp9d9fQEhPQ&oid=00D2o000000iu9F&dpt=null&viewId=';
            case 7101:
                return 'https://mindful-shark-l8by6a-dev-ed.trailblaze.file.force.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Png&versionId=0682o00000vmqdS&operationContext=DELIVERY&contentId=05T2o00002FXORo&page=0&d=/a/2o000000r2dC/vsqdeGx1rPwvcz3.x5.d8u9dOH2S.0NWQJ8d3bzy7bU&oid=00D2o000000iu9F&dpt=null&viewId=';
            case 7110:
                return 'https://mindful-shark-l8by6a-dev-ed.trailblaze.file.force.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Png&versionId=0682o00000vmqdT&operationContext=DELIVERY&contentId=05T2o00002FXOaQ&page=0&d=/a/2o000000r2cK/8CPcfYuGbxpW0aqBWjVpUNbLj8HLil8CIUr2GTUfya0&oid=00D2o000000iu9F&dpt=null&viewId=';
            case 7111:
                return 'https://mindful-shark-l8by6a-dev-ed.trailblaze.file.force.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Png&versionId=0682o00000vmqdU&operationContext=DELIVERY&contentId=05T2o00002FXOaV&page=0&d=/a/2o000000r2dE/kLgPBXMCXIyzHAc5NaRtFqJYxfOQcOWarvEnUTbmzgY&oid=00D2o000000iu9F&dpt=null&viewId=';
            case 7112:
                return 'https://mindful-shark-l8by6a-dev-ed.trailblaze.file.force.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Png&versionId=0682o00000vmqdV&operationContext=DELIVERY&contentId=05T2o00002FXOaa&page=0&d=/a/2o000000r2dF/RNaeN.jLUFnkzIMRyqSlVIFSZKdOA57tocAMaU_H1oU&oid=00D2o000000iu9F&dpt=null&viewId=';
            case 7108:
                return 'https://mindful-shark-l8by6a-dev-ed.trailblaze.file.force.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Png&versionId=0682o00000vmqba&operationContext=DELIVERY&contentId=05T2o00002FXOaG&page=0&d=/a/2o000000r2dD/pitStr1CXUgT5oi6mHRvNPVQCthQ_NigBxaztBBtvbg&oid=00D2o000000iu9F&dpt=null&viewId=';
            case 7107:
                return 'https://mindful-shark-l8by6a-dev-ed.trailblaze.file.force.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Png&versionId=0682o00000vmqcp&operationContext=DELIVERY&contentId=05T2o00002FXOaB&page=0&d=/a/2o000000r2d5/IeCAgcwq0CpFypZcbIqOO_0Y5R5x6RFEw2yK.dAQOXA&oid=00D2o000000iu9F&dpt=null&viewId=';
            case 7109:
                return 'https://mindful-shark-l8by6a-dev-ed.trailblaze.file.force.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Png&versionId=0682o00000vmqcq&operationContext=DELIVERY&contentId=05T2o00002FXOaL&page=0&d=/a/2o000000r2d6/m3Aw440FnMCL8sTuBLFj8lUk.pnuL657Ou3gQDSpHgk&oid=00D2o000000iu9F&dpt=null&viewId=';
            case 7113:
                return 'https://mindful-shark-l8by6a-dev-ed.trailblaze.file.force.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Png&versionId=0682o00000vmqdb&operationContext=DELIVERY&contentId=05T2o00002FXOaf&page=0&d=/a/2o000000r2dJ/a142vki5IsGfVUzviEBYOIwGPVvp4jOYnL19_27cKmc&oid=00D2o000000iu9F&dpt=null&viewId=';
            case 7114:
                return 'https://mindful-shark-l8by6a-dev-ed.trailblaze.file.force.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Png&versionId=0682o00000vmqe3&operationContext=DELIVERY&contentId=05T2o00002FXOcq&page=0&d=/a/2o000000r2dG/bfyHLyRkmsFSeqM10xZSPZjD6SWb9UWUbKyrmH7Cuks&oid=00D2o000000iu9F&dpt=null&viewId=';
            case 7116:
                return 'https://mindful-shark-l8by6a-dev-ed.trailblaze.file.force.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Png&versionId=0682o00000vmqe4&operationContext=DELIVERY&contentId=05T2o00002FXOcv&page=0&d=/a/2o000000r2d2/7quTBNibj4tUSh2mPqOc35oYYpEltT66z7VVwYIyl0Q&oid=00D2o000000iu9F&dpt=null&viewId=';
            case 7105:
                return 'https://mindful-shark-l8by6a-dev-ed.trailblaze.file.force.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Png&versionId=0682o00000vmqe1&operationContext=DELIVERY&contentId=05T2o00002FXOcg&page=0&d=/a/2o000000r2dO/5dppP1EZbosM5S2LtM8ud85ZmBG09qOBRnIrDdzTLq4&oid=00D2o000000iu9F&dpt=null&viewId=';
            case 7115:
                return 'https://mindful-shark-l8by6a-dev-ed.trailblaze.file.force.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Png&versionId=0682o00000vmqe5&operationContext=DELIVERY&contentId=05T2o00002FXOdF&page=0&d=/a/2o000000r2dP/P_J0JhDZGSz5vkKzvb09_bSlN8CYbj9jKr2JKNC4NLM&oid=00D2o000000iu9F&dpt=null&viewId=';
            case 7117:
                return 'https://mindful-shark-l8by6a-dev-ed.trailblaze.file.force.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Png&versionId=0682o00000vmqe5&operationContext=DELIVERY&contentId=05T2o00002FXOdF&page=0&d=/a/2o000000r2dP/P_J0JhDZGSz5vkKzvb09_bSlN8CYbj9jKr2JKNC4NLM&oid=00D2o000000iu9F&dpt=null&viewId=';
            case 7106:
                return 'https://mindful-shark-l8by6a-dev-ed.trailblaze.file.force.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Png&versionId=0682o00000vmqe5&operationContext=DELIVERY&contentId=05T2o00002FXOdF&page=0&d=/a/2o000000r2dP/P_J0JhDZGSz5vkKzvb09_bSlN8CYbj9jKr2JKNC4NLM&oid=00D2o000000iu9F&dpt=null&viewId=';
            case 7103:
                return 'https://mindful-shark-l8by6a-dev-ed.trailblaze.file.force.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Png&versionId=0682o00000vmqe5&operationContext=DELIVERY&contentId=05T2o00002FXOdF&page=0&d=/a/2o000000r2dP/P_J0JhDZGSz5vkKzvb09_bSlN8CYbj9jKr2JKNC4NLM&oid=00D2o000000iu9F&dpt=null&viewId=';
            case 8000:
                return 'https://mindful-shark-l8by6a-dev-ed.trailblaze.file.force.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Png&versionId=0682o00000vmqcl&operationContext=DELIVERY&contentId=05T2o00002FXOdj&page=0&d=/a/2o000000r2d3/.hTNhrsGtIHZxyA9z6TexPInQBOhgs7KaxXm1.nzD7E&oid=00D2o000000iu9F&dpt=null&viewId=';
            case 8001:
                return 'https://mindful-shark-l8by6a-dev-ed.trailblaze.file.force.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Png&versionId=0682o00000vmqe6&operationContext=DELIVERY&contentId=05T2o00002FXOdo&page=0&d=/a/2o000000r2dT/6zcwTWlDxiWaOQJRtb7czWu6d.CuJpg1w2JI9GYGOCk&oid=00D2o000000iu9F&dpt=null&viewId=';
            case 8003:
                return 'https://mindful-shark-l8by6a-dev-ed.trailblaze.file.force.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Png&versionId=0682o00000vmqe8&operationContext=DELIVERY&contentId=05T2o00002FXOdy&page=0&d=/a/2o000000r2dU/4EUXUTJ5XJDQcQg2.m6kLsFcY9L2bR5cAOilBid6xSA&oid=00D2o000000iu9F&dpt=null&viewId=';
            case 8002:
                return 'https://mindful-shark-l8by6a-dev-ed.trailblaze.file.force.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Png&versionId=0682o00000vmqe7&operationContext=DELIVERY&contentId=05T2o00002FXOdt&page=0&d=/a/2o000000r2dV/zdqEsdDj89lZLiZCYqR2lf8uwSlDIQlbde0oLyhs55E&oid=00D2o000000iu9F&dpt=null&viewId=';
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