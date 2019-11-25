import React from "react";
import { LineData, CoordinatesArray } from "../types";
import { ROWS, COLUMNS } from "../constants";

interface Props {
  data: CoordinatesArray;
}

// todo: make this render a table with colour gradient based on the frequency
const HeatmapGrid: React.FC<Props> = ({ data }) => {
  return (
    <div>
      <p>HeatmapGrid</p>
      {data.map(string => (
        <p>{string}</p>
      ))}
    </div>
  );
};

export default HeatmapGrid;
