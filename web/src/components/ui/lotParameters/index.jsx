import Parameter from "../parameter";
import formatDateTime from "../../../helpers/datetime";
import amountFormat from "../../../helpers/amountFormat";

const LotParameters = ({ lot }) => {
  return (
    <section>
      <section className="mt-4">
        <Parameter title="Время начала:">
          {formatDateTime(lot.start_date)} МСК
        </Parameter>
        <Parameter title="Время окончания:">
          {formatDateTime(lot.finish_date)} МСК
        </Parameter>
        <Parameter title="Обьем:">
          {lot.volume} м3
        </Parameter>
        <Parameter title="Тип груза:">
          {lot.is_danger ? "Опасный" : "Непопасный"}
        </Parameter>
        <Parameter title="Срок доставки:">
          {lot.del_time} дн.
        </Parameter>
        <Parameter title="Начальная ставка:">
          {amountFormat(lot.initial_bet)} {lot.currency}
        </Parameter>
        <Parameter title="Валюта:">
          {lot.currency}
        </Parameter>
        <Parameter title="Кол-во ставок:">
          {lot.total_bets}
        </Parameter>
      </section>

      <section className="mt-2">
        <div className="text-sm text-gray">Условия транспортировки</div>
        <p>{lot.conditions}</p>
      </section>

      <section className="mt-6">
        <div className="text-sm text-gray">Описание</div>
        <p>{lot.description}</p>
      </section>
    </section>
  )
}

export default LotParameters;