import { useSnapshot } from "valtio";
import state from "../../store";
import { FiBox } from "react-icons/fi";
import { FiCheckSquare } from "react-icons/fi";

const Navbar = () => {
  const snap = useSnapshot(state);

  const setActiveBtn = (page) => {
    return snap.currentPage === page ? "opacity-100" : "opacity-50"
  }

  return (
    <div
      className={`flex items-center justify-between py-3 bg-blue rounded-md fixed bottom-4 right-4 left-4 shadow-lg shadow-blue ${snap.currentPage === "NotReg" && "hidden"}`}
    >
      <div 
        className="bg-blue w-1/2 flex items-center justify-center"
        onClick={() => state.currentPage = 'ActiveLots'}
      >
        <FiBox
          size={30}
          color="white"
          className={`${setActiveBtn('ActiveLots')} cursor-pointer`}
        />
      </div>

      <div 
        className="bg-blue w-1/2 flex items-center justify-center"
        onClick={() => state.currentPage = 'SoldLots'}
      >
        <FiCheckSquare
          size={30}
          color="white"
          className={`${setActiveBtn('SoldLots')} cursor-pointer`}
        />
      </div>
    </div>
  );
}

export default Navbar;