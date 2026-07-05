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

client.once("clientReady", () => {
  console.log(`Bot aktif: ${client.user.tag}`);

  cron.schedule("0 7,12,13,22 * * *", () => {
    const channel = client.channels.cache.get(CHANNEL_ID);
    if (!channel) return;

    const hour = new Date(
      new Date().toLocaleString("en-US", { timeZone: "Asia/Jakarta" })
    ).getHours();

    if (hour === 7) {
      channel.send("@everyone\n\n🔔 **DING... DING... DING...** 🔔\n\n━━━━━━━━━━━━━━━━━━━━━━━\n📢 **BELL DINAS TELAH BERBUNYI**\n**[NMRP] NUSANTARA METROPOLITAN ROLEPLAY**\n━━━━━━━━━━━━━━━━━━━━━━━\n\n*Ding... Ding... Ding...*\n\n**Perhatian kepada seluruh personel.**\n\n> Bel dinas telah dibunyikan. Seluruh personel diharapkan segera menghentikan aktivitas yang tidak berkaitan dengan dinas dan bersiap menerima instruksi dari pimpinan.\n\n> Harap tetap menjaga disiplin, ketertiban, dan etika selama pelaksanaan kegiatan.\n\n━━━━━━━━━━━━━━━━━━━━━━━\n🇮🇩 **DISIPLIN • LOYALITAS • KEHORMATAN**\n**[NMRP] NUSANTARA METROPOLITAN ROLEPLAY**\n━━━━━━━━━━━━━━━━━━━━━━━\n\n🔔 **DING... DING... DING...** 🔔");
    }

    if (hour === 12) {
      channel.send("@everyone\n\n🍽️ **DING... DING... DING...** 🍽️\n\n━━━━━━━━━━━━━━━━━━━━━━━\n📢 **BELL ISTIRAHAT SIANG**\n**[NMRP] NUSANTARA METROPOLITAN ROLEPLAY**\n━━━━━━━━━━━━━━━━━━━━━━━\n\nSeluruh personel dipersilakan melaksanakan istirahat siang.\n\nHarap kembali tepat waktu sesuai jadwal.\n\n━━━━━━━━━━━━━━━━━━━━━━━\n🇮🇩 **DISIPLIN • LOYALITAS • KEHORMATAN**\n**[NMRP] NUSANTARA METROPOLITAN ROLEPLAY**");
    }

    if (hour === 13) {
      channel.send("@everyone\n\n🔔 **DING... DING... DING...** 🔔\n\n━━━━━━━━━━━━━━━━━━━━━━━\n📢 **BELL MASUK DINAS**\n**[NMRP] NUSANTARA METROPOLITAN ROLEPLAY**\n━━━━━━━━━━━━━━━━━━━━━━━\n\nWaktu istirahat telah berakhir.\n\nSeluruh personel segera kembali melaksanakan tugas masing-masing.\n\n━━━━━━━━━━━━━━━━━━━━━━━\n🇮🇩 **DISIPLIN • LOYALITAS • KEHORMATAN**\n**[NMRP] NUSANTARA METROPOLITAN ROLEPLAY**");
    }

    if (hour === 22) {
      channel.send("@everyone\n\n🌙 **DING... DING... DING...** 🌙\n\n━━━━━━━━━━━━━━━━━━━━━━━\n📢 **BELL SELESAI DINAS**\n**[NMRP] NUSANTARA METROPOLITAN ROLEPLAY**\n━━━━━━━━━━━━━━━━━━━━━━━\n\nJam dinas telah berakhir.\n\nTerima kasih atas dedikasi seluruh personel hari ini.\n\nSelamat beristirahat.\n\n━━━━━━━━━━━━━━━━━━━━━━━\n🇮🇩 **DISIPLIN • LOYALITAS • KEHORMATAN**\n**[NMRP] NUSANTARA METROPOLITAN ROLEPLAY**");
    }
  }, {
    timezone: "Asia/Jakarta"
  });
});

client.on("messageCreate", (message) => {
  if (message.author.bot) return;

  if (message.content === "/bell") {
    message.channel.send("🔔 Bell dinas berbunyi!");
  }
});

client.login(process.env.TOKEN);
