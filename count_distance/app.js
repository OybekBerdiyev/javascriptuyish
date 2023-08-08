const { Bot, Keyboard } = require("grammy");
const bot = new Bot("6533472212:AAGt_EkrOE6kW14tV80nd-a5VPVYJ1mS_Is");

bot.command("start", async (ctx) => {
  await ctx.reply("😊 Assalomu alaykum. Men sizning joylashuvingiz bilan Najot ta'lim(chilonzor) orasidagi masofasini hisoblab beradi \n \n Iltimos joylashuvingizni yuboring. \n Bot created by: @oybek25", {
    reply_markup: new Keyboard().requestLocation("Joylashuv yuborish").resized(),
  });
});

function calculateDistance(lat1, lon1, lat2, lon2) {
  const toRadians = (degrees) => (degrees * Math.PI) / 180;

  const R = 6371;
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance;
}

bot.on("message:location", (ctx) => {
  const myLocation = { latitude: 41.285976, longitude: 69.2037 };
  const userLocation = ctx.message.location;
  const distance = calculateDistance(
    myLocation.latitude,
    myLocation.longitude,
    userLocation.latitude,
    userLocation.longitude
  );

  ctx.reply(`Najot talimning chilonzor filiali va sizning orangizda ${distance.toFixed(2)} kilometr masofa bor.`);
});

bot.start();