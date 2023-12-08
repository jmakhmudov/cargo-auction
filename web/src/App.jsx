import Lots from "./pages/Lots";
import { useSnapshot } from "valtio";
import state from "./store";

const App = () => {
  const snap = useSnapshot(state);
  console.log(snap.userData);
  return (
    <>
      <Lots />
      {snap.userData.id}
      {snap.userData.username}
    </>
  );
};

export default App;
