import React from "react";
import styled, { css } from "styled-components";
import { CoordinatesArray, ParticipantNameOrAll } from "../types";
import { ROWS, COLUMNS } from "../constants";

interface Props {
  coordinates: CoordinatesArray;
  participantName: string;
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(11, 100px);
  grid-template-rows: repeat(7, 100px);
  border-bottom: 2px solid black;
`;

const GridItem = styled.div`
  background-color: rgba(0, 95, 106, ${p => p.transparency});
  color: ${p => (p.transparency < 0.5 ? "black" : "white")};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const LabelItem = styled(GridItem)`
  ${p =>
    !p.whiteBackground &&
    css`
      background-color: rgba(0, 95, 106, 1);
    `}
`;

const HeatmapGrid: React.FC<Props> = ({ coordinates, participantName }) => {
  let coordinatesCount = {};
  ROWS.forEach(row => {
    COLUMNS.forEach(column => {
      const coords = `${column}${row}`;
      coordinatesCount[coords] = coordinates.filter(c => c === coords).length;
    });
  });

  const max = Object.keys(coordinatesCount).reduce(
    (previousValue, coordString) => {
      return Math.max(coordinatesCount[coordString] || 0, previousValue || 0);
    },
    0
  );

  const total = Object.keys(coordinatesCount).reduce(
    (previousValue, coordString) => {
      return previousValue + coordinatesCount[coordString];
    },
    0
  );

  return (
    <div className={participantName}>
      <Grid>
        <LabelItem whiteBackground={true} />
        {COLUMNS.map(column => (
          <LabelItem>{column}</LabelItem>
        ))}
        {ROWS.map(row =>
          COLUMNS.map(column => {
            const coords = `${column}${row}`;
            const count = parseInt(coordinatesCount[coords]);
            const percentageOfMax = (count / max) * 100;
            const percentageOfTotal = (count / total) * 100;
            return (
              <>
                {column === "A" && <LabelItem>{row}</LabelItem>}
                <GridItem transparency={Math.max(percentageOfMax, 1) / 100}>
                  <strong>{count}</strong>
                  <br />
                  {`${percentageOfTotal.toFixed(2)}%`}
                </GridItem>
              </>
            );
          })
        )}
      </Grid>

      {/* {coordinates.map(coordinateString => (
        <p>{coordinateString}</p>
      ))} */}
    </div>
  );
};

export default HeatmapGrid;
