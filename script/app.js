let tempAverage;
let tempLow;
let tempHigh;
let windAverage;
let windLow;
let windHigh;

let openSettings = function () {
    let settingsButton = document.querySelector('.c-settings__button');
    settingsButton.addEventListener('click', function () {
        console.log('Opens settings');
        document.querySelector('.c-settings').className = document.querySelector('.c-settings').className.replace('c-settings__nodisplay', 'c-settings__display');
    });
};

let checkChanges = function () {
    let saveButton = document.querySelector('.c-settings__save-button');
    saveButton.addEventListener('click', function () {
        console.log('Test click')
        if (document.getElementById('colormode1').checked == true) {
            console.log('Lightmode');
            document.body.className = document.body.className.replace('dark', 'light');
        }
        else {
            console.log('Darkmode');
            document.body.className = document.body.className.replace('light', 'dark');
        }

        if (document.getElementById('tempunit1').checked == true) {
            console.log('Celsius Degrees');

            document.querySelector('.c-temperature__value').innerHTML = tempAverage;

            document.querySelector('.c-temperature__unit').innerHTML = '°C';

            document.querySelector('.c-progressTemp__min').innerHTML = tempLow;
            document.querySelector('.c-progressTemp__max').innerHTML = tempHigh;

            let tempDiff = tempLow - tempHigh;
            let tempPerc = parseInt((tempAverage / tempDiff) * 100);
            console.log(tempPerc);
            document.getElementById('tempProgress').style.width = `${tempPerc}%`;
            ShowStatusTemp(tempPerc);
        }
        else {
            console.log('Fahrenheit Degrees');

            let toFahrenheit = (tempAverage * 9 / 5) + 32;
            document.querySelector('.c-temperature__value').innerHTML = Math.round(toFahrenheit);

            document.querySelector('.c-temperature__unit').innerHTML = '°F';

            let tempChangeMin = -150;
            let tempChangeMax = 0;
            document.querySelector('.c-progressTemp__min').innerHTML = tempChangeMin;
            document.querySelector('.c-progressTemp__max').innerHTML = tempChangeMax;

            let tempFahrenheitDiff = tempChangeMax - tempChangeMin;
            let tempFahrenheitPerc = 100 - Math.abs(parseInt((toFahrenheit / tempFahrenheitDiff) * 100));
            console.log(tempFahrenheitPerc);

            document.getElementById('tempProgress').style.width = `${tempFahrenheitPerc}%`;
            ShowStatusTemp(tempFahrenheitPerc);
        }

        if (document.getElementById('windunit1').checked == true) {
            console.log('Kilometres per hour');

            document.querySelector('.c-wind__value').innerHTML = windAverage;

            document.querySelector('.c-wind__unit').innerHTML = 'KM/H';

            document.querySelector('.c-progressWind__min').innerHTML = windLow;
            document.querySelector('.c-progressWind__max').innerHTML = windHigh;

            let windDiff = windLow - windHigh;
            let windPerc = parseInt((windAverage / windDiff) * 100);
            console.log(Math.abs(windPerc));
            document.getElementById('windProgress').style.width = `${windPerc}%`;
            ShowStatusWind(windPerc);
        }
        else {
            console.log('Miles per hour');

            let toMiles = windAverage / 1.609;
            document.querySelector('.c-wind__value').innerHTML = Math.round(toMiles);

            document.querySelector('.c-wind__unit').innerHTML = 'MPH';

            let windChangeMin = 0;
            let windChangeMax = 50;
            document.querySelector('.c-progressWind__min').innerHTML = windChangeMin;
            document.querySelector('.c-progressWind__max').innerHTML = windChangeMax;

            let windMilesDiff = windChangeMax - windChangeMin;
            let windMilesPerc = parseInt((toMiles / windMilesDiff) * 100);
            console.log(windMilesPerc);
            document.getElementById('windProgress').style.width = `${windMilesPerc}%`;
            ShowStatusWind(windMilesPerc);
        }

        console.log('Closing settings');
        document.querySelector('.c-settings').className = document.querySelector('.c-settings').className.replace('c-settings__display', 'c-settings__nodisplay');
    });
};

let ShowStatusTemp = function (percentage) {
    if (0 <= percentage && percentage < 20) {
        let statusText = "So cold, i'm freezing!";
        console.log(statusText);
        document.querySelector('.c-temperature__description').innerHTML = statusText;
    }

    if (20 <= percentage && percentage < 40) {
        let statusText = "It's getting a little bit cold in here.";
        console.log(statusText);
        document.querySelector('.c-temperature__description').innerHTML = statusText;
    }

    if (40 <= percentage && percentage < 60) {
        let statusText = "For being on Mars, it's not that cold.";
        console.log(statusText);
        document.querySelector('.c-temperature__description').innerHTML = statusText;
    }

    if (60 <= percentage && percentage < 80) {
        let statusText = "It's getting a little hot in here.";
        console.log(statusText);
        document.querySelector('.c-temperature__description').innerHTML = statusText;
    }

    if (80 <= percentage) {
        let statusText = "Flaming hot, you should stay on earth.";
        console.log(statusText);
        document.querySelector('.c-temperature__description').innerHTML = statusText;
    }
}

let ShowStatusWind = function (percentage) {
    if (0 <= percentage && percentage < 20) {
        let statusText = "It's a calm day on Mars.";
        console.log(statusText);
        document.querySelector('.c-wind__description').innerHTML = statusText;
    }

    if (20 <= percentage && percentage < 40) {
        let statusText = "A little bit of wind today.";
        console.log(statusText);
        document.querySelector('.c-wind__description').innerHTML = statusText;
    }

    if (40 <= percentage && percentage < 60) {
        let statusText = "You can clearly feel a breeze today.";
        console.log(statusText);
        document.querySelector('.c-wind__description').innerHTML = statusText;
    }

    if (60 <= percentage && percentage < 80) {
        let statusText = "There is a lot of wind!";
        console.log(statusText);
        document.querySelector('.c-wind__description').innerHTML = statusText;
    }

    if (80 <= percentage) {
        let statusText = "It's storming on Mars!";
        console.log(statusText);
        document.querySelector('.c-wind__description').innerHTML = statusText;
    }
}

let showMarsApi = function (jsonObject) {
    // console.log(jsonObject);

    // Last sol select
    let sols = jsonObject.sol_keys;
    let lastSol = sols[sols.length - 1];

    // Temperature part
    tempAverage = parseInt(((jsonObject[lastSol].AT.av) - 32) * 5 / 9);
    tempLow = -110;
    tempHigh = -20;
    let tempDiff = tempLow - tempHigh;
    let tempPerc = parseInt((tempAverage / tempDiff) * 100);

    console.log('Average Temperature on Mars');
    console.log(tempAverage);
    console.log(tempPerc);

    document.querySelector('.c-temperature__value').innerHTML = tempAverage;
    document.getElementById('tempProgress').style.width = `${tempPerc}%`;
    ShowStatusTemp(tempPerc);


    // Wind part
    windAverage = parseInt(jsonObject[lastSol].HWS.av) * 3.6;
    windLow = 0;
    windHigh = 80;
    let windDiff = windLow - windHigh;
    let windPerc = Math.abs(parseInt((windAverage / windDiff) * 100));

    console.log('Average Wind on Mars');
    console.log(windAverage);
    console.log(windPerc);

    document.querySelector('.c-wind__value').innerHTML = windAverage;
    document.getElementById('windProgress').style.width = `${windPerc}%`;
    console.log(windPerc);
    ShowStatusWind(windPerc);
};


let fetchMarsApi = function () {
    // Nasa API Key - Personal key
    const apiKey = 'SXRLCayFEZ3qxtxabCfPIQ5MaikDeIGxAGDHAP5B';
    let apiUrl = `https://api.nasa.gov/insight_weather/?api_key=${apiKey}&feedtype=json&ver=1.0`;

    console.log(apiUrl);

    // Nasa Mars API fetch
    fetch(apiUrl)
        .then(function (response) {
            // console.log(response);
            return response.json();
        })
        .then(function (json) {
            showMarsApi(json);
            // console.log(JSON.stringify(json));
        })
};

document.addEventListener('DOMContentLoaded', function () {
    fetchMarsApi()
    openSettings()
    checkChanges()
});