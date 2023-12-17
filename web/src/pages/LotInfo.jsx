import PageTemplate from "../templates/PageTemplate";
import Badge from "../components/ui/badge";
import Location from "../components/ui/location";
import Parameter from "../components/ui/parameter";

import { useSnapshot } from "valtio";
import state from "../store";

const LotInfo = () => {
  const snap = useSnapshot(state);
  const lot = snap.currentLot;

  return (
    <PageTemplate title={`Информация о лоте`}>
      <div>
        <h2 className="text-2xl font-medium">
          Лот <span className="font-bold">#{lot.id}
          </span></h2>

        <div className="text-sm">
          {lot.start_date.substring(0, 10)}
        </div>
      </div>

      <section className="grid gap-1 mt-4">
        <Location type='departure' location={lot.parameters_id.departure} />
        <Location type='destination' location={lot.parameters_id.destination} />
      </section>

      <section className="mt-4">
        <Parameter title="Время начала:">
          {lot.start_date}
        </Parameter>
        <Parameter title="Время окончания:">
          {lot.start_date}
        </Parameter>
        <Parameter title="Срок доставки:">
          {lot.parameters_id.delivery_time}
        </Parameter>
        <Parameter title="Обьем:">
          {lot.parameters_id.volume} м3
        </Parameter>
        <Parameter title="Тип груза:">
          {lot.parameters_id.is_danger ? "Опасный" : "Непопасный"}
        </Parameter>
        <Parameter title="Срок доставки:">
          {lot.parameters_id.delivery_time} дней
        </Parameter>
        <Parameter title="Начальная ставка:">
          {lot.parameters_id.initial_bet} {lot.parameters_id.currency}
        </Parameter>
        <Parameter title="Валюта:">
          {lot.parameters_id.currency}
        </Parameter>
        <Parameter title="Кол-во ставок:">
          {lot.bets_id.length}
        </Parameter>
      </section>


    </PageTemplate>
  )
}

export default LotInfo;