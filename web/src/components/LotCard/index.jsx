import { FiArrowRightCircle } from "react-icons/fi";
import Badge from "../ui/badge";
import Location from "../ui/location";
import state from "../../store";

const LotCard = ({ lot }) => {
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
          осталось 2 дня
        </div>
      </section>

      <section className="grid gap-2">
        <section className="flex item-center gap-2">
          <Badge title={`10 дней`} type="days" />
          <Badge title={"Опасный"} type="danger" />
        </section>

        <section className="grid gap-1">
          <Location type='departure' location={lot.parameters.departure} />
          <Location type='destination' location={lot.parameters.destination} />
        </section>
      </section>



      <section className="flex items-center justify-between">
        <div className="text-black font-normal text-sm">
          Текущая ставка
          <div className="font-bold text-2xl">
            {'1000'.toLocaleString('en-US', { minimumFractionDigits: 0 })} {lot.parameters.currency}
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