import React from "react";
import "./App.css";
import getData from "./helpers/getData";
import RawDataTable from "./components/RawDataTable";
import HeatmapGrid from "./components/HeatmapGrid";
import { LineData, DataByParticipant, ParticipantNameOrAll } from "./types";

const App: React.FC = () => {
  const { lineData, dataByParticipant } = getData();
  console.log({
    lineData,
    dataByParticipant
  });

  return (
    <div className="App">
      <main>
        {/* Grid of all coordinates, where the transparency varies on frequency (each one's transparency is a function of the % of total grid views) */}
        {["p1", "p2", "p3", "p4", "all"].map(
          (participant: ParticipantNameOrAll) => (
            <HeatmapGrid
              data={dataByParticipant[participant]}
              key={participant}
            />
          )
        )}

        <RawDataTable lineData={lineData} />
      </main>
    </div>
  );
};

export default App;
