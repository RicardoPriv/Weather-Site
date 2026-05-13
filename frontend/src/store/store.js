export const STATE_OPTIONS = {
    LOADING: "loading",
    SUCCESS: "success",
    ERROR: "error"
};

let weatherData = null;
let address = "";
let location = "";
let state = null;
let listeners = [];
let selectedDay = 0;

function notify() {
    listeners.forEach(listener => listener());
}

export const store = {
    setLocation(loc) { location = loc; },
    setWeatherData(data) { weatherData = data; address = data.resolvedAddress; },
    setState(newState) { 
        if (Object.values(STATE_OPTIONS).includes(newState)) {
            state = newState;
            notify();
        } else {
            throw new Error("Invalid state");
        }
    },
    setSelectedDay(day) { selectedDay = day; },

    subscribe(listener) { listeners.push(listener); },

    getLocation() { return location; },
    getWeatherData() { return weatherData; },
    getState() { return state; },
    getSelectedDay() { return weatherData.days[selectedDay]; },
    getAddress() { return address; }
}