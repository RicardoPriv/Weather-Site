export function weatherTodayHtml(container, data, address, unitMeasurement) {
    container.innerHTML = `
        <div id="weather-container">
            <div id="header">
                <div id="location">
                    <p id="location-name">${address}</p>
                    <p id="weather-description">${data.conditions}</p>
                </div>

                <div id="options">
                    <button id="measurement">${unitMeasurement}</button>
                    <button id="output-type">Today</button>
                </div>
            </div>

            <div id="temperature">
                <h1>
                    ${calcTemp(unitMeasurement, data.temp)}${unitMeasurement}
                </h1>
                <h3>
                    Feels like: ${calcTemp(unitMeasurement, data.feelslike)}${unitMeasurement}
                </h3>
            </div>

            <hr>

            <div id="footer">
                <div id="wind">
                    <p>Wind:</p>
                    <p>${data.windspeed} km/h</p>
                </div>

                <div id="humidity">
                    <p>Humidity:</p>
                    <p>${data.humidity}%</p>
                </div>

                <div id="pressure">
                    <p>Pressure:</p>
                    <p>${data.pressure} hPa</p>
                </div>
            </div>
        </div>
    `;
}

export function weatherForecastHtml(
    container,
    data,
    address,
    unitMeasurement,
) {

    const forecastCards = data.days.slice(0, 7).map(day => {
        const weekday = new Date(day.datetime).toLocaleDateString("en-US", { weekday: "long" });

        return `
            <div class="forecast-day">
                <p class="day-name">${weekday}</p>
                <p class="day-date">${day.datetime}</p>
                <p class="day-temp">${calcTemp(unitMeasurement, day.temp)}${unitMeasurement}</p>
                <p class="day-conditions">${day.conditions}</p>
            </div>
        `;
    }).join("");

    container.innerHTML = `
        <div id="weather-container">
            <div id="header">
                <div id="heading">7-Day Forecast for ${address}</div>
                <div id="options">
                    <button id="measurement">${unitMeasurement}</button>
                    <button id="output-type">Week Forecast</button>
                </div>
            </div>
            <div id="forecast">${forecastCards}</div>
        </div>
    `;
}

function calcTemp(unitMeasurement, temp) {
    if (unitMeasurement === "°F") {
        return ((temp - 32) * 5 / 9).toFixed(1);
    } else { return temp; }
}
