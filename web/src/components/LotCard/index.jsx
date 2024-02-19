import { FiArrowRightCircle } from "react-icons/fi";
import Badge from "../ui/badge";
import Location from "../ui/location";

import state from "../../store";
import { useSnapshot } from "valtio";

import amountFormat from "../../helpers/amountFormat";
import timeLeft from "../../helpers/timeLeft";
import { useState } from "react";
import { PiXCircleFill } from "react-icons/pi";
import Loading from "../ui/loading";
import { getUserData } from "../../App";
import axios from "axios";
import { IoIosCheckmarkCircle } from "react-icons/io";

export const checkWinner = (snap, lot) => {
  return lot.last_bet?.user === snap.userData.id;
}

const LotCard = (props) => {
  const snap = useSnapshot(state);
  const [lot, setLot] = useState(props.lot);
  const [overlay, setOverlay] = useState(false);
  const [betData, setBetData] = useState({
    amount: lot.last_bet === null ? lot.initial_bet : lot.last_bet.amount - lot.step,
    comment: '',
    lot: lot.id,
    user: snap.userData.id
  });
  const [result, setResult] = useState(betData.amount);
  const [loading, setLoading] = useState(null);

  const getLotData = async () => {
    try {
      const response = await axios.get(`/api/bot/active-lot/${lot.id}`);
      setLot(response.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        try {
          const expiredLotResponse = await axios.get(`/api/bot/expired-lot/${lot.id}`);
          setLot(expiredLotResponse.data);
        } catch (expiredLotError) {
          console.error('Error getting expired lot data:', expiredLotError.message);
          throw expiredLotError;
        }
      } else {
        console.error('Error checking active lot data:', error.message);
        throw error;
      }
    }
  };

  const handleBet = async () => {
    console.log(betData)
    setOverlay(true)
    setLoading(true);
    try {
      const userData = await getUserData(snap.tgUser.id);
      if (userData.registered === false) {
        state.currentPage = 'NotReg';
      } else {
        state.userData = userData;
        if (userData.role != 'OBS') {
          const liveLot = await axios.get(`/api/bot/active-lot/${lot.id}`)
            .then(res => res.data);

          if (liveLot.last_bet === null) {
            setBetData(prevState => ({
              ...prevState,
              amount: liveLot.initial_bet
            }));

            await axios.post('/api/bot/bet-create/', betData);
            setResult(`${betData.amount} ${lot.currency}`);
            setLoading(false);
          } else {
            const lastBetAmount = liveLot.last_bet.amount ?? liveLot.initial_bet;

            if (betData.amount < lastBetAmount && betData.amount >= 0) {
              setBetData(prevState => ({
                ...prevState,
                amount: liveLot.last_bet.amount - liveLot.step * 2
              }));
              await axios.post('/api/bot/bet-create/', betData);
              setResult(`${betData.amount} ${lot.currency}`);
              setLoading(false);
            }
            else {
              setBetData(prevState => ({
                ...prevState,
                amount: liveLot.last_bet.amount - liveLot.step
              }));
              setLoading(false);
              setResult("Ставка изменилась");
            }
          }
          getLotData();
        }
      }
    } catch (error) {
      console.error('Error in fetchData:', error);
    }
  }

  return (
    <div className="grid gap-4">
      <div
        onClick={() => setOverlay(false)}
        className={`fixed top-0 bottom-0 right-0 left-0 bg-blue bg-opacity-50 flex items-center justify-center ${overlay ? 'block' : 'hidden'}`}
      >
        <div className=" bg-white px-16 py-10 rounded-md grid place-items-center text-center">
          {
            loading ? <Loading /> : (
              result === "Ставка изменилась" ?
                <PiXCircleFill size={80} color="#AB3434" />
                :
                <IoIosCheckmarkCircle size={80} color="#3476AB" />
            )

          }
          <strong>{!loading && result}</strong>
        </div>
      </div>

      <section
        className="flex items-center justify-between gap-2"
      >
        <div>
          <h2 className="text-2xl font-medium">
            {lot.name} - <span className="font-bold">#{lot.id}
            </span></h2>

          <div className="text-sm">
            {lot.finish_date.substring(0, 10)}
          </div>
        </div>

        <div className="text-sm font-medium text-right">
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

      {
        timeLeft(lot.finish_date) === "Время торгов истекло" ?
          <></>
          :
          <section className="flex gap-2">
            <button
              className={`w-full font-bold bg-blue text-white py-2 rounded-md ${(snap.userData.role === 'OBS' || timeLeft(lot.finish_date) === "Время торгов истекло") ? 'opacity-50' : 'opacity-100'}`}
              onClick={handleBet}
              disabled={snap.userData.role === 'OBS' || timeLeft(lot.finish_date) === "Время торгов истекло"}
            >
              Сделать ставку &#8226; {amountFormat(betData.amount)} {lot.currency}
            </button>
          </section>
      }

    </div>
  );
}

export default LotCard;