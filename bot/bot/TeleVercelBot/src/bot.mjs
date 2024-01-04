import TeleBot from 'telebot';
import axios from 'axios';
import session from 'telebot-session-localstorage';

const bot = new TeleBot({
  token: process.env.BOT_TOKEN,
  polling: { interval: 1000, timeout: 0, limit: 100, retryTimeout: 5000 },
});

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPhoneNumber(phoneNumber) {
  const phoneRegex = /\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$/;
  return phoneRegex.test(phoneNumber);
}

// Start command for registration
bot.on(['/start'], async (msg) => {
  const user = await checkReg(msg.from.id);

  if (user.detail) {
    bot.sendMessage(msg.chat.id, 'Добро пожаловать! Давайте начнем регистрацию. Введите ваше ФИО:');
    bot.session = { step: 1 };
  } else {
    bot.sendMessage(msg.chat.id, `Здравствуйте ${user.name}! Вы ${user.status ? "подтверждены и можете участвовать в торгах ✅" : "пока не прошли верификацию от админа, ожидайте 🕐"}`);
  }
});

// Command to check user status
bot.on(['/status'], async (msg) => {
  const user = await checkReg(msg.from.id);

  bot.sendMessage(msg.chat.id, `Здравствуйте ${user.name}! Вы ${user.status ? "подтверждены и можете участвовать в торгах ✅" : "пока не прошли верификацию от админа, ожидайте 🕐"}`);
});

// Handling user input during the registration process
bot.on('text', async (msg) => {
  const { text } = msg;

  switch (bot.session.step) {
    case 1:
      bot.session.name = text;
      bot.sendMessage(msg.chat.id, `Отлично! Теперь введите ваш номер телефона (введите полный номер со знаком +): ${bot.session.step}`);
      bot.session.step++;
      break;
    case 2:
      if (isValidPhoneNumber(text)) {
        bot.session.telephone_num = text;
        bot.sendMessage(msg.chat.id, 'Хорошо! Теперь введите вашу электронную почту:');
        bot.session.step++;
      } else {
        bot.sendMessage(msg.chat.id, 'Ошибка! Некорректный номер телефона (введите полный номер со знаком +):');
      }
      break;
    case 3:
      // Step 3: Email
      if (isValidEmail(text)) {
        bot.session.email = text;
        bot.sendMessage(msg.chat.id, 'Прекрасно! Теперь укажите название вашей компании:');
        bot.session.step++;
      } else {
        bot.sendMessage(msg.chat.id, 'Ошибка! Введите правильную электронную почту:');
        bot.session.step = 3;
      }
      break;
    // Additional steps can be added as needed
    // ...
    case 6:
      // Step 6: Comment
      bot.session.comment = text;
      const telegramUserId = msg.from.id;

      // Add Telegram user ID to the JSON data
      bot.session.id = telegramUserId;

      // Complete registration and send data via API
      try {
        await sendRegistrationData(bot.session);
        bot.sendMessage(msg.chat.id, 'Спасибо за регистрацию! Ваши данные были успешно отправлены. Ожидайте подтверждения 🕐');
      } catch (error) {
        console.error('Error sending data via API:', error);
        bot.sendMessage(msg.chat.id, 'Произошла ошибка при отправке данных. Пожалуйста, попробуйте еще раз.');
      } finally {
        // Reset the session after registration completion
        bot.session = null;
      }
      break;
    default:
      bot.sendMessage(msg.chat.id, 'Что-то пошло не так. Пожалуйста, начните регистрацию снова.');
      bot.session = null;
      break;
  }
});

async function checkReg(id) {
  try {
    const response = await axios.get(`https://ovestellar.pythonanywhere.com/api/bot/tguser/${id}`, {
      headers: {
        Accept: 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    // Check if the error is due to a 404 Not Found
    if (error.response && error.response.status === 404) {
      // User is not registered
      return { detail: 'User not registered' };
    } else {
      // Handle other errors
      console.error('Error checking registration:', error.message);
      throw error; // Propagate the error
    }
  }
}

// Function to send data via API
async function sendRegistrationData(data) {
  delete data.step;
  const apiUrl = 'https://ovestellar.pythonanywhere.com/api/bot/tguser-create/'; // Replace with the actual API endpoint
  console.log(data);
  // Send data using axios
  await axios.post(apiUrl, data);
}

// Start the bot
bot.start();
