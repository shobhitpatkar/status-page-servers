const SHEET_API_URL = "https://script.google.com/macros/s/AKfycbzXamZuGOwVeG_L80cPjG0kdkGIh12tP0YFGYTncAHUg8ASOluyE8A20_zt9P_U3kroPg/exec"

async function sendData(data) {
    try {
        let response = await fetch(SHEET_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        let result = await response.json();
        console.log(result.message);  // Logs success or error message from the backend
    } catch (error) {
        console.error("Error sending data:", error);
    }
}

// Example usage of sendData function
const status_data = {
    timestamp: '2025-02-14 15:29:14',
    date: '18 Feb',
    hour: 10,
    server_id: 'will-wallet-dev',
    server_url: 'http://13.211.41.148:3007/api/v1/test',
    status: 'online'
};

sendData(status_data);
