// import { LightningElement, track } from 'lwc';

// export default class WeatherAppLWC extends LightningElement {
//     @track cityName = '';
//     @track weatherData;
//     @track error;

//     handleCityChange(event) {
//         this.cityName = event.target.value;
//     }

//     getWeather() {
//         const apiKey = '29b0508ebaca4daaa0a70621241906';
//         const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${this.cityName}&aqi=yes`;

//         fetch(url)
//             .then(response => {
//                 if (response.ok) {
//                     return response.json();
//                 } else {
//                     throw new Error('Error fetching weather data. Please try again.');
//                 }
//             })
//             .then(data => {
//                 this.weatherData = data;
//                 this.error = null;
//                 console.log('Weather Data:', this.weatherData); // Log the weather data received
//             })
//             .catch(error => {
//                 this.weatherData = null;
//                 this.error = 'An error occurred while fetching weather data. Please check the city name and try again.';
//                 //console.error('Error fetching weather data:', error); // Log any errors
//             });
//     }
// }


import { LightningElement, track } from 'lwc';
import getWeatherAPIKey from '@salesforce/apex/WeatherAPISettingsController.getWeatherAPIKey';

export default class WeatherAppLWC extends LightningElement {
    @track cityName = '';
    @track weatherData;
    @track error;
    apiKey;

    connectedCallback() {
        this.fetchAPIKey();
    }

    fetchAPIKey() {
        getWeatherAPIKey()
            .then(result => {
                this.apiKey = result;
            })
            .catch(error => {
                this.error = 'An error occurred while fetching the API key.';
                console.error('Error fetching API key:', error);
            });
    }

    handleCityChange(event) {
        this.cityName = event.target.value;
    }

    getWeather() {
        if (!this.apiKey) {
            this.error = 'API key is not available.';
            return;
        }

        const url = `https://api.weatherapi.com/v1/current.json?key=${this.apiKey}&q=${this.cityName}&aqi=yes`;

        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Error fetching weather data. Please try again.');
                }
            })
            .then(data => {
                this.weatherData = data;
                this.error = null;
                console.log('Weather Data:', this.weatherData); // Log the weather data received
            })
            .catch(error => {
                this.weatherData = null;
                this.error = 'An error occurred while fetching weather data. Please check the city name and try again.';
                console.error('Error fetching weather data:', error); // Log any errors
            });
    }
}
