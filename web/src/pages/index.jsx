import ActiveLots from "./ActiveLots";
import SoldLots from "./SoldLots";
import LotInfo from "./LotInfo";

const activeLotsPage = () => (<ActiveLots />)

const soldLotsPage = () => (<SoldLots />)

const lotInfoPage = () => (<LotInfo />)

export const pages = {
  'ActiveLots': activeLotsPage(),
  'SoldLots': soldLotsPage(),
  'LotInfo': lotInfoPage(),
}
