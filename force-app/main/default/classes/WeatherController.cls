public with sharing class WeatherController {

    @AuraEnabled(cacheable=true)
    public static String getWeatherByLocation(String latitude, String longitude){
        String apikey = '6991659b348c24332e21726b46583634';
        String endpoint = 'https://api.openweathermap.org/data/2.5/weather';
        String units = 'metric';

        // Créer l'url pour l'appel à l'API en utilisant les coordonnées
        String apiUrl = endpoint + '?lat=' + latitude + '&lon=' + longitude + '&units=' + units + '&appid=' + apikey;

        // Appel à l'API
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint(apiUrl);
        request.setMethod('GET');

        HttpResponse response = http.send(request);

        if (response.getStatusCode() == 200)
            return response.getBody();
        else
            throw new System.CalloutException('Erreur lors de l\'appel à l\'API');
    }

}