const express = require("express");
const app = express();
app.use(express.json());

const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

app.post("/webhook", async (req, res) => {
  if (!DISCORD_WEBHOOK_URL) {
    console.error("DISCORD_WEBHOOK_URL environment variable is not set!");
    return res.sendStatus(500);
  }

  try {
    const response = await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("Discord rejected the webhook:", response.status, errorBody);
      return res.status(502).send("Discord error: " + response.status);
    }

    console.log("Webhook forwarded successfully");
    res.sendStatus(200);
  } catch (err) {
    console.error("Fetch failed:", err);
    res.sendStatus(500);
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Proxy running, webhook URL configured:", !!DISCORD_WEBHOOK_URL);
});
