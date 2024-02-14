import Navbar from "./components/Navbar";
import { MdOutlineAccountCircle } from "react-icons/md";

import { useSnapshot } from "valtio";
import state from "./store";

import { pages } from "./pages";
import axios from "axios";
import { useEffect } from "react";

import getRole from "./helpers/getRole";

export const getUserData = async (userId) => {
  try {
    const response = await axios.get(`/api/bot/tguser/${userId}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return { registered: false };
    } else {
      console.error('Error checking registration:', error.message);
      throw error;
    }
  }
}

const App = () => {
  const snap = useSnapshot(state);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUserData(snap.tgUser.id);
        if (userData.registered === false) {
          state.currentPage = 'NotReg';
        } else {
          state.userData = userData;
        }
      } catch (error) {
        console.error('Error in fetchData:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <main>
      <div className="font-bold text-lg flex items-center justify-between">
        <div className="flex items-center gap-1">
          <MdOutlineAccountCircle size={30} />
          <div>
            ID <span>{snap.tgUser.id}</span>
          </div>
        </div>

        <div>
          <div className="font-bold text-sm text-blue">{getRole(snap.userData.role)}</div>
          <div className="text-xs font-normal">{snap.userData.name}</div>
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