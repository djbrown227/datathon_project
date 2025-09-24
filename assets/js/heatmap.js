import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6/+esm";
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

async function drawAvgSpeedHeatmap() {
  const data = await d3.csv("data/processed/heatmap.csv", d3.autoType);

  const dayOrder = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
  data.forEach(d => { d.DayIndex = dayOrder.indexOf(d["Day of Week"]); });
  data.sort((a,b) => a.DayIndex - b.DayIndex || a["Hour of Day"] - b["Hour of Day"]);

  document.body.style.fontFamily = "Inter, system-ui, sans-serif";

  const plot = Plot.plot({
    width: 900,
    height: 500,
    marginLeft: 120,
    marginBottom: 100,
    marginTop: 50,
    style: { background: "#fff" },
    color: {
      type: "linear",
      scheme: "YlOrRd",
      domain: d3.extent(data, d => d.avg_speed),
      label: "Average Speed (mph)",
      legend: true
    },
    y: {
        domain: dayOrder 
    },
    marks: [
      Plot.rect(data, {
        x: "Hour of Day",
        y: "Day of Week",
        fill: "avg_speed",
        title: d => `Avg speed: ${d.avg_speed.toFixed(2)} mph`
      }),
      // Explicit axes
      Plot.axisX({
        scale: "x",
        label: "Hour of Day",
        fontSize: 14,
        labelFont: "Helvetica",
        labelFontSize: 16
      }),
      Plot.axisY({
        scale: "y",
        label: "Day of Week",
        fontSize: 14,
        labelFont: "Helvetica",
        labelFontSize: 16
      })
    ],
    marginRight: 140  // space for legend
  });

  document.getElementById("avg-speed-heatmap").appendChild(plot);
}

drawAvgSpeedHeatmap();
