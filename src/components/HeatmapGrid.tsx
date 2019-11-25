import React from "react";
import { LineData } from "../types";

interface Props {
  data: LineData;
}

const HeatmapGrid: React.FC<Props> = ({ data }) => {
  return (
    <div>
      <p>HeatmapGrid</p>
      <p>{data.toString()}</p>
    </div>
  );
};

export default HeatmapGrid;
