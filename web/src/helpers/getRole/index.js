const roles = {
  'OBS': 'Наблюдатель',
  'PAR': 'Участник',
  'CUS': 'Заказчик',
}

const getRole = (role) => {
  return roles[role];
}

export default getRole;