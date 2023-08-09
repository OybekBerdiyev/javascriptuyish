const { Bot,} = require("grammy");
const { isChecked } = require("./middleware/isAuth");
const isJoin = require("./middleware/isJoin.middleware");
const bot = new Bot("6222185600:AAEtkjo9LaOn_BOksvGqBrnKxZwtbcjz6qo");

bot.use(isChecked);
bot.use(isJoin);

bot.command("start", async (ctx) => {
  await ctx.reply("Assalomu alaykum. Men sizga postlaringizni hech kimga ko'rinmaydigan qilib saqlab beraman. Iltimos menga post yuboring");
});

bot.on("message:file", async (ctx) => {
    const sentMessage = await ctx.api.copyMessage("-1001787607472", ctx.from.id, ctx.message.message_id);
    await ctx.reply(`Your \`ID:${sentMessage.message_id}\``, { parse_mode: "Markdown" });
    await ctx.deleteMessage()
});

bot.on(":text", async (ctx) => {
    const text = ctx.message.text.split(":");
    if (text[0] == "ID" || text[0] == "id") {
        await ctx.api.copyMessage(ctx.from.id, "-1001787607472", text[1]);
    }else{
        ctx.reply("iltimos ID to'g'ri yozilganligiga ishonch hosil qiling")
    }
}); 

bot.catch();
bot.start();