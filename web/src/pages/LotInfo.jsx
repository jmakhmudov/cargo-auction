import PageTemplate from "../templates/PageTemplate";
import Location from "../components/ui/location";
import Parameter from "../components/ui/parameter";

import { useSnapshot } from "valtio";
import state from "../store";
import { useState } from "react";

const LotInfo = () => {
  const [betData, setBetData] = useState({
    amount: 0,
    comment: ''
  })
  const snap = useSnapshot(state);
  const lot = snap.currentLot;

  const handleBet = () => {
    console.log(betData)
  }

  return (
    <PageTemplate title={`Информация о лоте`}>
      <div>
        <h2 className="text-2xl font-medium">
          Лот <span className="font-bold">#{lot.id}</span>
        </h2>

        <div className="text-sm">
          {lot.start_date.substring(0, 10)}
        </div>
      </div>

      <section className="grid gap-1 mt-4">
        <Location
          type='departure'
          location={lot.parameters.departure}
        />
        <Location
          type='destination'
          location={lot.parameters.destination}
        />
      </section>

      <div className="text-black font-normal text-sm my-4">
        Текущая ставка
        <div className="font-bold text-2xl">
          {lot.last_bet.amount.toLocaleString(
            'en-US',
            { minimumFractionDigits: 0 }
          )}
          {lot.parameters.currency}
        </div>
      </div>

      <section className="mt-4 grid gap-2">
        <div className="flex items-center gap-2 font-medium">
          <input
            type="number"
            placeholder={`Сумма в ${lot.parameters.currency}*`}
            className="font-normal"
            min={lot.last_bet.amount + 1}
            onChange={(e) => setBetData(prevState => {
              return {
                ...prevState,
                amount: e.target.value
              }
            })}
          />
          {lot.parameters.currency}
        </div>

        <input
          type="text"
          placeholder="Комментарий"
          onChange={(e) => setBetData(prevState => {
            return {
              ...prevState,
              comment: e.target.value
            }
          })}
        />

        <button
          className="font-bold bg-blue text-white py-2 rounded-md"
          onClick={handleBet}
        >
          Сделать ставку
        </button>
      </section>

      <section className="mt-4">
        <Parameter title="Время начала:">
          {lot.start_date}
        </Parameter>
        <Parameter title="Время окончания:">
          {lot.start_date}
        </Parameter>
        <Parameter title="Срок доставки:">
          {lot.parameters.delivery_time}
        </Parameter>
        <Parameter title="Обьем:">
          {lot.parameters.volume} м3
        </Parameter>
        <Parameter title="Тип груза:">
          {lot.parameters.is_danger ? "Опасный" : "Непопасный"}
        </Parameter>
        <Parameter title="Срок доставки:">
          {lot.parameters.delivery_time} дней
        </Parameter>
        <Parameter title="Начальная ставка:">
          {lot.parameters.initial_bet} {lot.parameters.currency}
        </Parameter>
        <Parameter title="Валюта:">
          {lot.parameters.currency}
        </Parameter>
        <Parameter title="Кол-во ставок:">
          {lot.bets.length}
        </Parameter>
      </section>

      <section className="mt-2">
        <div className="text-sm text-gray">Условия транспортировки</div>
        <p>{lot.parameters.conditions}</p>
      </section>

      <section className="mt-6">
        <div className="text-sm text-gray">Описание</div>
        <p>{lot.parameters.description}</p>
      </section>

    </PageTemplate>
  )
}

export default LotInfo;