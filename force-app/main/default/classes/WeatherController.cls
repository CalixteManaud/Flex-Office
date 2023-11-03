public with sharing class WeatherController {
    private String latitude;
    private String longitude;
    private Date selectedDate;
    private Api_Waether__mdt apiweather;

    public WeatherController(String lat, String lon, Date dt) {
        latitude = lat;
        longitude = lon;
        selectedDate = dt;

        // Récupérer les valeurs de l'objet de type Custom Metadata
        apiweather = [SELECT URL__c, Token__c, Units__c, Langue__c
            FROM Api_Waether__mdt
            WHERE DeveloperName = 'Weather'];
    }

    @AuraEnabled(cacheable=true)
    public String getWeatherByLocation() {
        // Utilisez les variables membres pour obtenir les valeurs nécessaires
        String apikey = apiweather.Token__c;
        String endpoint = apiweather.URL__c;
        String units = apiweather.Units__c;
        String language = apiweather.Langue__c;

        // Convertir la date en format UNIX timestamp (secondes depuis le 1er janvier 1970)
        Long unixTimestamp = Datetime.newInstance(selectedDate, Time.newInstance(0, 0, 0, 0)).getTime() / 1000;

        // Créer l'URL pour l'appel à l'API en utilisant les coordonnées, la date, la langue
        String apiUrl = endpoint + '?lat=' + latitude + '&lon=' + longitude + '&dt=' + unixTimestamp + '&exclude=minutely&units=' + units + '&lang=' + language + '&appid=' + apikey;

        // Appel à l'API
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint(apiUrl);
        request.setMethod('GET');
        HttpResponse response = http.send(request);

        if (response.getStatusCode() == 200){
            System.debug('Response: ' + response.getBody());
            return response.getBody();
        }
        else
            throw new System.CalloutException('Erreur lors de l\'appel à l\'API');
    }
}
