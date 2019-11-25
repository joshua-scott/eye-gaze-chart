import React from "react";
import "./App.css";
import getData from "./helpers/getData";
import RawDataTable from "./components/RawDataTable";
import HeatmapGrid from "./components/HeatmapGrid";

const App: React.FC = () => {
  const { lineData, dataByParticipant } = getData();
  console.log({
    lineData,
    dataByParticipant
  });

  // todo: add participantName to lineData, then remove coordinatesData

  return (
    <div className="App">
      <main>
        {/* Grid of all coordinates, where the transparency varies on frequency (each one's transparency is a function of the % of total grid views) */}
        <HeatmapGrid data={lineData} />

        <RawDataTable lineData={lineData} />
      </main>
    </div>
  );
};

export default App;
