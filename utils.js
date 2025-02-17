function find_same(status_data, collection_data) {
    return collection_data.some(item => 
        item.date === status_data.date &&
        item.hour === status_data.hour &&
        item.server_id === status_data.server_id
    );
}


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
        "http://13.211.41.148:3007/api/v1/test": "will-wallet-test",
        "http://3.24.154.7:3007/api/v1/test": "will-wallet-prod"
    };

    return urlMapping[url] || "unknown"; // Default to "unknown" if URL doesn't match
}

// update the data


// Get formatted response of server status
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
    return {
        status,
        hour,
        date,
        timestamp,
        server_id,
        server_url: url
    };
}

// Attach to window so `details.js` can use it
window.getJsonResponse = getJsonResponse;