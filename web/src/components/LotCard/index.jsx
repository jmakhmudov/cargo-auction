import { FiArrowRightCircle } from "react-icons/fi";
import Badge from "../ui/badge";

const LotCard = ({ lot }) => {
  return (
    <div className="grid gap-4">
      <section
        className=" flex items-center justify-between"
      >
        <div>
          <h2 className="text-xl font-medium">
            Лот <span className="font-bold">#{lot.id}
          </span></h2>
          
          <div className="text-sm">
            {lot.start_date.substring(0, 10)}
          </div>
        </div>

        <div>
          time left
        </div>
      </section>

      <section className="flex item-center gap-2">
        <Badge title={"10 дней"} type="days"/>
        <Badge title={"Опасный"} type="danger"/>
      </section>


    </div>
  );
}

export default LotCard;