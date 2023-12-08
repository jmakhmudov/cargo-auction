import { FiArrowRightCircle } from "react-icons/fi";

const LotCard = ({ lot }) => {
  return (
    <div>
      <section
        className=""
      >
        <div>
          <h2>Лот <span>{lot.id}</span></h2>
          <div>{lot.start_date}</div>
        </div>

        time
      </section>
    </div>
  );
}

export default LotCard;