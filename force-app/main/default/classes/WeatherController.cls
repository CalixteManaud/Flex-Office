public with sharing class WeatherController {
    
    @AuraEnabled(cacheable=true)
    public static Map<String, Object> getWeatherByLocation(String location) {
        // Récupérer les valeurs de l'objet de type Custom Metadata
        Api_Weather_V2__mdt apiweather = [SELECT URL__c, token__c, units__c, timesteps__c
            FROM Api_Weather_V2__mdt
            WHERE DeveloperName = 'Weather'];

        // Utilisez les valeurs de Custom Metadata
        String apikey = apiweather.token__c;
        String endpoint = apiweather.URL__c;
        String units = apiweather.units__c;
        String timesteps = apiweather.timesteps__c;

        // Créer l'URL pour l'appel à l'API en utilisant les coordonnées, la date, la langue
        String apiUrl = endpoint + '?location=' + location + '&timesteps=' + timesteps + '&units=' + units + '&apikey=' + apikey;

        // Appel à l'API
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint(apiUrl);
        request.setMethod('GET');
        HttpResponse response = http.send(request);

        if (response.getStatusCode() == 200) {
            Map<String, Object> weatherDataMap = new Map<String, Object>();
            weatherDataMap.put('body', response.getBody());
            weatherDataMap.put('status', 'success');
            return weatherDataMap;
        } else {
            Map<String, Object> errorMap = new Map<String, Object>();
            errorMap.put('status', 'error');
            errorMap.put('message', 'Error: ' + response.getStatusCode() + ' ' + response.getStatus());
            return errorMap;
        }
    }
}
