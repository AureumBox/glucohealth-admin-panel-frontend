import { useCallback, useEffect, useState } from "react";

// material-ui
import { Grid } from "@mui/material";

// project imports
import EarningCard from "./EarningCard";
import PopularCard from "./PopularCard";
import TotalOrderLineChartCard from "./TotalOrderLineChartCard";
import TotalIncomeDarkCard from "./TotalIncomeDarkCard";
import TotalIncomeLightCard from "./TotalIncomeLightCard";
import TotalGrowthBarChart from "./TotalGrowthBarChart";
import { gridSpacing } from "store/constant";
import getIntervalProfits from "services/profits/get-interval-profits";
import getCurrentMonthProfits from "services/profits/get-current-month-profits";
import getTodayProfits from "services/profits/get-today-profits";

const INITIAL_DATE = new Date("2000-01-01");
const FINAL_DATE = new Date("2099-01-01");

const INITIAL_PROFITS_DATA_STATE = {
  profits: 0,
  numberOfPaidOrders: 0,
  bestSellingServices: [],
};

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);

  const [totalProfits, setTotalProfits] = useState(INITIAL_PROFITS_DATA_STATE);
  const [currentMonthProfits, setCurrentMonthProfits] = useState(
    INITIAL_PROFITS_DATA_STATE
  );
  const [todayProfits, setTodayProfits] = useState(INITIAL_PROFITS_DATA_STATE);

  const fetchProfits = useCallback(async () => {
    try {
      setLoading(true);

      const [totalProfits, currentMonthProfits, todayProfits] =
        await Promise.all([
          getIntervalProfits(INITIAL_DATE, FINAL_DATE),
          getCurrentMonthProfits(),
          getTodayProfits(),
        ]);

      setTotalProfits(totalProfits);
      setCurrentMonthProfits(currentMonthProfits);
      setTodayProfits(todayProfits);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfits();
  }, [fetchProfits]);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <EarningCard
              isLoading={isLoading}
              label="Ganancias totales"
              amount={totalProfits.profits}
            />
          </Grid>
          <Grid item lg={4} md={12} sm={12} xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item sm={6} xs={12} md={6} lg={12}>
                <TotalIncomeDarkCard
                  isLoading={isLoading}
                  label="Cantidad de órdenes de hoy"
                  amount={todayProfits.numberOfPaidOrders}
                />
              </Grid>
              <Grid item sm={6} xs={12} md={6} lg={12}>
                <TotalIncomeLightCard
                  isLoading={isLoading}
                  label="Cantidad de órdenes de este mes"
                  amount={currentMonthProfits.numberOfPaidOrders}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          {/* <Grid item xs={12} md={8}>
            <TotalGrowthBarChart isLoading={isLoading} />
          </Grid> */}
          <Grid item xs={12} md={4}>
            <PopularCard
              isLoading={isLoading}
              services={totalProfits.bestSellingServices}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
