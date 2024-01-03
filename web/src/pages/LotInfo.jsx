import Location from "../components/ui/location";
import PageTemplate from "../templates/PageTemplate";
import LotParameters from "../components/ui/lotParameters";

import { useEffect, useState } from "react";
import { useSnapshot } from "valtio";
import state from "../store";

import amountFormat from "../helpers/amountFormat";
import axios from "axios";

import { MdOutlineRefresh } from "react-icons/md";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { PiXCircleFill } from "react-icons/pi";

const LotInfo = () => {
  const snap = useSnapshot(state);
  const [lot, setLot] = useState(snap.currentLot);
  const [refreshCount, setRefreshCount] = useState(0);
  const [isRotating, setIsRotating] = useState(false);
  const [overlay, setOverlay] = useState(false);
  const [betData, setBetData] = useState({
    amount: lot.last_bet === null ? lot.parameters.initial_bet : 0,
    comment: '',
    lot: lot.id,
    user: snap.userData.id
  });
  const [result, setResult] = useState(betData.amount);

  useEffect(() => {
    getLotData();
  }, [])

  const handleRefresh = () => {
    setIsRotating(true);
    getLotData();

    setTimeout(() => {
      setRefreshCount(refreshCount + 1);
      setIsRotating(false);
    }, 1000);
  };

  const getLotData = () => {
    axios.get(`/api/bot/active-lot/${snap.currentLot.id}`).then(res => setLot(res.data));
  }

  const handleBet = async () => {
    const liveLot = await axios.get(`/api/bot/active-lot/${snap.currentLot.id}`)
      .then(res => res.data);
    console.log(liveLot)

    
    if (liveLot.last_bet === null) {
      if (betData.amount === '' || betData.amount === liveLot.parameters.initial_bet) {
        betData.amount = liveLot.parameters.initial_bet;

        await axios.post('/api/bot/bet-create/', betData);
        setResult(`${betData.amount} ${lot.parameters.currency}`);
      } else {
        setResult("Ваша ставка меньше начальной ставки");
      }
    } else {
      const lastBetAmount = liveLot.last_bet.amount ?? liveLot.parameters.initial_bet;

      if (betData.amount > lastBetAmount && betData.amount > liveLot.parameters.initial_bet) {
        await axios.post('/api/bot/bet-create/', betData);
        setResult(`${betData.amount} ${lot.parameters.currency}`);
      } else {
        setResult("Ваша ставка должна быть больше текущей ставки");
      }
    }
    getLotData();
    setOverlay(true);
  }

  return (
    <PageTemplate title={`Информация о лоте`}>
      <div
        onClick={() => setOverlay(false)}
        className={`fixed top-0 bottom-0 right-0 left-0 bg-blue bg-opacity-50 flex items-center justify-center ${overlay ? 'block' : 'hidden'}`}
      >
        <div className=" bg-white px-16 py-10 rounded-md grid place-items-center text-center">
          {
            result === `${betData.amount} ${lot.parameters.currency}` ?
              <IoIosCheckmarkCircle size={80} color="#3476AB" />
              :
              <PiXCircleFill size={80} color="#AB3434" />
          }
          <strong>{result}</strong>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-medium">
            Лот <span className="font-bold">#{lot.id}</span>
          </h2>

          <div className="text-sm">
            {lot.start_date.substring(0, 10)}
          </div>
        </div>

        <MdOutlineRefresh size={24} onClick={handleRefresh} className={`${isRotating && 'rotate-360 animate-spin'} cursor-pointer`} />
      </div>

      <section className="grid gap-1 mt-4">
        <Location
          type='departure'
          location={lot.parameters.departure}
        />
        <Location
          type='destination'
          location={lot.parameters.destination}
        />
      </section>

      <div className="text-black font-normal text-sm my-4">
        {lot.last_bet !== null ? "Текущая ставка" : "Начальная ставка"}
        <div className="font-bold text-2xl">
          {
            lot.last_bet ?
              amountFormat(lot.last_bet.amount)
              : amountFormat(lot.parameters.initial_bet)
          } {lot.parameters.currency}
        </div>
      </div>

      <section className="mt-4 grid gap-2">
        <div className="flex items-center gap-2 font-medium">
          {
            lot.last_bet === null && <strong>{amountFormat(lot.parameters.initial_bet)}{lot.parameters.currency}</strong>
          }
          <input
            type="number"
            placeholder={lot.last_bet !== null ? `Сумма в ${lot.parameters.currency}*` : `Или введите сумму в ${lot.parameters.currency}*`}
            className="font-normal"
            onChange={(e) => setBetData(prevState => {
              return {
                ...prevState,
                amount: e.target.value
              }
            })}
          />
          {lot.parameters.currency}
        </div>

        <input
          type="text"
          placeholder="Комментарий"
          onChange={(e) => setBetData(prevState => {
            return {
              ...prevState,
              comment: e.target.value
            }
          })}
        />

        <button
          className={`font-bold bg-blue text-white py-2 rounded-md ${snap.userData.status ? '' : 'opacity-50'}`}
          onClick={handleBet}
          disabled={!snap.userData.status}
        >
          Сделать ставку
        </button>
        <div className="text-xs text-red">
          {snap.userData.status ? '' : '*Ваш аккаунт не подтверджен, вы не имеете возможность делать ставки'}
        </div>
      </section>

      <LotParameters lot={lot} />

    </PageTemplate>
  )
}

export default LotInfo;