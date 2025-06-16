// src/components/TopStatusPanel.jsx
import React from "react";
export default ({ coins, boughtEnergy, level }) => {
  return (
    <div
      style={{
        background: "rgba(255, 255, 255, 0.1)",
        borderRadius: "1rem",
        padding: "1rem 2rem",
        backdropFilter: "blur(10px)",
        boxShadow: "0 0 20px rgba(0,0,0,0.3)",
        margin: "-1rem auto", // biroz pastga joylashadi
        color: "white",
        fontFamily: "Arial, sans-serif",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        maxWidth: "400px",
        width: "100%",
        // 📱 Mobilga moslashuv
        flexDirection: window.innerWidth < 600 ? "" : "row",
        gap: window.innerWidth < 600 ? "1rem" : "0", // mobilda oraliq
      }}
    >
      <StatusItem title="💰 Coin" value={coins} />
      <StatusItem title="⚡ Bought" value={boughtEnergy} />
      <StatusItem title="🧬 Level" value={level} />
    </div>
  );
};

// 🔄 Har bir status uchun alohida komponent
function StatusItem({ title, value }) {
  return (
    <div style={{ textAlign: "center" }}>
      <h4 style={{ margin: 0, color: "#facc15" }}>{title}</h4>
      <p style={{ margin: 0, fontSize: "16px", fontWeight: "bold" }}>{value}</p>
    </div>
  );
}
