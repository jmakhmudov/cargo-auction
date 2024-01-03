import { proxy, useSnapshot } from "valtio";
import { tg } from "../telegram";
import decodeUserData from "../helpers/decode";

const state = proxy({
  tgUser: decodeUserData(tg.initData),
  userData: {},
  currentPage: 'ActiveLots',
  currentLot: undefined,
});

export default state;
