const SHEET_API_URL = "https://script.google.com/macros/s/AKfycbzXamZuGOwVeG_L80cPjG0kdkGIh12tP0YFGYTncAHUg8ASOluyE8A20_zt9P_U3kroPg/exec"

async function fetchDataByServerId(serverId) {
    try {
        let response = await fetch(`${SHEET_API_URL}?server_id=${encodeURIComponent(serverId)}`);
        let data = await response.json();

        if (data.success) {
            console.log("Filtered Data:", data.data);
            return data.data;
        } else {
            console.error("Error:", data.error);
            return [];
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
}

// Example Usage
fetchDataByServerId("will-wallet-dev"); 
