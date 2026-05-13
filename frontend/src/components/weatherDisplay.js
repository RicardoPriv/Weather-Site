import "../styles/components/weatherDisplay.css";
import { store, STATE_OPTIONS } from "../store/store";
import { weatherTodayHtml, weatherForecastHtml } from "./templates/weatherHtml";

const UNIT_MEASUREMENT_OPTIONS = {
    CELSIUS: "°C",
    FAHRENHEIT: "°F"
};

const OUTPUT_TYPE_OPTIONS = {
    TODAY: "today",
    SEVEN_DAY: "7day"
};

let unitMeasurement = UNIT_MEASUREMENT_OPTIONS.CELSIUS;
let outputType = OUTPUT_TYPE_OPTIONS.TODAY;

let containerRef = null;

export function createWeatherDisplay() {
    const container = document.createElement("div");
    containerRef = container;

    store.subscribe(() => {

        const isLoaded = store.getState() === STATE_OPTIONS.SUCCESS;
        container.classList.toggle("hidden", !isLoaded);

        if (!isLoaded) return;
 
        const selectedDay = store.getSelectedDay();
        const allDays = store.getWeatherData()?.days;

        console.log("[weatherDisplay] outputType=", outputType, "TODAY=", OUTPUT_TYPE_OPTIONS.TODAY);
        console.log("[weatherDisplay] selectedDay=", selectedDay);
        console.log("[weatherDisplay] weatherData.days=", allDays);

        if (outputType === OUTPUT_TYPE_OPTIONS.TODAY) {
            weatherTodayHtml(container, selectedDay, store.getAddress(), unitMeasurement);
        } else {
            weatherForecastHtml(container, store.getWeatherData(), store.getAddress(), unitMeasurement);
        }

        setupToggles(container);
    });

    return container;
}

function setupMeasurementToggle(container) {
    const measurementButton = container.querySelector("#measurement");
    const newButton = measurementButton.cloneNode(true);
    measurementButton.replaceWith(newButton);

    newButton.addEventListener("click", () => {

        unitMeasurement = unitMeasurement === UNIT_MEASUREMENT_OPTIONS.CELSIUS
                            ? UNIT_MEASUREMENT_OPTIONS.FAHRENHEIT
                            : UNIT_MEASUREMENT_OPTIONS.CELSIUS;

        rerenderWeather();
    });
}

function setupFormatToggle(container) {
    const formatButton = container.querySelector("#output-type");
    const newButton = formatButton.cloneNode(true);
    formatButton.replaceWith(newButton);

    newButton.addEventListener("click", () => {
        outputType = outputType === OUTPUT_TYPE_OPTIONS.TODAY
                        ? OUTPUT_TYPE_OPTIONS.SEVEN_DAY
                        : OUTPUT_TYPE_OPTIONS.TODAY;
                        
        rerenderWeather();
    });
}

function setupToggles(container) {
    setupMeasurementToggle(container);
    setupFormatToggle(container);
}

function rerenderWeather() {
    if (!containerRef) return;

    const data = store.getSelectedDay();

    if (outputType === OUTPUT_TYPE_OPTIONS.TODAY) { weatherTodayHtml(containerRef, data, store.getAddress(), unitMeasurement); }
    else { weatherForecastHtml(containerRef, store.getWeatherData(), store.getAddress(), unitMeasurement); }
    
    setupToggles(containerRef);
}
