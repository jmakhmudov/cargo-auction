import ActiveLots from "./ActiveLots";
import SoldLots from "./SoldLots";

const activeLotsPage = () => (<ActiveLots />)

const soldLotsPage = () => (<SoldLots />)

export const pages = {
  'ActiveLots': activeLotsPage(),
  'SoldLots': soldLotsPage(),
}
