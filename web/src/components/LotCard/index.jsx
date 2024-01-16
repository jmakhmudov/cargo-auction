import { FiArrowRightCircle } from "react-icons/fi";
import Badge from "../ui/badge";
import Location from "../ui/location";

import state from "../../store";
import { useSnapshot } from "valtio";

import amountFormat from "../../helpers/amountFormat";
import timeLeft from "../../helpers/timeLeft";

export const checkWinner = (snap, lot) => {
  return lot.last_bet?.user === snap.userData.id;
}

const LotCard = ({ lot }) => {
  const snap = useSnapshot(state);

  return (
    <div className="grid gap-4">
      <section
        className=" flex items-center justify-between"
      >
        <div>
          <h2 className="text-2xl font-medium">
            {lot.name} - <span className="font-bold">#{lot.id}
            </span></h2>

          <div className="text-sm">
            {lot.finish_date.substring(0, 10)}
          </div>
        </div>

        <div className="text-sm font-medium">
          {
            timeLeft(lot.finish_date) === "Время торгов истекло" ?
              (checkWinner(snap, lot) ? "Вы победили" : "")
              :
              timeLeft(lot.finish_date)
          }
        </div>
      </section>

      <section className="grid gap-2">
        <section className="flex item-center gap-2">
          <Badge title={`${lot.del_time} д`} type="days" />
          <Badge title={lot.shipment_terms} type="danger" />
        </section>

        <section className="grid gap-1">
          <Location type='departure' location={lot.departure} />
          <Location type='destination' location={lot.destination} />
        </section>
      </section>



      <section className="flex items-center justify-between">
        <div className="text-black font-normal text-sm">
          {
            timeLeft(lot.finish_date) === "Время торгов истекло" ? "Победная ставка" : (lot.last_bet ? <div>Текущая ставка {lot.last_bet && (lot.last_bet.user === snap.userData.id && <strong><span>(вы лидируете)</span></strong>)}</div> : "Начальная ставка")
          }
          <div className="font-bold text-2xl">
            {`${lot.last_bet ?
              amountFormat(lot.last_bet.amount)
              : amountFormat(lot.initial_bet)} ${lot.currency}`}
          </div>
        </div>

        <FiArrowRightCircle
          size={40}
          color="#3476AB"
          strokeWidth={1}
          className="cursor-pointer"
          onClick={() => {
            state.currentPage = 'LotInfo';
            state.currentLot = lot;
          }}
        />
      </section>
    </div>
  );
}

export default LotCard;