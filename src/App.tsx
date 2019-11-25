import React from "react";
import "./App.css";
import getData from "./helpers/getData";
import HeatmapGrid from "./components/HeatmapGrid";
import { ParticipantNameOrAll } from "./types";

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
          (participantName: ParticipantNameOrAll) => (
            <>
              <h2>{participantName}:</h2>
              <HeatmapGrid
                coordinates={dataByParticipant[participantName]}
                key={participantName}
              />
            </>
          )
        )}

        {/* <RawDataTable lineData={lineData} /> */}
      </main>
    </div>
  );
};

export default App;
