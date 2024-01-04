import Navbar from "./components/Navbar";
import { MdOutlineAccountCircle } from "react-icons/md";

import { useSnapshot } from "valtio";
import state from "./store";

import { pages } from "./pages";
import axios from "axios";
import { useEffect } from "react";

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
        // Handle errors
        console.error('Error in fetchData:', error);
      }
    };

    fetchData();
  }, [snap.tgUser.id]);

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