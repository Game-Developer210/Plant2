// .netlify/functions/identifyPlant.js

const axios = require("axios");

exports.handler = async function (event, context) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    const body = JSON.parse(event.body);
    const { images, organs = ["leaf"], details = ["common_names", "url", "name_authority"] } = body;

    // ✅ سجل البيانات المستقبلة للتصحيح
    const apiKey = process.env.REACT_APP_API_KEY;
    console.log("🔑 API Key:", apiKey ? "Present" : "Missing");
    console.log("📷 Number of images received:", images?.length);
    console.log("🧬 Organs:", organs);
    console.log("🔍 Details:", details);

    if (!images || images.length === 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "No image provided" }),
      };
    }

    const response = await axios.post(
      "https://api.plant.id/v2/identify",
      {
        images,
        organs,
        details,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Api-Key": apiKey,
        },
      }
    );

    // ✅ تسجيل البيانات الراجعة من API
    console.log("🌿 API response received:", response.data);

    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
console.error("❌ API error:", error.message);
console.error("🛠 Full error:", error.response?.data || error.stack);

return {
  statusCode: 500,
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    error: error.message,
    details: error.response?.data || "Unknown error",
  }),
};

  }
};
