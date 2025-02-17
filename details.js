const collection_data = [
    {
        timestamp: '2025-02-14 15:29:14',
        date: '17 Feb',
        hour: 6,
        server_id: 'will-wallet-test',
        server_url: 'http://13.211.41.148:3007/api/v1/test',
        status: 'online'
    },
    {
        timestamp: '2025-02-14 14:29:14',
        date: '17 Feb',
        hour: 7,
        server_id: 'will-wallet-test',
        server_url: 'http://13.211.41.148:3007/api/v1/test',
        status: 'online'
    },
    {
        timestamp: '2025-02-14 13:29:14',
        date: '17 Feb',
        hour: 6,
        server_id: 'will-wallet-dev',
        server_url: 'http://54.252.194.80:3007/api/v1/test',
        status: 'online'
    },
    {
        timestamp: '2025-02-14 13:29:14',
        date: '17 Feb',
        hour: 7,
        server_id: 'will-wallet-dev',
        server_url: 'http://54.252.194.80:3007/api/v1/test',
        status: 'offline'
    }
];

function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        name: params.get("name"),
        url: params.get("url")
    };
}

async function displayDetails() {
    const { name, url } = getQueryParams();
    const table = document.getElementById("details-table");
    
    const currnet_data = await getJsonResponse(url);

    console.log(currnet_data);


    if (!name || !url) {
        table.innerHTML = "<tr><td>No server details available.</td></tr>";
        return;
    }

    let html = `
        <tr><td><strong>Server Name:</strong> ${name}</td></tr>
        <tr><td><strong>URL:</strong> <a href="${url}" target="_blank">${url}</a></td></tr>
    `;

    const now = new Date();
    let currentHour = now.getHours();

    // Generate last 24 hours in descending order
    for (let i = 0; i < 24; i++) {
        let hour = (currentHour - i + 24) % 24;
        let date = new Date(now);
        if (hour > currentHour) {
            date.setDate(now.getDate() - 1);
        }

        let formattedDate = date.toISOString().split("T")[0]; // YYYY-MM-DD format
        let displayDate = date.toLocaleDateString("en-GB", { day: "2-digit", month: "short" }); // "14 Feb"
        
        // Find a matching record
        let matchedData = collection_data.find(item =>
            item.server_id === name && item.date === displayDate && item.hour === hour
        );

        // Determine row color based on status
        let rowStyle = "";
        if (matchedData) {
            rowStyle = matchedData.status === "online" ? 'style="background-color: #d4edda;"' :
                       matchedData.status === "offline" ? 'style="background-color: #f8d7da;"' : "";
        }

        html += `<tr ${rowStyle}><td><strong>${displayDate} - ${hour}:00</strong></td></tr>`;
    }

    table.innerHTML = html;
}

function goBack() {
    window.history.back();
}



// Example Usage:
const status_data = {
    timestamp: '2025-02-14 15:29:14',
    date: '17 Feb',
    hour: 6,
    server_id: 'will-wallet-test',
    server_url: 'http://13.211.41.148:3007/api/v1/test',
    status: 'online'
    };



console.log(find_same(status_data, collection_data)); // Output: true


displayDetails();
console.log("You are watching the comparison of data");
find_same(status_data, collection_data)

