import LotCard from "../components/LotCard";
import PageTemplate from "../templates/PageTemplate";

import { useSnapshot } from "valtio";
import state from "../store";

const ActiveLots = () => {
  const snap = useSnapshot(state);

  return (
    <PageTemplate title="Актуальные лоты">
      {snap.lots.map((lot, idx) => (
        <LotCard key={idx} lot={lot}/>
      ))}
    </PageTemplate>
  );
};

export default ActiveLots;
