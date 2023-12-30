import LotCard from "../components/LotCard";
import PageTemplate from "../templates/PageTemplate";

import { useSnapshot } from "valtio";
import state from "../store";
import { useEffect, useState } from "react";
import axios from "axios";

const ActiveLots = () => {
  const snap = useSnapshot(state);
  const [lots, setLots] = useState([]);

  useEffect(() => {
    axios.get('/api/bot/lot', {
      header: {
        Accept: 'application/json'
      }
    })
      .then(res => setLots(res.data))
  }, []);

  return (
    <PageTemplate title="Актуальные лоты">
      <div className="grid gap-6 pb-20">
        {lots.map((lot, idx) => (
          <div key={lot.id}>
            <LotCard lot={lot} />
            {idx+1 !== lots.length ? <hr className="mt-6" /> : <></>}
          </div>
        ))}
      </div>
    </PageTemplate>
  );
};

export default ActiveLots;
