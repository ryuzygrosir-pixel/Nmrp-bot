const { Client, GatewayIntentBits } = require("discord.js");
const cron = require("node-cron");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const CHANNEL_ID = "1520436922080821418";

function sendBell(channel, type) {
  let pesan = "";

  switch (type) {
    case "dinas":
      pesan = `@everyone

🔔 **DING... DING... DING...** 🔔

━━━━━━━━━━━━━━━━━━━━━━━
📢 **BELL DINAS TELAH BERBUNYI**
**[NMRP] NUSANTARA METROPOLITAN ROLEPLAY**
━━━━━━━━━━━━━━━━━━━━━━━

*Ding... Ding... Ding...*

**Perhatian kepada seluruh personel.**

> Bel dinas telah dibunyikan. Seluruh personel diharapkan segera menghentikan aktivitas yang tidak berkaitan dengan dinas dan bersiap menerima instruksi dari pimpinan.

> Harap tetap menjaga disiplin, ketertiban, dan etika selama pelaksanaan kegiatan.

━━━━━━━━━━━━━━━━━━━━━━━
🇮🇩 DISIPLIN • LOYALITAS • KEHORMATAN
**[NMRP] NUSANTARA METROPOLITAN ROLEPLAY**
━━━━━━━━━━━━━━━━━━━━━━━

🔔 **DING... DING... DING...** 🔔`;
      break;

    case "istirahat":
      pesan = `@everyone

🍽️ **BELL ISTIRAHAT SIANG** 🍽️

━━━━━━━━━━━━━━━━━━━━━━━
Seluruh personel dipersilakan melaksanakan istirahat siang.

Harap kembali tepat waktu sesuai jadwal.

━━━━━━━━━━━━━━━━━━━━━━━
🇮🇩 **[NMRP] NUSANTARA METROPOLITAN ROLEPLAY**`;
      break;

    case "masuk":
      pesan = `@everyone

🔔 **BELL MASUK DINAS** 🔔

━━━━━━━━━━━━━━━━━━━━━━━
Waktu istirahat telah berakhir.

Seluruh personel segera kembali melaksanakan tugas masing-masing.

━━━━━━━━━━━━━━━━━━━━━━━
🇮🇩 **[NMRP] NUSANTARA METROPOLITAN ROLEPLAY**`;
      break;

    case "selesai":
      pesan = `@everyone

🌙 **BELL SELESAI DINAS** 🌙

━━━━━━━━━━━━━━━━━━━━━━━
Jam dinas telah berakhir.

Terima kasih atas dedikasi seluruh personel hari ini.

Selamat beristirahat.

━━━━━━━━━━━━━━━━━━━━━━━
🇮🇩 **[NMRP] NUSANTARA METROPOLITAN ROLEPLAY**`;
      break;
  }

  channel.send(pesan);
}

client.once("clientReady", () => {
  console.log(`Bot aktif: ${client.user.tag}`);

  cron.schedule("0 7 * * *", () => {
    const ch = client.channels.cache.get(CHANNEL_ID);
    if (ch) sendBell(ch, "dinas");
  }, { timezone: "Asia/Jakarta" });

  cron.schedule("0 12 * * *", () => {
    const ch = client.channels.cache.get(CHANNEL_ID);
    if (ch) sendBell(ch, "istirahat");
  }, { timezone: "Asia/Jakarta" });

  cron.schedule("0 13 * * *", () => {
    const ch = client.channels.cache.get(CHANNEL_ID);
    if (ch) sendBell(ch, "masuk");
  }, { timezone: "Asia/Jakarta" });

  cron.schedule("0 22 * * *", () => {
    const ch = client.channels.cache.get(CHANNEL_ID);
    if (ch) sendBell(ch, "selesai");
  }, { timezone: "Asia/Jakarta" });
});

client.on("messageCreate", (message) => {
  if (message.author.bot) return;

  if (message.content === "/bell")
    return sendBell(message.channel, "dinas");

  if (message.content === "/istirahat")
    return sendBell(message.channel, "istirahat");

  if (message.content === "/masuk")
    return sendBell(message.channel, "masuk");

  if (message.content === "/selesai")
    return sendBell(message.channel, "selesai");
});

client.login(process.env.TOKEN);
