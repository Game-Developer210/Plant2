// netlify/functions/getPlants.js
exports.handler = async function(event, context) {
  const res = await fetch("https://trefle.io/api/v1/plants?token=4sFVLc2wtQXu8CKFn_NycI0fE6YetBR9rBNGdD-sA6M&page_size=20");
  const data = await res.json();
  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };
};
