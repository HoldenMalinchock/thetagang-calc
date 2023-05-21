import { Chart } from "$fresh_charts/mod.ts";
import { z } from "https://deno.land/x/zod@v3.21.4/mod.ts";
import { metadata } from "../zods/thetaGangResponseJsonSchema.ts";
import { Card } from "./Card.tsx";

type metadata = z.infer<
  typeof metadata
>;

export default function YearlyBarChart(props: { metadata: metadata }) {
  const strippedPremiums = Object.entries(props.metadata).filter((
    [element, value],
  ) => element.includes("netPremium") && element !== "netPremium");
  const labels = strippedPremiums.map((premium) => premium[0].slice(10));
  const values = strippedPremiums.map((premium) => premium[1]);
  return (
    <Card>
      <Chart
        type="bar"
        width={500}
        height={200}
        data={{
          labels: labels,
          datasets: [{
            label: "Yearly Profits",
            data: values,
            borderWidth: 1,
          }],
        }}
      />
    </Card>
  );
}
