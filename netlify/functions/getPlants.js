// netlify/functions/getPlants.js
const fetch = require('node-fetch');

exports.handler = async function (event, context) {
  try {
    const res = await fetch("https://trefle.io/api/v1/plants?token=4sFVLc2wtQXu8CKFn_NycI0fE6YetBR9rBNGdD-sA6M&page_size=20");
    const data = await res.json();

    return {
      statusCode: 200,
      body: JSON.stringify({ data: data.data }) // إرسال فقط مصفوفة النباتات
    };
  } catch (err) {
    console.error("❌ Failed to fetch plants from Trefle:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch plants" })
    };
  }
};
