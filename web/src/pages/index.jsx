import Lots from "./Lots";
import SoldLots from "./SoldLots";

const lotsPage = () => (<Lots />)

const soldLotsPage = () => (<SoldLots />)

export const pages = {
  'Lots': lotsPage(),
  'SoldLots': soldLotsPage(),
}
