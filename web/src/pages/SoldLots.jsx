import PageTemplate from "../templates/PageTemplate";
import { useState, useEffect } from "react";
import axios from "axios";
import LotCard from "../components/LotCard";

const SoldLots = () => {
  const [lots, setLots] = useState([]);

  useEffect(() => {
    axios.get('/api/bot/expired-lots', {
      header: {
        Accept: 'application/json'
      }
    })
      .then(res => setLots(res.data))
  }, []);

  return (
    <PageTemplate title="История торгов">
      <div className="grid gap-6 pb-20">
        {lots.map((lot, idx) => (
          <div key={lot.id}>
            <LotCard lot={lot} />
            {idx + 1 !== lots.length ? <hr className="mt-6" /> : <></>}
          </div>
        ))}
      </div>
    </PageTemplate>
  )
}

export default SoldLots;