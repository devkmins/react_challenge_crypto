const BASE_URL = "https://api.coinpaprika.com/v1";

export interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

export function fetchCoins() {
  return fetch(`${BASE_URL}/coins`).then((response) => response.json());
}

export function fetchCoinInfo(coinId: string) {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((response) =>
    response.json()
  );
}

export function fetchCoinTickers(coinId: string) {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then((response) =>
    response.json()
  );
}

export async function fetchCoinHistory(coinId: string) {
  const response = await fetch(
    `https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`
  );
  const data: IHistorical[] = await response.json();

  return data.map((item) => ({
    time: Number(new Date(item.time_close * 1000)),
    open: Number(item.open),
    high: Number(item.high),
    low: Number(item.low),
    close: Number(item.close),
  }));
}

export async function fetchCoinPrice(coinId: string) {
  const response = await fetch(
    `https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`
  );
  const data: IHistorical[] = await response.json();

  return data.map((item) => ({
    high: Number(item.high),
    low: Number(item.low),
    time: String(new Date(item.time_close * 1000)),
  }));
}
