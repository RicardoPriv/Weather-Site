import "./styles/main.css"
import { createSearchForm } from "./components/searchForm";
import { createLoadingSpin } from "./components/loadingSpin";
import { createWeatherDisplay } from "./components/weatherDisplay";
import { createErrorMessage } from "./components/errorMessage";

const app = document.getElementById("app");
app.appendChild(createSearchForm());
app.appendChild(createLoadingSpin());
app.appendChild(createWeatherDisplay());
app.appendChild(createErrorMessage());
