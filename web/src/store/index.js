import { proxy, useSnapshot } from "valtio";
import { tg } from "../telegram";
import decodeUserData from "../helpers/decode";

const state = proxy({
  tgUser: { id: 1987495312 }, //decodeUserData(tg.initData)
  userData: {},
  currentPage: 'ActiveLots',
  currentLot: undefined,
});

export default state;
