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
      pesan = `🔔 **DING... DING... DING...** 🔔

━━━━━━━━━━━━━━━━━━━━━━━
📢 **BELL DINAS TELAH BERBUNYI**
**[NMRP] NUSANTARA METROPOLITAN ROLEPLAY**
━━━━━━━━━━━━━━━━━━━━━━━

*Ding... Ding... Ding...*

**Perhatian kepada seluruh personel.**

> Bel dinas telah dibunyikan. Seluruh personel diharapkan segera menghentikan aktivitas yang tidak berkaitan dengan dinas dan bersiap menerima instruksi dari pimpinan.

> Harap tetap menjaga disiplin, ketertiban, dan etika selama pelaksanaan kegiatan.

━━━━━━━━━━━━━━━━━━━━━━━
🇮🇩 **DISIPLIN • LOYALITAS • KEHORMATAN**
**[NMRP] NUSANTARA METROPOLITAN ROLEPLAY**
━━━━━━━━━━━━━━━━━━━━━━━

🔔 **DING... DING... DING...** 🔔

@everyone @here`;
      break;

    case "istirahat":
      pesan = `🍽️ **BELL ISTIRAHAT SIANG** 🍽️

━━━━━━━━━━━━━━━━━━━━━━━
📢 **WAKTU ISTIRAHAT SIANG**
**[NMRP] NUSANTARA METROPOLITAN ROLEPLAY**
━━━━━━━━━━━━━━━━━━━━━━━

Seluruh personel dipersilakan melaksanakan istirahat siang.

Harap kembali tepat waktu sesuai jadwal.

━━━━━━━━━━━━━━━━━━━━━━━
🇮🇩 **DISIPLIN • LOYALITAS • KEHORMATAN**
**[NMRP] NUSANTARA METROPOLITAN ROLEPLAY**
━━━━━━━━━━━━━━━━━━━━━━━

🍽️ **SELAMAT BERISTIRAHAT** 🍽️

@everyone @here`;
      break;

    case "masuk":
      pesan = `🔔 **BELL MASUK DINAS** 🔔

━━━━━━━━━━━━━━━━━━━━━━━
📢 **WAKTU ISTIRAHAT TELAH BERAKHIR**
**[NMRP] NUSANTARA METROPOLITAN ROLEPLAY**
━━━━━━━━━━━━━━━━━━━━━━━

Seluruh personel segera kembali melaksanakan tugas masing-masing.

Tetap jaga disiplin dan profesionalisme.

━━━━━━━━━━━━━━━━━━━━━━━
🇮🇩 **DISIPLIN • LOYALITAS • KEHORMATAN**
**[NMRP] NUSANTARA METROPOLITAN ROLEPLAY**
━━━━━━━━━━━━━━━━━━━━━━━

🔔 **SELAMAT BERTUGAS** 🔔

@everyone @here`;
      break;

    case "selesai":
      pesan = `🌙 **BELL SELESAI DINAS** 🌙

━━━━━━━━━━━━━━━━━━━━━━━
📢 **DINAS HARI INI TELAH BERAKHIR**
**[NMRP] NUSANTARA METROPOLITAN ROLEPLAY**
━━━━━━━━━━━━━━━━━━━━━━━

Terima kasih atas dedikasi seluruh personel.

Silakan melaksanakan istirahat dan bersiap untuk dinas berikutnya.

━━━━━━━━━━━━━━━━━━━━━━━
🇮🇩 **DISIPLIN • LOYALITAS • KEHORMATAN**
**[NMRP] NUSANTARA METROPOLITAN ROLEPLAY**
━━━━━━━━━━━━━━━━━━━━━━━

🌙 **SELAMAT BERISTIRAHAT** 🌙

@everyone @here`;
      break;
  }

  channel.send(pesan);
}

client.once("clientReady", () => {
  console.log(`Bot aktif: ${client.user.tag}`);

  cron.schedule("0 7 * * *", () => {
    const channel = client.channels.cache.get(CHANNEL_ID);
    if (channel) sendBell(channel, "dinas");
  }, { timezone: "Asia/Jakarta" });

  cron.schedule("0 12 * * *", () => {
    const channel = client.channels.cache.get(CHANNEL_ID);
    if (channel) sendBell(channel, "istirahat");
  }, { timezone: "Asia/Jakarta" });

  cron.schedule("0 13 * * *", () => {
    const channel = client.channels.cache.get(CHANNEL_ID);
    if (channel) sendBell(channel, "masuk");
  }, { timezone: "Asia/Jakarta" });

  cron.schedule("0 22 * * *", () => {
    const channel = client.channels.cache.get(CHANNEL_ID);
    if (channel) sendBell(channel, "selesai");
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
