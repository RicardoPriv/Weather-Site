import "../styles/components/loadingSpin.css";
import { store, STATE_OPTIONS } from "../store/store";

export function createLoadingSpin() {
    const container = document.createElement("div");

    container.innerHTML = `
        <div id="loading-spin-container">
            <div class="animate-spin" id="spinner"></div>
            <div id="loading-text">Loading Weather Data...</div>
        </div>
    `;

    container.classList.add("hidden");

    store.subscribe(() => {
        const isLoading = store.getState() === STATE_OPTIONS.LOADING;
        container.classList.toggle("hidden", !isLoading);
    });

    return container;
}