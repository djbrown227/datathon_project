// Create a simple graph
const graph = {
    nodes: [
      { id: "bus1", label: "BX19 Bus", x: 0, y: 0, size: 10, color: "#1f77b4" },
      { id: "sub1", label: "149th St–Grand Concourse", x: 2, y: 1, size: 12, color: "#ff7f0e" },
      { id: "sub2", label: "125th St", x: 4, y: 0, size: 12, color: "#ff7f0e" }
    ],
    edges: [
      { id: "e1", source: "bus1", target: "sub1", color: "#2ca02c", size: 2 },
      { id: "e2", source: "sub1", target: "sub2", color: "#2ca02c", size: 2 }
    ]
  };
  
  // Initialize Sigma
  const container = document.getElementById("sigma-container");
  const renderer = new sigma({ graph, container });
  