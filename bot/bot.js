const { Telegraf } = require('telegraf')

const bot = new Telegraf('')
bot.start((ctx) => ctx.reply('start',{
  reply_markup: {
    keyboard: [
      [{ text: "webapp", web_app:{url: "https://cargo-auction.vercel.app"} }]
    ]
  }
}))
bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))