const amountFormat = (amount) => {
  return amount.toLocaleString('ru-RU', {
    minimumFractionDigits: 0,
  });
}

export default amountFormat;