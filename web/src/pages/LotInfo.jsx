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
import { FiArrowLeft } from "react-icons/fi";
import timeLeft from "../helpers/timeLeft";
import { getUserData } from "../App";

const LotInfo = () => {
  const snap = useSnapshot(state);
  const [lot, setLot] = useState(snap.currentLot);
  const [refreshCount, setRefreshCount] = useState(0);
  const [isRotating, setIsRotating] = useState(false);
  const [overlay, setOverlay] = useState(false);
  const [betData, setBetData] = useState({
    amount: lot.last_bet === null ? lot.initial_bet : 0,
    comment: '',
    lot: lot.id,
    user: snap.userData.id
  });
  const [result, setResult] = useState(betData.amount);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUserData(snap.tgUser.id);
        if (userData.registered === false) {
          state.currentPage = 'NotReg';
        } else {
          state.userData = userData;
        }
      } catch (error) {
        console.error('Error in fetchData:', error);
      }
    };
    getLotData();
    fetchData();
  }, [])

  const handleRefresh = async () => {
    setIsRotating(true);
    getLotData();
    try {
      const userData = await getUserData(snap.tgUser.id);
      if (userData.registered === false) {
        state.currentPage = 'NotReg';
      } else {
        state.userData = userData;
      }
    } catch (error) {
      console.error('Error in fetchData:', error);
    }

    setTimeout(() => {
      setRefreshCount(refreshCount + 1);
      setIsRotating(false);
    }, 1000);
  };

  const getLotData = async () => {
    await axios.get(`/api/bot/active-lot/${snap.currentLot.id}`).then(res => setLot(res.data))

    if (timeLeft(lot.finish_date) === "Время торгов истекло") {
      await axios.get(`/api/bot/expired-lot/${snap.currentLot.id}`).then(res => setLot(res.data))
      console.log(1)
    }
    else {
      console.log(2)
      await axios.get(`/api/bot/active-lot/${snap.currentLot.id}`).then(res => setLot(res.data))
    }
  }

  const handleBet = async () => {
    try {
      const userData = await getUserData(snap.tgUser.id);
      if (userData.registered === false) {
        state.currentPage = 'NotReg';
      } else {
        state.userData = userData;
        if (userData.status) {
          const liveLot = await axios.get(`/api/bot/active-lot/${snap.currentLot.id}`)
            .then(res => res.data);

          if (liveLot.last_bet === null) {
            if (betData.amount === '' || betData.amount === liveLot.initial_bet) {
              betData.amount = liveLot.initial_bet;

              await axios.post('/api/bot/bet-create/', betData);
              setResult(`${betData.amount} ${lot.currency}`);
            } else if (betData.amount >= liveLot.initial_bet) {
              await axios.post('/api/bot/bet-create/', betData);
              setResult(`${betData.amount} ${lot.currency}`);
            } else {
              setResult("Ваша ставка меньше начальной ставки");
            }
          } else {
            const lastBetAmount = liveLot.last_bet.amount ?? liveLot.initial_bet;

            if (betData.amount > lastBetAmount && betData.amount > liveLot.initial_bet) {
              await axios.post('/api/bot/bet-create/', betData);
              setResult(`${betData.amount} ${lot.currency}`);
            } else {
              setResult("Ваша ставка должна быть больше текущей ставки");
            }
          }
          getLotData();
          setOverlay(true);
        }
      }
    } catch (error) {
      console.error('Error in fetchData:', error);
    }
  }

  return (
    <PageTemplate title={`Информация о лоте`}>
      <FiArrowLeft
        size={20}
        className="mb-2 cursor-pointer"
        onClick={() => { state.currentPage = timeLeft(lot.finish_date) === "Время торгов истекло" ? 'ActiveLots' : 'SoldLots' }}
      />

      <div
        onClick={() => setOverlay(false)}
        className={`fixed top-0 bottom-0 right-0 left-0 bg-blue bg-opacity-50 flex items-center justify-center ${overlay ? 'block' : 'hidden'}`}
      >
        <div className=" bg-white px-16 py-10 rounded-md grid place-items-center text-center">
          {
            result === `${betData.amount} ${lot.currency}` ?
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
          location={lot.departure}
        />
        <Location
          type='destination'
          location={lot.destination}
        />
      </section>

      <div className="text-black font-normal text-sm my-4">
        {
          timeLeft(lot.finish_date) === "Время торгов истекло" ?
            "Победная ставка"
            :
            (lot.last_bet !== null ? "Текущая ставка" : "Начальная ставка")
        }
        <div className="font-bold text-2xl">
          {`${lot.last_bet ?
            amountFormat(lot.last_bet.amount)
            : amountFormat(lot.initial_bet)
            } ${lot.currency}`}
        </div>
      </div>

      {
        timeLeft(lot.finish_date) === "Время торгов истекло" ?
          <></>
          :
          <section className="mt-4 grid gap-2">
            <div className="flex items-center gap-2 font-medium">
              <input
                type="number"
                placeholder='Сумма'
                className="font-normal"
                min={lot.initial_bet}
                onChange={(e) => setBetData(prevState => {
                  return {
                    ...prevState,
                    amount: e.target.value
                  }
                })}
              />
              {lot.currency}
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
              className={`font-bold bg-blue text-white py-2 rounded-md ${(!snap.userData.status  || timeLeft(lot.finish_date) === "Время торгов истекло") ? 'opacity-50' : 'opacity-100'}`}
              onClick={handleBet}
              disabled={!snap.userData.status  || timeLeft(lot.finish_date) === "Время торгов истекло"}
            >
              Сделать ставку
            </button>
            <div className="text-xs text-red">
              {snap.userData.status ? '' : 'Ваш аккаунт не подтверджен, вы не имеете возможность делать ставки'}
            </div>
            <div className="text-xs text-red">
              {timeLeft(lot.finish_date) === "Время торгов истекло" ? 'Время торгов истекло' : ''}
            </div>
          </section>
      }


      <LotParameters lot={lot} />

    </PageTemplate>
  )
}

export default LotInfo;