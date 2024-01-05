import LotCard from "../components/LotCard";
import PageTemplate from "../templates/PageTemplate";

import { useSnapshot } from "valtio";
import state from "../store";
import { useEffect, useState } from "react";
import axios from "axios";

const ActiveLots = () => {
  const snap = useSnapshot(state);
  const [lots, setLots] = useState([]);
  const [filteredLots, setFilteredLots] = useState([]);

  const searchLot = (id) => {
    const filtered = lots.filter((lot) => lot.id.toString().includes(id));
    setFilteredLots(filtered);
  };

  useEffect(() => {
    axios
      .get('/api/bot/active-lots', {
        headers: {
          Accept: 'application/json'
        }
      })
      .then((res) => setLots(res.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <PageTemplate title="Актуальные лоты">
      <input
        type="number"
        placeholder="Поиск по ID лота"
        className="font-normal mb-2"
        onChange={(e) => searchLot(e.target.value)}
      />
      <div className="grid gap-6 pb-20">
        {filteredLots.length > 0
          ? filteredLots.map((lot, idx) => (
            <div key={lot.id}>
              <LotCard lot={lot} />
              {idx + 1 !== filteredLots.length ? <hr className="mt-6" /> : <></>}
            </div>
          ))
          : lots.map((lot, idx) => (
            <div key={lot.id}>
              <LotCard lot={lot} />
              {idx + 1 !== lots.length ? <hr className="mt-6" /> : <></>}
            </div>
          ))}
      </div>
    </PageTemplate>
  );
};

export default ActiveLots;
