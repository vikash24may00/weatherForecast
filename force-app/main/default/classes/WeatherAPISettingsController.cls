/**
 * @description       : 
 * @author            : VIKASH MUNDARI
 * @group             : 
 * @last modified on  : 06-20-2024
 * @last modified by  : VIKASH MUNDARI
**/
public with sharing class WeatherAPISettingsController {
    @AuraEnabled(cacheable=true)
    public static String getWeatherAPIKey() {
        Weather_API_Settings__c settings = [SELECT API__c FROM Weather_API_Settings__c WHERE Name = 'API KEY'];
        return settings.API__c;
    }
}