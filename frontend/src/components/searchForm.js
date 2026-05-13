import "../styles/components/searchForm.css"
import { fetchWeatherData } from "../api/weather";
import { store, STATE_OPTIONS } from "../store/store";

export function createSearchForm() {
    const container = document.createElement("div");

    container.innerHTML = `
        <div id="search-container">
            <div id="text-container">
                <label id="title">Weather App</label>
                <label id="subtitle">Get current weather for any location</label>
            </div>
            <form id="search-form">
                <input type="text" id="input" placeholder="Enter city name..." />
                <button type="submit" id="submit-button">Get Weather</button>
            </form>
        </div>
    `;

    const form = container.querySelector("#search-form");
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const input = container.querySelector("#input").value;
        await handleSearch(input, event);
    });

    return container;
}

async function handleSearch(input, event) {
    store.setState(STATE_OPTIONS.LOADING);

    try {
        const data = await fetchWeatherData(input);

        store.setWeatherData(data);
        store.setLocation(input);
        store.setState(STATE_OPTIONS.SUCCESS);
    } catch (error) {
        store.setState(STATE_OPTIONS.ERROR);
    }
}