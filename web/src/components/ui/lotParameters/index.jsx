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
          {lot.parameters.volume} м3
        </Parameter>
        <Parameter title="Тип груза:">
          {lot.parameters.is_danger ? "Опасный" : "Непопасный"}
        </Parameter>
        <Parameter title="Срок доставки:">
          {lot.parameters.del_time} дн.
        </Parameter>
        <Parameter title="Начальная ставка:">
          {amountFormat(lot.parameters.initial_bet)} {lot.parameters.currency}
        </Parameter>
        <Parameter title="Валюта:">
          {lot.parameters.currency}
        </Parameter>
        <Parameter title="Кол-во ставок:">
          {lot.total_bets}
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
    </section>
  )
}

export default LotParameters;