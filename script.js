const websites = [
    { name: "ecom-dev", url: "https://devapi.ecomsuite.io/api/v1/join-beta" },
    { name: "ecom-test", url: "https://testapi.ecomsuite.io/api/v1/join-beta" },
    { name: "ecom-prod", url: "https://api.ecomsuite.io/api/v1/join-beta" },
    { name: "will-wallet-dev", url: "http://54.252.194.80:3007/api/v1/test" },
    { name: "will-wallet-test", url: "https://test.admin.willwallet.com.au/api/v1/test" },
    { name: "will-wallet-prod", url: "http://3.24.154.7:3007/api/v1/test" }
];

async function checkStatus(url) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 10-second timeout

    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId); // Stop timeout if response is received
        return response.ok ? "online" : "offline";
    } catch (error) {
        return "offline";
    }
}

async function updateStatuses() {
    const table = document.getElementById("status-table");
    table.innerHTML = ""; // Clear old data

    const fragment = document.createDocumentFragment();

    const results = await Promise.all(
        websites.map(async (site) => {
            const status = await checkStatus(site.url);
            return { ...site, status };
        })
    );

    results.forEach((site) => {
        const row = document.createElement("tr");
        row.classList.add(site.status === "online" ? "online-row" : "offline-row");
        row.innerHTML = `
            <td>${site.name}</td>
            <td class="${site.status}">
                <span class="status-dot ${site.status}-dot"></span>
                ${site.status === 'online' ? 'Online ✅' : 'Offline ❌'}
            </td>
        `;

        // Make row clickable
        row.style.cursor = "pointer";
        row.addEventListener("click", () => {
            window.location.href = `details.html?name=${encodeURIComponent(site.name)}&url=${encodeURIComponent(site.url)}`;
        });

        fragment.appendChild(row);
    });

    table.appendChild(fragment);
}

updateStatuses(); // Run on page load
