import { Telegraf } from 'telegraf'
import { message } from 'telegraf/filters'
import TelegrafI18n from 'telegraf-i18n'
import { Database } from "bun:sqlite";

const db = new Database("mydb.sqlite", { create: true });

const bot = new Telegraf(process.env.BOT_TOKEN)
const i18n = new TelegrafI18n({
    defaultLanguage: 'en',
    allowMissing: true, // Default true
    directory: './locales'
  })

bot.use(i18n.middleware())

bot.start( async (ctx) => {

    await ctx.reply("Choose language! Выберите язык", {
        reply_markup: {
            inline_keyboard: [
                [ { text: "English", callback_data: "locale_en" }, { text: "Русский", callback_data: "locale_ru" } ],
            ]
        }
    });
})

bot.action('locale_en',async (ctx)=>{
    console.log(ctx.chat.id)
    db.transaction(() => {  });
    await ctx.reply('hahalol english')
})

bot.action('locale_ru',async (ctx)=>{
    await ctx.reply('хахалол русский')
})




bot.launch()

const stopBot = ()=>{
    bot.stop('SIGINT');
    db.close();
}

// Enable graceful stop
process.once('SIGINT', stopBot)
process.once('SIGTERM', stopBot)
process.once('SIGKILL', stopBot)