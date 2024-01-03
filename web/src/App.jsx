import Navbar from "./components/Navbar";
import { MdOutlineAccountCircle } from "react-icons/md";

import { useSnapshot } from "valtio";
import state from "./store";

import { pages } from "./pages";
import axios from "axios";
import { useEffect } from "react";

const getUserData = (id) => {
  const user = axios.get(`/api/bot/tguser/${state.tgUser.id}`).then(res => res.data);
  return user;
}

const App = () => {
  const snap = useSnapshot(state);

  useEffect(() => {
    state.userData = getUserData(snap.tgUser.id)
  }, [])

  return (
    <main>
      <div className="font-bold text-lg flex gap-1 items-center justify-center">
        <MdOutlineAccountCircle size={30} />
        <div>
          ID <span>{snap.tgUser.id}</span>
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