const express = require('express');
const app = express();
app.use(express.json());

const KEYS = {
  "SAAD-12345": "2025-12-31",
  "TEST-ONE": "2025-10-01"
};

app.get('/check', (req, res) => {
  const key = req.query.key || req.body.key;
  if (!key || !KEYS[key]) return res.json({ valid: false, reason: "invalid" });

  const now = Date.now();
  const exp = new Date(KEYS[key]).getTime();
  if (now > exp) return res.json({ valid: false, reason: "expired", expiry: KEYS[key] });

  return res.json({ valid: true, expiry: KEYS[key] });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on ${port}`));
