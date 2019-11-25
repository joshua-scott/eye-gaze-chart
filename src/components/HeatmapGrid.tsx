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
  background-color: red;
`;

// todo: make this render a table with colour gradient based on the frequency
const HeatmapGrid: React.FC<Props> = ({ coordinates }) => {
  let coordinatesCount = {};
  ROWS.forEach(row => {
    COLUMNS.forEach(column => {
      const coords = `${column}${row}`;
      coordinatesCount[coords] = coordinates.filter(c => c === coords).length;
    });
  });

  console.log({ coordinatesCount });
  // const max = Object.keys(coordinatesCount).reduce((previousValue, currentValue) => {
  //   return Math.max(coordinatesCount[currentValue], coordinatesCount[previousValue])
  // }, 0);

  const max = Math.max(
    Object.keys(coordinatesCount).map(
      (key: ParticipantNameOrAll) => coordinatesCount[key]
    )
  );

  return (
    <div>
      <Grid>
        {ROWS.map(row =>
          COLUMNS.map(column => {
            const count = parseInt(coordinatesCount[`${column}${row}`]);
            const ratingAsPercentageOfMax = (count / max) * 100;
            return (
              <GridItem ratingAsPercentageOfMax={ratingAsPercentageOfMax}>
                {column}
                {row}:<strong>{count}</strong> ( {ratingAsPercentageOfMax} )
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
