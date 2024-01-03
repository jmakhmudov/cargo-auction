import { FiArrowRightCircle } from "react-icons/fi";
import Badge from "../ui/badge";
import Location from "../ui/location";

import state from "../../store";
import { useSnapshot } from "valtio";

import amountFormat from "../../helpers/amountFormat";
import timeLeft from "../../helpers/timeLeft";


const LotCard = ({ lot, isSold = false }) => {
  const snap = useSnapshot(state);

  const checkWinner = () => {
    return lot.last_bet?.user === snap.userData.id;
  }

  return (
    <div className="grid gap-4">
      <section
        className=" flex items-center justify-between"
      >
        <div>
          <h2 className="text-2xl font-medium">
            Лот <span className="font-bold">#{lot.id}
            </span></h2>

          <div className="text-sm">
            {lot.start_date.substring(0, 10)}
          </div>
        </div>

        <div className="text-sm font-medium">
          {
            isSold ?
              (checkWinner() ? "Вы победили" : "")
              :
              timeLeft(lot.finish_date)
          }
        </div>
      </section>

      <section className="grid gap-2">
        <section className="flex item-center gap-2">
          <Badge title={`${lot.parameters.del_time} д`} type="days" />
          {
            lot.parameters.is_danger ?
              <Badge title={"Опасный"} type="danger" />
              :
              <></>
          }
        </section>

        <section className="grid gap-1">
          <Location type='departure' location={lot.parameters.departure} />
          <Location type='destination' location={lot.parameters.destination} />
        </section>
      </section>



      <section className="flex items-center justify-between">
        <div className="text-black font-normal text-sm">
          {
            isSold ? "Победная ставка" : "Текущая ставка"
          }
          <div className="font-bold text-2xl">
            {`${lot.last_bet ?
                amountFormat(lot.last_bet.amount)
                : amountFormat(lot.parameters.initial_bet)} ${lot.parameters.currency}`}
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
            state.currentLot.isSold = isSold;
          }}
        />
      </section>
    </div>
  );
}

export default LotCard;