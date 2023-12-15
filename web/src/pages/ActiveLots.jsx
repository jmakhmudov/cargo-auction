import LotCard from "../components/LotCard";
import PageTemplate from "../templates/PageTemplate";

import { useSnapshot } from "valtio";
import state from "../store";

const ActiveLots = () => {
  const snap = useSnapshot(state);

  return (
    <PageTemplate title="Актуальные лоты">
      <div className="grid gap-6 pb-20">
        {snap.lots.map((lot, idx) => (
          <div key={lot.id}>
            <LotCard lot={lot} />
            {idx+1 !== snap.lots.length ? <hr className="mt-6" /> : <></>}
          </div>
        ))}
      </div>
    </PageTemplate>
  );
};

export default ActiveLots;
