import LotCard from "../components/LotCard";
import PageTemplate from "../templates/PageTemplate";
import { useSnapshot } from "valtio";
import state from "../store";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../components/ui/loading";
import Empty from "../components/ui/empty";

const ActiveLots = () => {
  const snap = useSnapshot(state);
  const [lots, setLots] = useState([]);
  const [filteredLots, setFilteredLots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const searchLot = (id) => {
    const filtered = lots.filter((lot) => lot.id.toString().includes(id));
    setFilteredLots(filtered);
  };

  const searchLotByCountry = (country) => {
    if (selectedCountry === country) {
      setSelectedCountry(null);
      setFilteredLots(lots)
    } else {
      const filtered = lots.filter((lot) => lot.departure.includes(country));
      setSelectedCountry(country)
      setFilteredLots(filtered);
    }
  };

  useEffect(() => {
    axios
      .get('/api/bot/active-lots', {
        headers: {
          Accept: 'application/json'
        }
      })
      .then((res) => {
        setLots(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const uniqueCountries = Array.from(new Set(lots.map((lot) => lot.departure.split(',').pop().trim())));

  return (
    <PageTemplate title="Актуальные лоты">
      <input
        type="number"
        placeholder="Поиск по ID лота"
        className="font-normal mb-2"
        onChange={(e) => searchLot(e.target.value)}
      />
      {loading && <Loading />}
      {!loading && lots.length === 0 && <Empty />}
      {!loading && lots.length > 0 && (
        <div>
          <section className="flex items-center gap-2 my-2 overflow-x-auto no-scrollbar">
            {uniqueCountries.map((country) => (
              <div
                className={`border-[1.5px] border-gray px-3 py-[2px] rounded-md text-gray text-sm cursor-pointer select-none ${selectedCountry === country ? 'selected' : ''}`}
                key={country}
                onClick={(e) => searchLotByCountry(country)}
              >
                {country}
              </div>
            ))}
          </section>
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
        </div>
      )}
    </PageTemplate>
  );
};

export default ActiveLots;
