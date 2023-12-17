import { proxy, useSnapshot } from "valtio";
import { tg } from "../telegram";
import decodeUserData from "../helpers/decode";

const state = proxy({
  userData: decodeUserData(tg.initData),
  lots: [
    {
      id: 2391,
      bets_id: [
        {
          id: 1,
          amount: 100,
          comment: "This is the first bet for shipment 1",
          user_id: 1,
          created_at: "2023-12-08T00:00:00.000Z",
        },
        {
          id: 2,
          amount: 200,
          comment: "This is the second bet for shipment 1",
          user_id: 2,
          created_at: "2023-12-08T00:00:00.000Z",
        },
      ],
      parameters_id: {
        departure: "Moscow",
        destination: "St. Petersburg",
        volume: 10,
        weight: 20,
        is_danger: false,
        description: "This is a test shipment",
        conditions: "Standard",
        delivery_time: 24,
        initial_bet: 100,
        currency: "USD",
      },
      start_date: "2023-12-08T00:00:00.000Z",
      finish_date: "2023-12-10T00:00:00.000Z",
      last_bet_id: {
        id: 2,
        amount: 200000,
        comment: "This is the second bet for shipment 1",
        user_id: 2,
        created_at: "2023-12-08T00:00:00.000Z",
      },
      created_at: "2023-12-08T00:00:00.000Z",
      created_by: 1,
    },
    {
      id: 8923,
      bets_id: [
        {
          id: 3,
          amount: 300,
          comment: "This is the first bet for shipment 2",
          user_id: 3,
          created_at: "2023-12-09T00:00:00.000Z",
        },
      ],
      parameters_id: {
        departure: "London",
        destination: "Paris",
        volume: 5,
        weight: 10,
        is_danger: true,
        description: "This is an urgent delivery with hazardous materials",
        conditions: "Express",
        delivery_time: 12,
        initial_bet: 50,
        currency: "EUR",
      },
      start_date: "2023-12-09T00:00:00.000Z",
      finish_date: "2023-12-11T00:00:00.000Z",
      last_bet_id: {
        id: 3,
        amount: 300,
        comment: "This is the first bet for shipment 2",
        user_id: 3,
        created_at: "2023-12-09T00:00:00.000Z",
      },
      created_at: "2023-12-09T00:00:00.000Z",
      created_by: 2,
    },
    {
      id: 4854,
      bets_id: [
        {
          id: 1,
          amount: 100,
          comment: "This is the first bet for shipment 1",
          user_id: 1,
          created_at: "2023-12-08T00:00:00.000Z",
        },
        {
          id: 2,
          amount: 200,
          comment: "This is the second bet for shipment 1",
          user_id: 2,
          created_at: "2023-12-08T00:00:00.000Z",
        },
      ],
      parameters_id: {
        departure: "Moscow",
        destination: "St. Petersburg",
        volume: 10,
        weight: 20,
        is_danger: false,
        description: "This is a test shipment",
        conditions: "Standard",
        delivery_time: 24,
        initial_bet: 100,
        currency: "USD",
      },
      start_date: "2023-12-08T00:00:00.000Z",
      finish_date: "2023-12-10T00:00:00.000Z",
      last_bet_id: {
        id: 2,
        amount: 200,
        comment: "This is the second bet for shipment 1",
        user_id: 2,
        created_at: "2023-12-08T00:00:00.000Z",
      },
      created_at: "2023-12-08T00:00:00.000Z",
      created_by: 1,
    },
  ],
  soldLots: [],
  currentPage: 'ActiveLots',
  currentLot: undefined,
});

export default state;
