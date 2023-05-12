import { useQuery } from "react-query";
import { fetchCoinHistory, IHistorical } from "../api";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "./atoms";
import { useOutletContext } from "react-router-dom";

interface ChartProps {
  coinId: string;
}

interface ICoinData {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
}

function Chart() {
  const { coinId } = useOutletContext<ChartProps>();

  const isDark = useRecoilValue(isDarkAtom);

  const { isLoading, data } = useQuery<ICoinData[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );

  const coinData = data?.map((item) => {
    return [item.time, item.open, item.high, item.low, item.close];
  });

  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              name: "Price",
              data: coinData ?? [],
            },
          ]}
          options={{
            theme: {
              mode: isDark ? "dark" : "light",
            },
            chart: {
              height: 300,
              width: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            grid: { show: false },
            xaxis: {
              axisBorder: { show: false },
              axisTicks: { show: false },
              labels: { show: false },
              type: "datetime",
            },
            yaxis: {
              show: false,
            },
            plotOptions: {
              candlestick: {
                colors: {
                  upward: "#1dd1a1",
                  downward: "#54a0ff",
                },
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
