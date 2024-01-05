const timeLeft = (targetTimestamp) => {
  const currentDate = new Date();
  const targetDate = new Date(targetTimestamp);
  const timeDifference = targetDate - currentDate;

  if (timeDifference <= 0) {
    return "Время уже прошло";
  }

  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

  if (days > 1) {
    return `Осталось ${days} д ${hours} ч`;
  } else if (hours > 0) {
    return `Осталось ${hours} ч ${minutes} мин`;
  } else if (minutes > 0) {
    return `Осталось ${minutes} мин ${seconds} сек`;
  } else {
    return `Осталось ${seconds} сек`;
  }
}

export default timeLeft;