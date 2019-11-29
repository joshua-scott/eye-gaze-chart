import React from "react";
import "./App.css";
import styled from "styled-components";
import getData from "./helpers/getData";
import HeatmapGrid from "./components/HeatmapGrid";
import RawDataTable from "./components/RawDataTable";
import { ParticipantNameOrAll } from "./types";

const Main = styled.main``;

const Section = styled.section`
  margin: 20px;
  padding: 20px;
  border: 1px dotted #222;
`;

const App: React.FC = () => {
  const { lineData, dataByParticipant } = getData();
  console.log({
    lineData,
    dataByParticipant
  });

  return (
    <div className="App">
      <Main>
        {["p1", "p2", "p3", "p4", "all"].map(
          (participantName: ParticipantNameOrAll) => (
            <Section key={participantName}>
              <h2>{participantName}:</h2>
              <HeatmapGrid
                coordinates={dataByParticipant[participantName]}
                participantName={participantName}
              />
            </Section>
          )
        )}

        <div style={{ margin: "50px" }} />

        <RawDataTable lineData={lineData} />
      </Main>
    </div>
  );
};

export default App;
