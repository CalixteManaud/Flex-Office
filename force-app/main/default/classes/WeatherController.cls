public with sharing class WeatherController {
    // Méthode pour récupérer la météo par coordonnées
    @AuraEnabled(cacheable=true)
    public static String getWeatherByLocation(String location) {
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
            System.debug('Response: ' + response.getBody());
            return response.getBody();
        } else {
            throw new System.CalloutException('Erreur lors de l\'appel à l\'API');
        }
    }
}
