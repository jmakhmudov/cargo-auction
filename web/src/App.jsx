import Navbar from "./components/Navbar";
import { MdOutlineAccountCircle } from "react-icons/md";

import { useSnapshot } from "valtio";
import state from "./store";

import { pages } from "./pages";


const App = () => {
  const snap = useSnapshot(state);

  return (
    <main>
      <div className="font-bold text-lg flex gap-1 items-center justify-center">
        <MdOutlineAccountCircle size={30} />
        <div>
          ID <span>{snap.userData.id}</span>
        </div>
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