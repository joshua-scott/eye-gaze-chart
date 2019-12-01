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
  return (
    <div className="App">
      <Main>
        {[
          "p1",
          "p1Target",
          "p2",
          "p2Target",
          "p3",
          "p3Target",
          "p4",
          "p4Target",
          "all",
          "allTarget"
        ].map((participantName: ParticipantNameOrAll) => (
          <Section key={participantName}>
            <h2>{participantName}:</h2>
            <HeatmapGrid
              coordinates={dataByParticipant[participantName]}
              participantName={participantName}
              color={participantName.endsWith("Target") ? "alt" : "default"}
            />
          </Section>
        ))}

        <div style={{ margin: "50px" }} />

        <RawDataTable lineData={lineData} />
      </Main>
    </div>
  );
};

export default App;
