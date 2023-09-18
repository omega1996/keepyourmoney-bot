import { AppDataSource } from "./src/data-source"
import { User } from "./src/entity/User"
import { Context, Telegraf, session } from 'telegraf'
import { message } from 'telegraf/filters'
import TelegrafI18n, { I18n } from 'telegraf-i18n'


interface MyContext extends Context {
    i18n: I18n
  }

AppDataSource.initialize().then(async () => {

    // console.log("Inserting a new user into the database...")
    // const user = new User()
    // user.firstName = "Timbear"
    // user.lastName = "Saw"
    // user.age = 25
    // await AppDataSource.manager.save(user)
    // console.log("Saved a new user with id: " + user.id)

    // console.log("Loading users from the database...")
    // const users = await AppDataSource.manager.find(User)
    // console.log("Loaded users: ", users)

    // console.log("Here you can setup and run express / fastify / any other framework.")

}).catch(error => console.log(error))




const bot = new Telegraf<MyContext>(process.env.BOT_TOKEN)
const i18n = new TelegrafI18n({
    defaultLanguage: 'en',
    allowMissing: true, // Default true
    directory: './locales'
  })

bot.use(i18n.middleware())
bot.use(session())

bot.start( async (ctx) => {

    let user = await AppDataSource.manager.findOneBy(User, {tg_id: ctx.chat.id})

    if(!user){
        user = new User()
    }

    user.tg_id = ctx.chat.id
    if(ctx.chat.type === 'private'){
        user.firstName = ctx.chat.first_name
        user.lastName = ctx.chat.last_name
        user.username = ctx.chat.username
    }

    await AppDataSource.manager.save(user)

    await ctx.reply("Choose language! Выберите язык", {
        reply_markup: {
            inline_keyboard: [
                [ { text: "English", callback_data: "locale_en" }, { text: "Русский", callback_data: "locale_ru" } ],
            ]
        },
        
        
    });
})


async function setLocale(chat_id, locale){
    const user = await AppDataSource.manager.findOneBy(User, {tg_id: chat_id})
    if(user){
        user.locale = locale
        await AppDataSource.manager.save(user)
    }
} 


async function getLocale(i18n: I18n, chat_id: number) {
    const user = await AppDataSource.manager.findOneBy(User, {tg_id: chat_id})
    i18n.locale(user.locale)
}

bot.action('locale_en',async (ctx)=>{
    await setLocale(ctx.chat.id, 'en')
    ctx.i18n.locale('en')
    await ctx.reply('English language is set')
    return
})

bot.action('locale_ru',async (ctx)=>{
    await setLocale(ctx.chat.id, 'ru')
    ctx.i18n.locale('ru')
    await ctx.reply('Установлен русский язык')
    return
})

bot.on(message('text'), async (ctx) => {
    const value = parseFloat(ctx.message.text)
    await getLocale(ctx.i18n, ctx.chat.id)

    if(value){
        const message = ctx.i18n.t('currency.select')
        await ctx.reply(message)
    }
    else{
        const message = ctx.i18n.t('error.notNum')
        await ctx.reply(message)
    }
   
  })




bot.launch()

const stopBot = ()=>{
    bot.stop('SIGINT');
}

// Enable graceful stop
process.once('SIGINT', stopBot)
process.once('SIGTERM', stopBot)
process.once('SIGKILL', stopBot)