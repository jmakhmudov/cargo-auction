const { Telegraf } = require('telegraf')

const bot = new Telegraf(process.env.BOT_TOKEN)
bot.start((ctx) => ctx.reply({
  text: "Test web_app",
  web_app: {
      url: "https://revenkroz.github.io/telegram-web-app-bot-example/index.html"
  }
}))
bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))