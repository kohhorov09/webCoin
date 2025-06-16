import "./App.css";
import { Route, Routes } from "react-router-dom";
import EranPage from "./components/EranPage";
import Navbar from "./components/Navbar";
import UperGrade from "./components/UperGrade";
import { useState, useEffect } from "react";
import Ball from "./components/Ball";
import Missions from "./components/Missions";
import Accaunt from "./components/Accaunt";
import defaultSkin from "./Img/img_1.png";
import axios from "axios"; // 🔥 axios qo‘shildi

function App() {
  const [selectedSkin, setSelectedSkin] = useState(defaultSkin);
  const [coins, setCoins] = useState(
    () => parseInt(localStorage.getItem("coins")) || 0
  );
  const [clicks, setClicks] = useState(
    () => parseInt(localStorage.getItem("clicks")) || 1
  );
  const [upgradeLevel, setUpgradeLevel] = useState(
    () => parseInt(localStorage.getItem("multitapCount")) || 1
  );
  const [energy, setEnergy] = useState(
    () => parseInt(localStorage.getItem("energy")) || 500
  );
  const [boughtEnergy, setBoughtEnergy] = useState(
    () => parseInt(localStorage.getItem("energyLimitCount")) || 0
  );
  const [maxEnergy, setMaxEnergy] = useState(
    () => 500 + (parseInt(localStorage.getItem("energyLimitCount")) || 0) * 500
  );
  const [rechargeAmount, setRechargeAmount] = useState(
    () => parseInt(localStorage.getItem("rechargeCount")) || 1
  );
  const [boostX2Count, setBoostX2Count] = useState(
    () => parseInt(localStorage.getItem("boostX2Count")) || 0
  );
  const [multitapCount, setMultitapCount] = useState(
    () => parseInt(localStorage.getItem("multitapCount")) || 1
  );
  const [energyLimitCount, setEnergyLimitCount] = useState(
    () => parseInt(localStorage.getItem("energyLimitCount")) || 0
  );
  const [rechargeCount, setRechargeCount] = useState(
    () => parseInt(localStorage.getItem("rechargeCount")) || 1
  );
  const [missions, setMissions] = useState([]);
  const [tapMultiplier, setTapMultiplier] = useState(1);

  const [totalEarnedCoins, setTotalEarnedCoins] = useState(
    () => parseInt(localStorage.getItem("totalEarnedCoins")) || 0
  );

  const level = Math.floor(totalEarnedCoins / 10000) + 1;
  // ✅ Missiyalarni backenddan yuklab olish
  useEffect(() => {
    axios
      .get("http://localhost:9090/missions")
      .then((res) => setMissions(res.data))
      .catch((err) => console.error("❌ Missiyalarni yuklashda xatolik:", err));
  }, []);

  // 🔄 Mahalliy saqlash (localStorage)
  useEffect(() => {
    localStorage.setItem("coins", coins);
    localStorage.setItem("clicks", clicks);
    localStorage.setItem("energy", energy);
    localStorage.setItem("multitapCount", upgradeLevel);
    localStorage.setItem("energyLimitCount", boughtEnergy);
    localStorage.setItem("rechargeCount", rechargeAmount);
    localStorage.setItem("boostX2Count", boostX2Count);
    localStorage.setItem("multitapCount", multitapCount);
    localStorage.setItem("energyLimitCount", energyLimitCount);
    localStorage.setItem("rechargeCount", rechargeCount);
  }, [
    coins,
    clicks,
    energy,
    upgradeLevel,
    boughtEnergy,
    rechargeAmount,
    boostX2Count,
    multitapCount,
    energyLimitCount,
    rechargeCount,
  ]);

  return (
    <div
      style={{
        background:
          "linear-gradient(to bottom right, #0f0c29, #302b63, #24243e)",
        minHeight: "90vh",
      }}
    >
      <div style={{ padding: "2rem" }}>
        <Ball
          coins={coins}
          boughtEnergy={boughtEnergy}
          totalEarnedCoins={totalEarnedCoins}
          level={level}
        />
      </div>
      <div style={{ marginBottom: "70px" }}>
        <Routes>
          <Route
            path="/"
            element={
              <EranPage
                coins={coins}
                setCoins={setCoins}
                clicks={clicks}
                setClicks={setClicks}
                upgradeLevel={upgradeLevel}
                setUpgradeLevel={setUpgradeLevel}
                energy={energy}
                setEnergy={setEnergy}
                maxEnergy={maxEnergy}
                setMaxEnergy={setMaxEnergy}
                boughtEnergy={boughtEnergy}
                setBoughtEnergy={setBoughtEnergy}
                tapMultiplier={tapMultiplier}
                rechargeAmount={rechargeAmount}
                selectedSkin={selectedSkin}
              />
            }
          />
          <Route
            path="/upergrade"
            element={
              <UperGrade
                coins={coins}
                setCoins={setCoins}
                upgradeLevel={upgradeLevel}
                setUpgradeLevel={setUpgradeLevel}
                maxEnergy={maxEnergy}
                setMaxEnergy={setMaxEnergy}
                energy={energy}
                setEnergy={setEnergy}
                boughtEnergy={boughtEnergy}
                setBoughtEnergy={setBoughtEnergy}
                setTapMultiplier={setTapMultiplier}
                rechargeAmount={rechargeAmount}
                setRechargeAmount={setRechargeAmount}
                boostX2Count={boostX2Count}
                setBoostX2Count={setBoostX2Count}
                multitapCount={multitapCount}
                setMultitapCount={setMultitapCount}
                energyLimitCount={energyLimitCount}
                setEnergyLimitCount={setEnergyLimitCount}
                rechargeCount={rechargeCount}
                setRechargeCount={setRechargeCount}
                selectedSkin={selectedSkin}
                setSelectedSkin={setSelectedSkin}
              />
            }
          />
          <Route
            path="/missions"
            element={
              <Missions coins={coins} setCoins={setCoins} missions={missions} />
            }
          />
          <Route
            path="/accaunt"
            element={
              <Accaunt
                missions={missions}
                setMissions={setMissions}
                userEmail="sherjahonqahhorov0@gmail.com"
                coins={coins}
              />
            }
          />
        </Routes>
      </div>
      <Navbar />
    </div>
  );
}

export default App;
