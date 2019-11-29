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

  ${props => css`border-${props.border}: 2px solid rgb(0, 95, 106);`}

  ${props =>
    props.border &&
    css`
      background-color: rgba(0, 95, 106, 0.1);
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

  console.log({ coordinatesCount });

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
        <GridItem transparency={0} />
        {COLUMNS.map(column => (
          <GridItem transparency={0} border="bottom">
            {column}
          </GridItem>
        ))}
        {ROWS.map(row =>
          COLUMNS.map(column => {
            const coords = `${column}${row}`;
            const count = parseInt(coordinatesCount[coords]);
            const percentageOfMax = (count / max) * 100;
            const percentageOfTotal = (count / total) * 100;
            return (
              <>
                {column === "A" && (
                  <GridItem transparency={0} border="right">
                    {row}
                  </GridItem>
                )}
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
