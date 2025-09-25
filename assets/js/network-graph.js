import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6/+esm";

// --- Nodes ---
const nodes = [
  {id: "bus1", label: "BX19 Bus", x: 0, y: 0},
  {id: "subway1", label: "149th St–Grand Concourse", x: 4, y: 0},
  {id: "subway2", label: "125th St", x: 8, y: -2},
  {id: "subway3", label: "Times Sq–42nd St", x: 12, y: 4},
  {id: "subway4", label: "Fulton St", x: 16, y: 0},
  {id: "bus2", label: "M15 Bus", x: 20, y: 0}
];

// --- Edges ---
const edges = [
  {source: "bus1", target: "subway1", value: 3},
  {source: "subway1", target: "subway2", value: 4},
  {source: "subway1", target: "subway3", value: 5},
  {source: "subway2", target: "subway4", value: 2},
  {source: "subway3", target: "subway4", value: 6},
  {source: "subway4", target: "bus2", value: 3},

  // Reverse edges for bidirectional flow
  {source: "subway2", target: "subway1", value: 2},
  {source: "subway3", target: "subway1", value: 2},
  {source: "subway4", target: "subway2", value: 2},
  {source: "subway4", target: "subway3", value: 2}
];

// --- Lookup for node positions ---
const pos = Object.fromEntries(nodes.map(n => [n.id, [n.x, n.y]]));

// --- Build the chart ---
const chart = Plot.plot({
  inset: 80,
  aspectRatio: 3, // wide horizontal layout
  axis: null,
  marks: [
    // Edges (arrows)
    Plot.arrow(
      edges.map(e => [pos[e.source], pos[e.target], e.value]),
      {
        x1: d => d[0][0],
        y1: d => d[0][1],
        x2: d => d[1][0],
        y2: d => d[1][1],
        bend: 0.2, // less bend
        strokeWidth: d => d[2],
        stroke: "#ff7f0e",
        headLength: 18,
        inset: 40
      }
    ),

    // Nodes
    Plot.dot(nodes, {
      x: "x",
      y: "y",
      r: 20,
      fill: "#1f77b4",
      stroke: "#333",
      strokeWidth: 1.5
    }),

    // Node labels
    Plot.text(nodes, {
      x: "x",
      y: "y",
      text: "label",
      dy: -35,
      fill: "#111",
      fontSize: 16
    }),

    // Edge labels (weights)
    Plot.text(
      edges.map(e => {
        const [x1, y1] = pos[e.source];
        const [x2, y2] = pos[e.target];
        return {
          x: (x1 + x2) / 2,
          y: (y1 + y2) / 2 - 0.5,
          value: e.value
        };
      }),
      {
        x: "x",
        y: "y",
        text: "value",
        fill: "#d62728",
        fontSize: 14
      }
    )
  ]
});

// Render into the page
document.getElementById("chart").appendChild(chart);

// --- CSS for better text ---
const style = document.createElement("style");
style.textContent = `
  text {
    font-family: sans-serif;
    font-size: 14px;
    text-anchor: middle;
  }
`;
document.head.appendChild(style);
