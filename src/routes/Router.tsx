import { BrowserRouter, Routes, Route } from "react-router-dom";
import Coin from "./Coin";
import Coins from "./Coins";
import Price from "./Price";
import Chart from "./Chart";

function Router() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Coins />} />
        <Route path="/:coinId" element={<Coin />}>
          <Route path="price" element={<Price />} />
          <Route path="chart" element={<Chart />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
