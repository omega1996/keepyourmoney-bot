import { Telegraf } from 'telegraf'
import { message } from 'telegraf/filters'

const bot = new Telegraf(process.env.BOT_TOKEN)


bot.start( async (ctx) => {
    await ctx.telegram.sendMessage(ctx.message.chat.id, `Hello! This bot can help you save your money`)
    await ctx.telegram.sendMessage(ctx.message.chat.id, `Привет! Этот бот поможет вам сохранить деньги`)
})

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
process.once('SIGKILL', () => bot.stop('SIGKILL'))