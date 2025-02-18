const SHEET_API_URL = "https://script.google.com/macros/s/AKfycbzXamZuGOwVeG_L80cPjG0kdkGIh12tP0YFGYTncAHUg8ASOluyE8A20_zt9P_U3kroPg/exec"

async function sendStatusData() {  
    const status_data = {
      timestamp: "2025-02-14 15:29:14",
      date: "18 Feb",
      hour: 9,
      server_id: "will-wallet-test",
      server_url: "http://13.211.41.148:3007/api/v1/test",
      status: "offline"
    };
  
    try {
      let response = await fetch(SHEET_API_URL, {
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
  