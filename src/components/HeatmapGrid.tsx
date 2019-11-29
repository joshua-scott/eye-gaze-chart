import React from "react";
import styled from "styled-components";
import { CoordinatesArray, ParticipantNameOrAll } from "../types";
import { ROWS, COLUMNS } from "../constants";

interface Props {
  coordinates: CoordinatesArray;
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 100px);
  grid-template-rows: repeat(6, 100px);
  border-bottom: 2px solid black;
`;

const GridItem = styled.div`
  background-color: rgba(0, 95, 106, ${p => p.transparency});
  color: ${p => (p.transparency < 0.5 ? "black" : "white")};
`;

const HeatmapGrid: React.FC<Props> = ({ coordinates }) => {
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

  return (
    <div>
      <Grid>
        {ROWS.map(row =>
          COLUMNS.map(column => {
            const count = parseInt(coordinatesCount[`${column}${row}`]);
            const percentageOfMax = (count / max) * 100;
            return (
              <GridItem transparency={Math.max(percentageOfMax, 1) / 100}>
                {column}
                {row}:<strong>{count}</strong>
                <br />
                {`(${percentageOfMax.toFixed(1)}% of max)`}
              </GridItem>
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
