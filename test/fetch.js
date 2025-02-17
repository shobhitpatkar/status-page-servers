const SHEET_API_URL = "https://script.google.com/macros/s/AKfycbxeCf8mkh2aPZ0C9CljPhSi6DtqQNO2fRQdmxrGy0HKDdIp6GRAZMcv_nvQCfKPcqoGAQ/exec";

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
