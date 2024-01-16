import PageTemplate from "../templates/PageTemplate";
import { useState, useEffect } from "react";
import axios from "axios";
import LotCard from "../components/LotCard";
import Loading from "../components/ui/loading";
import Empty from "../components/ui/empty";

const SoldLots = () => {
  const [lots, setLots] = useState([]);
  const [filteredLots, setFilteredLots] = useState([]);
  const [loading, setLoading] = useState(true);

  const searchLot = (id) => {
    const filtered = lots.filter((lot) => lot.id.toString().includes(id));
    setFilteredLots(filtered);
  };

  useEffect(() => {
    axios.get('/api/bot/expired-lots', {
      headers: {  // Fix the typo in "headers"
        Accept: 'application/json'
      }
    })
      .then(res => {
        setLots(res.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <PageTemplate title="История торгов">
      <input
        type="number"
        placeholder="Поиск по ID лота"
        className="font-normal mb-2"
        onChange={(e) => searchLot(e.target.value)}
      />
      {loading && <Loading />}
      {!loading && lots.length === 0 && <Empty />}
      {!loading && lots.length > 0 && (
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
      )}
    </PageTemplate>
  );
}

export default SoldLots;
