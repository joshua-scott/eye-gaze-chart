import React from "react";
import { LineData, CoordinatesArray } from "../types";
import { ROWS, COLUMNS } from "../constants";

interface Props {
  coordinates: CoordinatesArray;
}

// todo: make this render a table with colour gradient based on the frequency
const HeatmapGrid: React.FC<Props> = ({ coordinates }) => {
  return (
    <div>
      <p>HeatmapGrid</p>
      {coordinates.map(coordinateString => (
        <p>{coordinateString}</p>
      ))}
    </div>
  );
};

export default HeatmapGrid;
