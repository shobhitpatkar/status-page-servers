function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        name: params.get("name"),
        url: params.get("url")
    };
}

function displayDetails() {
    const { name, url } = getQueryParams();
    const table = document.getElementById("details-table");

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
        let hour = (currentHour - i + 24) % 24; // Ensure hour wraps correctly
        let date = new Date(now); // Copy current date
        if (hour > currentHour) {
            date.setDate(now.getDate() - 1); // Adjust for yesterday
        }
        
        let formattedDate = date.toISOString().split("T")[0]; // Get YYYY-MM-DD format

        html += `<tr><td><strong>${formattedDate} - ${hour}:00</strong></td></tr>`;
    }

    table.innerHTML = html;
}

function goBack() {
    window.history.back();
}

displayDetails();
