import { proxy, useSnapshot } from "valtio";
import { tg } from "../telegram";
import decodeUserData from "../helpers/decode";

const state = proxy({
  userData: decodeUserData(tg.initData),
  lots: [],
  soldLots: [],
  currentPage: 'Lots'
});

export default state;
