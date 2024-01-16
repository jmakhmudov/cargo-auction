const formatDateTime = (timestamp) => {
  const date = new Date(timestamp);

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZone: 'Asia/Tashkent',
  };

  return new Intl.DateTimeFormat('ru-RU', options).format(date);
};

export default formatDateTime;