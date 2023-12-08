import Lots from "./pages/Lots";
import { useSnapshot } from "valtio";
import state from "./store";
import { pages } from "./pages";

const App = () => {
  const snap = useSnapshot(state);

  return (
    <>
      {pages[snap.currentPage]}
      {snap.userData.id}
      {snap.userData.username}

      <button className="block" onClick={() => state.currentPage='SoldLots'}>Sold</button>
      <button className="block" onClick={() => state.currentPage='Lots'}>Lots</button>
    </>
  );
};

export default App;