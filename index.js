const express = require("express");
const app = express();
app.use(express.json());

const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1500500021676736696/y_3UP3tuSt6YtH4vt8RS4MFF7Zu5zoNHSnZCeVyIY2XeWg8P64cGGLb2x2CqDUdBhgOm";

app.post("/webhook", async (req, res) => {
  try {
    await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body)
    });
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Proxy running");
});
