import "../styles/components/errorMessage.css";
import { store, STATE_OPTIONS } from "../store/store";

export function createErrorMessage() {
    const container = document.createElement("div");

    container.innerHTML = `
        <div id="error-container" class="hidden">
            <div id="error-title">Error: Country Could Not Be Found</div>
            <div id="error-subtitle">Please Try Again</div>
        </div>
    `;

    const errorPanel = container.querySelector("#error-container");

    store.subscribe(() => {
        const isError = store.getState() === STATE_OPTIONS.ERROR;
        errorPanel.classList.toggle("hidden", !isError);
    });

    return container;
}
