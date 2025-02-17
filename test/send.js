const API_URL = "https://script.google.com/macros/s/AKfycbxeCf8mkh2aPZ0C9CljPhSi6DtqQNO2fRQdmxrGy0HKDdIp6GRAZMcv_nvQCfKPcqoGAQ/exec";

async function sendStatusData() {  
    const status_data = {
      timestamp: "2025-02-14 15:29:14",
      date: "17 Feb",
      hour: 6,
      server_id: "will-wallet-test",
      server_url: "http://13.211.41.148:3007/api/v1/test",
      status: "online"
    };
  
    try {
      let response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(status_data)
      });
  
      let result = await response.json();
      console.log(result.success ? "✅ Data added successfully!" : "❌ Error:", result.message);
    } catch (error) {
      console.error("❌ API call failed:", error);
    }
  }
  
  // Call this function to send data
  sendStatusData();
  