import React from "react";
import "./App.css";
import getData from "./helpers/getData";
import RawDataTable from "./components/RawDataTable";
import HeatmapGrid from "./components/HeatmapGrid";

const App: React.FC = () => {
  const {
    lineData,
    coordinateData,
    coordinateDataByParticipant,
    everyCoordinateString
  } = getData();
  console.log({
    lineData,
    coordinateData,
    coordinateDataByParticipant,
    everyCoordinateString
  });

  debugger;

  return (
    <div className="App">
      <main>
        {/* Grid of all coordinates, where the transparency varies on frequency (each one's transparency is a function of the % of total grid views) */}
        <HeatmapGrid data={coordinateData} />

        <RawDataTable lineData={lineData} />
      </main>
    </div>
  );
};

export default App;
