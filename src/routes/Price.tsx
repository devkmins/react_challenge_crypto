import { useQuery } from "react-query";
import { fetchCoinPrice } from "../api";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "./atoms";
import { useOutletContext } from "react-router-dom";

interface ChartProps {
  coinId: string;
}

function Price() {
  const { coinId } = useOutletContext<ChartProps>();

  const isDark = useRecoilValue(isDarkAtom);

  const { isLoading, data } = useQuery<
    { high: number; low: number; time: string }[]
  >(["ohlcv", coinId], () => fetchCoinPrice(coinId));

  const highPrice = data?.map((price) => price.high);
  const lowPrice = data?.map((price) => price.low);

  return (
    <div>
      {isLoading ? (
        "Loading price..."
      ) : (
        <ApexChart
          type="area"
          series={[
            {
              name: "High Price",
              data: highPrice ?? [],
            },
            {
              name: "Low Price",
              data: lowPrice ?? [],
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
            dataLabels: {
              enabled: false,
            },
            grid: { show: false },
            stroke: {
              curve: "smooth",
              width: 1,
            },
            xaxis: {
              axisBorder: { show: false },
              axisTicks: { show: false },
              labels: { show: false },
              type: "datetime",
              categories: data?.map((date) => date.time),
            },
            yaxis: {
              show: false,
            },
          }}
        />
      )}
    </div>
  );
}

export default Price;
