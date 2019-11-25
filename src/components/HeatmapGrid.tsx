import React from "react";
import { CoordinatesArray } from "../types";
import { ROWS, COLUMNS } from "../constants";

interface Props {
  coordinates: CoordinatesArray;
}

// todo: make this render a table with colour gradient based on the frequency
const HeatmapGrid: React.FC<Props> = ({ coordinates }) => {
  let coordinatesCount = {};
  ROWS.forEach(row => {
    COLUMNS.forEach(column => {
      const coords = `${row}${column}`;
      coordinatesCount[coords] = coordinates.filter(c => c === coords).length;
    });
  });

  console.log({ coordinatesCount });

  return (
    <div>
      <div>
        {ROWS.map(row =>
          COLUMNS.map(column => (
            <div>{coordinatesCount[`${row}${column}`]}</div>
          ))
        )}
      </div>

      {/* {coordinates.map(coordinateString => (
        <p>{coordinateString}</p>
      ))} */}
    </div>
  );
};

export default HeatmapGrid;
