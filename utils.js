// google sheet as a database used, update it after deployment of app script
const SHEET_API_URL = "https://script.google.com/macros/s/AKfycbzXamZuGOwVeG_L80cPjG0kdkGIh12tP0YFGYTncAHUg8ASOluyE8A20_zt9P_U3kroPg/exec"


// This function compare the current data with fetch data. 
// Fetched data is a collection of datas.
function find_same(status_data, collection_data) {
    return collection_data.some(item => 
        item.date === status_data.date &&
        item.hour === status_data.hour &&
        item.server_id === status_data.server_id
    );
}

// This function takes an url and check wherther service is online or offline
async function checkStatus(url) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000); // 3-second timeout

    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId); // Stop timeout if response is received
        return response.ok ? "online" : "offline";
    } catch (error) {
        return "offline";
    }
}

// Function that check the url and returns proper server id
function getServerId(url) {
    const urlMapping = {
        "http://54.252.194.80:3007/api/v1/test": "will-wallet-dev",
        "https://test.admin.willwallet.com.au/api/v1/test": "will-wallet-test",
        "http://3.24.154.7:3007/api/v1/test": "will-wallet-prod",
        "https://devapi.ecomsuite.io/api/v1/join-beta": "ecom-dev",
        "https://testapi.ecomsuite.io/api/v1/join-beta": "ecom-test",
        "https://api.ecomsuite.io/api/v1/join-beta": "ecom-prod"
    };

    return urlMapping[url] || "unknown"; // Default to "unknown" if URL doesn't match
}


// a function to send data to sheet database, it returns the send data
async function sendData(data) {
    try {
        let response = await fetch(SHEET_API_URL, {
            redirect: "follow",
            method: "POST", 
            headers: {
                'Content-Type': "text/plain;charset=utf-8",
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        let result = await response.json();
        console.log("✅ Data sent successfully:",data);
        return result;
    } catch (error) {
        console.error("❌ Error sending data:", error);
    }
}


// Get formatted response of server status. We call both the above functions like - checkStatus(url) and getServerId(url) and make the formatted response 
// here we create a doucment and give it as a response, which represnet the current data.
async function getJsonResponse(url) {
    const status = await checkStatus(url); // Wait for status
    const now = new Date();

    // Get hour in 12-hour format
    let hour = now.getHours();
    hour = hour.toString(); // Convert to string

    // Get formatted date (e.g., "14 Feb")
    const day = now.getDate();
    const month = now.toLocaleString('en-US', { month: 'short' }); // Get short month name
    const date = `${day} ${month}`;

    // Get full timestamp (YYYY-MM-DD HH:mm:ss)
    const year = now.getFullYear();
    const monthNum = String(now.getMonth() + 1).padStart(2, '0'); // Ensure 2-digit format
    const dayNum = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0'); // 24-hour format
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const timestamp = `${year}-${monthNum}-${dayNum} ${hours}:${minutes}:${seconds}`;

    // Get server_id
    const server_id = getServerId(url);

    // Create the data object
    const data = {
        status,
        hour,
        date,
        timestamp,
        server_id,
        server_url: url
    };

    // console.log(`debug - following data will be send to ${server_id}`);

    // Pass data to sendData before returning it
    const sent_data = await sendData(data);

    // following is debug console
    console.log(sent_data);
    return data;
}


// function to fetch the data on the basis of particular server id 

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


// Attach to window so `details.js` can use it
window.getJsonResponse = getJsonResponse;