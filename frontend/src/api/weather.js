const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const API_URL = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";

export async function fetchWeatherData(input) {
    const encodedInput = encodeURIComponent(input);
    const url = `${API_URL}${encodedInput}?unitGroup=metric&key=${API_KEY}`;

    const response = await fetch(url);
    if (!response.ok) { throw new Error("Failed Fetch Weather"); }

    return await response.json();
}
