export default async function handler(req, res) {
  const api_key = process.env.EXCHANGE_RATE_API_KEY;
  const { base, target } = req.query;
  const url = `https://v6.exchangerate-api.com/v6/${api_key}/pair/${base}/${target}`;
  const response = await fetch(url);
  const data = await response.json();
  res.status(200).json(data);
}