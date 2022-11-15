import { Chart as ChartComponent } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Legend,
  CategoryScale,
  Tooltip,
} from "chart.js";

import { useTheme } from "@material-ui/core";
import { useState, useEffect } from "react";

import { useRecoilValue } from "recoil";

import * as state from "../state";

ChartJS.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Legend,
  Title,
  CategoryScale,
  Tooltip
);

export const CHART_COLORS = {
  blue: "rgb(54, 162, 235)",
  red: "rgb(255, 99, 132)",
  orange: "rgb(255, 159, 64)",
  yellow: "rgb(255, 205, 86)",
  green: "rgb(75, 192, 192)",
  purple: "rgb(153, 102, 255)",
  grey: "rgb(201, 203, 207)",
  black: "rgb(0, 0, 0)",
};

export default function Chart() {
  const sample = useRecoilValue(state.sample);
  const [options, setOptions] = useState([]);

  let theme = useTheme();
  let [data, setData] = useState({ datasets: [] });
  let [first, setFirst] = useState(true);

  let className = "diceyChart";

  useEffect(() => {
    let labels = {};
    for (let s of sample) for (let o of s.entries) labels[o.name] = true;
    labels = Object.keys(labels);
    labels.sort((a, b) => parseFloat(a) - parseFloat(b));
    const data = {
      labels: labels,
      datasets: sample.map((s, i) => {
        let c =
          sample.length === 1
            ? theme.palette.text.primary
            : Object.values(CHART_COLORS)[i];

        return {
          id: `data${i}`,
          //label: s.name,
          label: s.nameIsValue || s.named ? s.name : `output ${i + 1}`,
          parsing: false,
          data: labels.map((x) => {
            // eslint-disable-next-line eqeqeq
            let v = s.entries.find((w) => w.name == x);
            if (v) return { x: x, y: v.uv };
            return { x: x, y: null };
          }),
          fill: false,
          backgroundColor: c,
          borderColor: c,
        };
      }),
    };

    const previousY = (ctx) => {
      if (ctx.index === 0) return ctx.chart.scales.y.getPixelForValue(100);

      let meta = ctx.chart.getDatasetMeta(ctx.datasetIndex);

      if (!meta.data[ctx.index - 1])
        return ctx.chart.scales.y.getPixelForValue(100);

      return meta.data[ctx.index - 1].getProps(["y"], true).y;
    };

    const delayBetweenPoints = 500 / labels.length;
    const animation = {
      x: {
        type: "number",
        easing: "linear",
        duration: delayBetweenPoints,
        from: NaN, // the point is initially skipped
        delay(ctx) {
          if (ctx.type !== "data" || ctx.xStarted) {
            return 0;
          }
          ctx.xStarted = true;
          return ctx.index * delayBetweenPoints;
        },
      },
      y: {
        type: "number",
        easing: "linear",
        duration: delayBetweenPoints,
        from: previousY,
        delay(ctx) {
          if (ctx.type !== "data" || ctx.yStarted) {
            return 0;
          }
          ctx.yStarted = true;
          return ctx.index * delayBetweenPoints;
        },
      },
    };

    setData(data);

    const options = {
      animation: first ? animation : undefined,
      //responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          min: 0,
          ticks: {
            color: theme.palette.text.secondary,
            beginAtZero: true,
            callback: function (val) {
              return this.getLabelForValue(val) + "%";
            },
          },
          title: { text: "Chance", display: false },
        },
        x: {
          ticks: { beginAtZero: true, color: theme.palette.text.secondary },
        },
      },
      plugins: {
        legend: {
          position: "bottom",
          labels: { color: theme.palette.text.secondary },
        },
      },
      interaction: {
        intersect: false,
        mode: "index",
      },
    };

    setOptions(options);
    setFirst(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sample, theme]);

  return (
    <ChartComponent
      type="line"
      options={options}
      data={data}
      className={className}
    />
  );
}
