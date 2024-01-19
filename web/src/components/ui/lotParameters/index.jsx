import Parameter from "../parameter";
import formatDateTime from "../../../helpers/datetime";
import amountFormat from "../../../helpers/amountFormat";

const LotParameters = ({ lot }) => {
  return (
    <section>
      <section>
        <Parameter title="Время начала:">
          {formatDateTime(lot.start_date)} ТАШ
        </Parameter>
        <Parameter title="Время окончания:">
          {formatDateTime(lot.finish_date)} ТАШ
        </Parameter>
      </section>

      <section className="mt-4">
        <div className="text-sm text-gray">Описание лота</div>
        <p>{lot.lot_description}</p>
      </section>

      <section className="mt-4">
        <Parameter title="Заказчик:">
          <span>{lot.customer_name}</span>
        </Parameter>
        <Parameter title="Адрес, телефон заказчика:">
          {lot.customer_details}
        </Parameter>
        <Parameter title="Адрес склада для загрузки:">
          {lot.loading_address}
        </Parameter>
        <Parameter title="Адрес склада назначения:">
          {lot.destination_address}
        </Parameter>
        <Parameter title="Срок доставки:">
          {lot.del_time} дн.
        </Parameter>
      </section>

      <section className="mt-4">
        <Parameter title="Время готовности к погрузке:">
          <span>{formatDateTime(lot.loading_time)}</span>
        </Parameter>
        <Parameter title="Описание груза:">
          {lot.cargo_description}
        </Parameter>
        <Parameter title="Объем:">
          {lot.volume} м3
        </Parameter>
        {lot.temperature &&
          <Parameter title="Температурный режим (°C):">
            {lot.temperature}
          </Parameter>}
        <Parameter title="Вид упаковки:">
          {lot.packaging_type}
        </Parameter>
        <Parameter title="Описание упаковки:">
          {lot.packing_description}
        </Parameter>
        <Parameter title="Габариты упаковки (ДxШxВ см):">
          {lot.packaging_dimensions}
        </Parameter>
        <Parameter title="Общий вес брутто:">
          {lot.weight.toLocaleString(undefined, { maximumFractionDigits: 2 })} кг
        </Parameter>
        <Parameter title="Тип перевозки:">
          {lot.shipping_type}
        </Parameter>
        <Parameter title="Условия отгрузки:">
          {lot.shipment_terms}
        </Parameter>
      </section>

      <section className="mt-4">
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
    </section>
  );
}

export default LotParameters;
