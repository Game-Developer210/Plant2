const fetch = require('node-fetch');

exports.handler = async function (event, context) {
  const token = process.env.REACT_APP_TREFLE_API_KEY;

  console.log("🌱 Loaded token:", token); // هذا السطر جديد لمراقبة التوكن

  try {
    const res = await fetch(`https://trefle.io/api/v1/plants?token=${token}&page_size=20`);
    const data = await res.json();

    return {
      statusCode: 200,
      body: JSON.stringify({ data: data.data }) // فقط مصفوفة النباتات
    };
  } catch (err) {
    console.error("❌ Failed to fetch plants from Trefle:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch plants" })
    };
  }
};
