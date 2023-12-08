import { useSnapshot } from "valtio";
import state from "./store";
import { pages } from "./pages";
import Navbar from "./components/ui/Navbar/Navbar";

const App = () => {
  const snap = useSnapshot(state);

  return (
    <main>
      <div className="font-bold text-lg">
        ID <span>{snap.userData.id}</span>
      </div>

      <div
        className="pt-4"
      >
        {pages[snap.currentPage]}
      </div>

      <Navbar />
    </main>
  );
};

export default App;