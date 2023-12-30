import { Scenes } from 'telegraf';

// Scenes
export const registrationScene = new Scenes.WizardScene(
  'registration',
  (ctx) => {
    // Введите своё ФИО:
    ctx.reply('Введите своё ФИО:');
    return ctx.wizard.next();
  },
  (ctx) => {
    // Сохраните ФИО пользователя в состояние
    const userData = userStates.get(ctx.message.from.id);
    userData.fullName = ctx.message.text;

    // Введите свой телефон:
    ctx.reply('Введите свой телефон:');
    return ctx.wizard.next();
  },
  (ctx) => {
    // Сохраните телефон пользователя в состояние
    const userData = userStates.get(ctx.message.from.id);
    userData.phone = ctx.message.text;

    // Введите свой Email:
    ctx.reply('Введите свой Email:');
    return ctx.wizard.next();
  },
  (ctx) => {
    // Сохраните Email пользователя в состояние
    const userData = userStates.get(ctx.message.from.id);
    userData.email = ctx.message.text;

    // Введите название компании:
    ctx.reply('Введите название компании:');
    return ctx.wizard.next();
  },
  (ctx) => {
    // Сохраните название компании в состояние
    const userData = userStates.get(ctx.message.from.id);
    userData.company = ctx.message.text;

    // Введите свою должность:
    ctx.reply('Введите свою должность:');
    return ctx.wizard.next();
  },
  (ctx) => {
    // Сохраните должность пользователя в состояние
    const userData = userStates.get(ctx.message.from.id);
    userData.position = ctx.message.text;

    // Введите комментарий о предоставляемых услугах и видах авто:
    ctx.reply('Введите комментарий о предоставляемых услугах и видах авто:');
    return ctx.wizard.next();
  },
  (ctx) => {
    // Сохраните комментарий пользователя в состояние
    const userData = userStates.get(ctx.message.from.id);
    userData.comment = ctx.message.text;

    // Сохраните данные пользователя в базу данных
    // ...

    // Очистите состояние пользователя
    userStates.delete(ctx.message.from.id);

    // Сообщите пользователю о завершении регистрации
    ctx.reply('Регистрация завершена. Спасибо за предоставленные данные!');
    return ctx.scene.leave();
  },
);


