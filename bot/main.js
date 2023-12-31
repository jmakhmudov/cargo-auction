import axios from 'axios';
import { config } from 'dotenv';
import { Telegraf, session } from 'telegraf';

config(); // Загрузка переменных среды

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.use(session());
// Стартовая команда для начала регистрации
bot.command('start', async (ctx) => {
  ctx.reply('Добро пожаловать! Давайте начнем регистрацию. Введите ваше ФИО:');
  ctx.session = { step: 1 };
});

// Обработка ответов на каждый шаг регистрации
bot.on('text', async (ctx) => {
  const { message, session } = ctx;
  const { text } = message;

  switch (ctx.session.step) {
    case 1:
      // Шаг 1: ФИО
      ctx.session.name = text;
      ctx.reply(`Отлично! Теперь введите ваш номер телефона: ${ctx.session.step}`);
      ctx.session.step++;
      break;
    case 2:
      // Шаг 2: Номер телефона
      ctx.session.telephone_num = text;
      ctx.reply('Хорошо! Теперь введите вашу электронную почту:');
      ctx.session.step++;
      break;
    case 3:
      // Шаг 3: Электронная почта
      ctx.session.email = text;
      ctx.reply('Прекрасно! Теперь укажите название вашей компании:');
      ctx.session.step++;
      break;
    case 4:
      // Шаг 3: Электронная почта
      ctx.session.comp_name = text;
      ctx.reply('Гуд! Теперь укажите свою должность:');
      ctx.session.step++;
      break;
    case 5:
      // Шаг 4: Название компании
      ctx.session.job_title = text;
      ctx.reply('Отлично! Теперь вы можете оставить комментарий (не обязательно).');
      ctx.session.step++;
      break;
    case 6:
      // Шаг 5: Комментарий
      ctx.session.comment = text;
      const telegramUserId = ctx.from.id;

      // Add Telegram user ID to the JSON data
      ctx.session.id = telegramUserId;
      // Завершаем регистрацию и отправляем данные по API
      try {
        await sendRegistrationData(ctx.session);
        ctx.reply('Спасибо за регистрацию! Ваши данные были успешно отправлены.');
      } catch (error) {
        console.error('Ошибка отправки данных по API:', error);
        ctx.reply('Произошла ошибка при отправке данных. Пожалуйста, попробуйте еще раз.');
      } finally {
        // Сбрасываем сессию после завершения регистрации
        ctx.session = null;
      }
      break;
    default:
      ctx.reply('Что-то пошло не так. Пожалуйста, начните регистрацию снова.');
      ctx.session = null;
      break;
  }
});

async function checkReg(id) {
  await axios.get()
}

// Функция отправки данных по API
async function sendRegistrationData(data) {
  delete data.step;
  const apiUrl = 'https://ovestellar.pythonanywhere.com/api/bot/tguser-create/'; // Замените на реальный эндпоинт API
  console.log(data)
  // Отправка данных с использованием axios
  await axios.post(apiUrl, data);
}

// Запуск бота
bot.launch();