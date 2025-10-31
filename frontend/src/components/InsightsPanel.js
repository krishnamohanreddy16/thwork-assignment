import React, { useEffect, useState } from "react";

function InsightsPanel() {
  const [insight, setInsight] = useState("Loading insights...");

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const res = await fetch("http://localhost:3000/insights");
        if (!res.ok) throw new Error("Failed to fetch insights");
        const data = await res.json();
        setInsight(data.summary || "No insights available.");
      } catch (error) {
        setInsight("Error loading insights.");
      }
    };
    fetchInsights();
  }, []);

  return (
    <div className="insights-panel">
      <h2>Smart Insights</h2>
      <p>{insight}</p>
    </div>
  );
}

export default InsightsPanel;
