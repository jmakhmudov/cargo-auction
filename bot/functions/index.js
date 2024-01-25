import axios from 'axios';
import { config } from 'dotenv';
import { Telegraf, session, Markup } from 'telegraf';

config(); // Load environment variables

const bot = new Telegraf(process.env.BOT_TOKEN);

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPhoneNumber(phoneNumber) {
  const phoneRegex = /\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$/;
  return phoneRegex.test(phoneNumber);
}

bot.use(session());

// Команда старта для начала регистрации
bot.command('start', async (ctx) => {
  const user = await checkReg(ctx.from.id);

  if (user.detail) {
    ctx.reply('Добро пожаловать! Давайте начнем регистрацию. Введите ваше ФИО:');
    ctx.session = { step: 1 };
  } else {
    ctx.reply(`Здравствуйте! Вы ${user.role !== 'OBS' ? `${getRole(user.role)}, можете участвовать в торгах ✅. Для участия нажмите кнопку Участвовать` : "наблюдатель, чтобы изменить роль свяжитесь с админом. Для просмотра нажмите кнопку Участвовать"}`);
  }
});

bot.on('text', async (ctx) => {
  const { message, session } = ctx;
  const { text } = message;

  switch (ctx.session.step) {
    case 1:
      const telegramUserId = ctx.from.id;
      ctx.session.id = telegramUserId;
      ctx.session.name = text;
      ctx.reply(`Отлично! Теперь введите ваш номер телефона (введите полный номер со знаком +):`);
      ctx.session.step++;
      break;

    case 2:
      if (isValidPhoneNumber(text)) {
        ctx.session.telephone_num = text;
        ctx.reply('Хорошо! Теперь введите вашу электронную почту:');
        ctx.session.step++;
      } else {
        ctx.reply('Ошибка! Некорректный номер телефона (введите полный номер со знаком +):');
      }
      break;

    case 3:
      // Шаг 3: Электронная почта
      if (isValidEmail(text)) {
        ctx.session.email = text;
        ctx.reply('Прекрасно! Теперь укажите название вашей компании:');
        ctx.session.step++;
      } else {
        ctx.reply('Ошибка! Введите правильную электронную почту:');
        ctx.session.step = 3;
      }
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
      ctx.reply('Отлично! Теперь опишиите виды авто и предоставляемые услуги:');
      ctx.session.step++;
      break;

    case 6:
      // Шаг 5: Комментарий
      ctx.session.comment = text;

      // Предоставление пользователю подтверждающей клавиатуры
      ctx.reply('Прекрасно! Пожалуйста, проверьте вашу информацию:');
      ctx.replyWithMarkdown(getRegistrationSummary(ctx.session));
      ctx.reply('Всё верно?', getConfirmationKeyboard());

      // Переход к следующему шагу
      ctx.session.step++;
      break;

    case 7:
      if (text.toLowerCase() === 'Подтвердить') {
        // Handle confirmation
        try {
          await sendRegistrationData(ctx.session);
          ctx.reply('Спасибо за регистрацию! Ваши данные были успешно отправлены. Ожидайте подтверждения 🕐');
        } catch (error) {
          console.error('Ошибка отправки данных по API:', error);
          ctx.reply('Произошла ошибка при отправке данных. Пожалуйста, попробуйте еще раз.');
        } finally {
          // Сброс сессии после завершения регистрации
          ctx.session = null;
        }
      } else if (text.toLowerCase() === 'Редактировать') {
        // Handle editing
        // Пользователь хочет отредактировать информацию, вернемся на предыдущий шаг
        ctx.session.step -= 2; // Вернемся на два шага назад (на шаг 4)
        ctx.reply('Конечно! Давайте вернемся на предыдущий шаг.');
      } else {
        // Некорректный ответ, запросим подтверждение снова
        ctx.reply('Некорректный ответ. Пожалуйста, используйте кнопки для подтверждения или редактирования.');
      }
      break;


    default:
      ctx.reply('Что-то пошло не так. Пожалуйста, начните регистрацию снова.');
      ctx.session = null;
      break;
  }
});

// Функция проверки регистрации пользователя
async function checkReg(id) {
  try {
    const response = await axios.get(`https://ovestellar.pythonanywhere.com/api/bot/tguser/${id}`, {
      headers: {
        Accept: 'application/json'
      }
    });

    return response.data;
  } catch (error) {
    // Проверим, является ли ошибка 404 Not Found
    if (error.response && error.response.status === 404) {
      // Пользователь не зарегистрирован
      return { detail: 'Пользователь не зарегистрирован' };
    } else {
      // Обработаем другие ошибки
      console.error('Ошибка проверки регистрации:', error.message);
      throw error; // Передаем ошибку дальше
    }
  }
}

bot.action('confirm', async (ctx) => {
  try {
    await sendRegistrationData(ctx.session);
    ctx.reply('Спасибо за регистрацию! Ваши данные были успешно отправлены. Ожидайте подтверждения 🕐');
  } catch (error) {
    console.error('Ошибка отправки данных по API:', error);
    ctx.reply('Произошла ошибка при отправке данных. Пожалуйста, попробуйте еще раз.');
  } finally {
    // Сброс сессии после завершения регистрации
    ctx.session = null;
  }
})

bot.action('edit', async (ctx) => {

  ctx.session = {step: 1};
  ctx.reply('Конечно! Давайте начнем сначало. Давайте начнем регистрацию. Введите ваше ФИО:');

})

// Функция отправки данных по API
async function sendRegistrationData(data) {
  delete data.step;
  const apiUrl = 'https://ovestellar.pythonanywhere.com/api/bot/tguser-create/';
  console.log(data);
  // Отправка данных с использованием axios
  await axios.post(apiUrl, data);
}

// Роли пользователей
const roles = {
  'OBS': 'Наблюдатель',
  'PAR': 'Участник',
  'CUS': 'Заказчик',
}

// Получение наименования роли по коду
const getRole = (role) => roles[role];

// Вспомогательная функция для получения подтверждающей клавиатуры
const getConfirmationKeyboard = () => {
  return Markup.inlineKeyboard([
    Markup.button.callback('Подтвердить ✅', 'confirm'),
    Markup.button.callback('Редактировать 🔄', 'edit'),
  ]);
};

const getRegistrationSummary = (data) => {
  const formattedData = {
    'ФИО': data.name,
    'Телефон': data.telephone_num,
    'Email': data.email,
    'Название компании': data.comp_name,
    'Должность': data.job_title,
    'Описание услуг': data.comment,
  };

  const summary = Object.entries(formattedData)
    .map(([key, value]) => `*${key}*: ${value}`)
    .join('\n');

  return summary;
};

// Запуск бота
bot.launch();
