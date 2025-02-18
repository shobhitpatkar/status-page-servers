const SHEET_API_URL = "https://script.google.com/macros/s/AKfycbzXamZuGOwVeG_L80cPjG0kdkGIh12tP0YFGYTncAHUg8ASOluyE8A20_zt9P_U3kroPg/exec"

async function fetchData() {
    try {
        let response = await fetch(SHEET_API_URL);
        let data = await response.json();
        console.log(data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

fetchData();
