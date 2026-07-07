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
      pesan = `🔔 DING... DING... DING... 🔔

━━━━━━━━━━━━━━━━━━━━━━━
📢 BELL DINAS TELAH BERBUNYI
[NMRP] NUSANTARA METROPOLITAN ROLEPLAY
━━━━━━━━━━━━━━━━━━━━━━━

*Ding... Ding... Ding...*

**Perhatian kepada seluruh personel.**

> Bel dinas telah dibunyikan. Seluruh personel diharapkan segera menghentikan aktivitas yang tidak berkaitan dengan dinas dan bersiap menerima instruksi dari pimpinan.

> Harap tetap menjaga disiplin, ketertiban, dan etika selama pelaksanaan kegiatan.

━━━━━━━━━━━━━━━━━━━━━━━
🇮🇩 DISIPLIN • LOYALITAS • KEHORMATAN
[NMRP] NUSANTARA METROPOLITAN ROLEPLAY
━━━━━━━━━━━━━━━━━━━━━━━

🔔 DING... DING... DING... 🔔

<@&1521750857581072474>`;
      break;

    case "istirahat":
      pesan = `🍽️ DING... DING... DING... 🍽️

━━━━━━━━━━━━━━━━━━━━━━━
📢 BELL ISTIRAHAT SIANG
[NMRP] NUSANTARA METROPOLITAN ROLEPLAY
━━━━━━━━━━━━━━━━━━━━━━━

*Ding... Ding... Ding...*

**Perhatian kepada seluruh personel.**

> Waktu istirahat siang telah tiba. Seluruh personel dipersilakan beristirahat dan memanfaatkan waktu dengan sebaik-baiknya.

> Harap kembali tepat waktu agar kegiatan dinas dapat berjalan dengan tertib dan lancar.

━━━━━━━━━━━━━━━━━━━━━━━
🇮🇩 DISIPLIN • LOYALITAS • KEHORMATAN
[NMRP] NUSANTARA METROPOLITAN ROLEPLAY
━━━━━━━━━━━━━━━━━━━━━━━

🍽️ SELAMAT BERISTIRAHAT 🍽️

<@&1521750857581072474>`;
      break;

    case "masuk":
      pesan = `🔔 DING... DING... DING... 🔔

━━━━━━━━━━━━━━━━━━━━━━━
📢 BELL MASUK DINAS
[NMRP] NUSANTARA METROPOLITAN ROLEPLAY
━━━━━━━━━━━━━━━━━━━━━━━

*Ding... Ding... Ding...*

**Perhatian kepada seluruh personel.**

> Waktu istirahat telah berakhir. Seluruh personel diharapkan segera kembali ke pos dan melanjutkan tugas sesuai tanggung jawab masing-masing.

> Tetap jaga disiplin, loyalitas, serta profesionalisme dalam setiap pelaksanaan dinas.

━━━━━━━━━━━━━━━━━━━━━━━
🇮🇩 DISIPLIN • LOYALITAS • KEHORMATAN
[NMRP] NUSANTARA METROPOLITAN ROLEPLAY
━━━━━━━━━━━━━━━━━━━━━━━

🔔 SELAMAT MELANJUTKAN DINAS 🔔

<@&1521750857581072474>`;
      break;

    case "selesai":
      pesan = `🌙 DING... DING... DING... 🌙

━━━━━━━━━━━━━━━━━━━━━━━
📢 BELL SELESAI DINAS
[NMRP] NUSANTARA METROPOLITAN ROLEPLAY
━━━━━━━━━━━━━━━━━━━━━━━

*Ding... Ding... Ding...*

**Perhatian kepada seluruh personel.**

> Jam dinas pada hari ini telah berakhir. Terima kasih atas dedikasi dan pengabdian seluruh personel selama menjalankan tugas.

> Selamat beristirahat dan tetap jaga nama baik serta kehormatan satuan.

━━━━━━━━━━━━━━━━━━━━━━━
🇮🇩 DISIPLIN • LOYALITAS • KEHORMATAN
[NMRP] NUSANTARA METROPOLITAN ROLEPLAY
━━━━━━━━━━━━━━━━━━━━━━━

🌙 SELAMAT BERISTIRAHAT 🌙

<@&1521750857581072474>`;
      break;
  }

  channel.send(pesan);
}

client.once("clientReady", () => {
  console.log(`Bot aktif: ${client.user.tag}`);

  // 07:00 WIB - Bell Dinas
  cron.schedule("0 7 * * *", () => {
    const channel = client.channels.cache.get(CHANNEL_ID);
    if (channel) sendBell(channel, "dinas");
  }, {
    timezone: "Asia/Jakarta"
  });

  // 12:00 WIB - Bell Istirahat
  cron.schedule("0 12 * * *", () => {
    const channel = client.channels.cache.get(CHANNEL_ID);
    if (channel) sendBell(channel, "istirahat");
  }, {
    timezone: "Asia/Jakarta"
  });

  // 13:00 WIB - Bell Masuk Dinas
  cron.schedule("0 13 * * *", () => {
    const channel = client.channels.cache.get(CHANNEL_ID);
    if (channel) sendBell(channel, "masuk");
  }, {
    timezone: "Asia/Jakarta"
  });

  // 22:00 WIB - Bell Selesai Dinas
  cron.schedule("0 22 * * *", () => {
    const channel = client.channels.cache.get(CHANNEL_ID);
    if (channel) sendBell(channel, "selesai");
  }, {
    timezone: "Asia/Jakarta"
  });
});

client.on("messageCreate", (message) => {
  if (message.author.bot) return;

  switch (message.content.toLowerCase()) {
    case "/bell":
      sendBell(message.channel, "dinas");
      break;

    case "/istirahat":
      sendBell(message.channel, "istirahat");
      break;

    case "/masuk":
      sendBell(message.channel, "masuk");
      break;

    case "/selesai":
      sendBell(message.channel, "selesai");
      break;
  }
});

client.login(process.env.TOKEN);
