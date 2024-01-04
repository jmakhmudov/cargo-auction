import ActiveLots from "./ActiveLots";
import SoldLots from "./SoldLots";
import LotInfo from "./LotInfo";
import NotReg from "./NotReg";

const activeLotsPage = () => (<ActiveLots />);

const soldLotsPage = () => (<SoldLots />);

const lotInfoPage = () => (<LotInfo />);

const notRegPage = () => (<NotReg />);

export const pages = {
  'ActiveLots': activeLotsPage(),
  'SoldLots': soldLotsPage(),
  'LotInfo': lotInfoPage(),
  'NotReg': notRegPage(),
}
