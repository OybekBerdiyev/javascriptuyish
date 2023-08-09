const { Bot, Keyboard, InlineKeyboard } = require("grammy");
const isJoin = async(ctx,next) => {
    const telegramId = ctx.from.id
    const {status} = await ctx.api.getChatMember("-1001820670806",telegramId)
    
    if (status !== "left") {
        return next()
    }

    const keyboard = new InlineKeyboard().url("A'zo bo'lish","https://t.me/theoybekchannel")
    await ctx.reply("Avval obuna bo'ling",{
        reply_markup: {
            ...keyboard
        }
    })
}
module.exports = isJoin