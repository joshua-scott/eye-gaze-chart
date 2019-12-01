import React, { Fragment } from "react";
import styled, { css } from "styled-components";
import { CoordinatesArray } from "../types";
import { ROWS, COLUMNS, RED, GREEN } from "../constants";

interface Props {
  coordinates: CoordinatesArray;
  participantName: string;
  color: "default" | "alt";
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(11, 80px);
  grid-template-rows: repeat(7, 80px);
  margin: 20px;
`;

const GridItem = styled.div`
  color: ${props => (props.transparency < 0.5 ? "black" : "white")};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  border: 1px solid black;
  ${props =>
    props.color === "default"
      ? css`
          background-color: rgba(0, 95, 106, ${props => props.transparency});
        `
      : props.color === "alt"
      ? css`
          background-color: rgba(95, 2, 31, ${props => props.transparency});
        `
      : css``}
`;

const LabelItem = styled(GridItem)`
  ${props =>
    props.color === "default"
      ? css`
          background-color: ${GREEN};
        `
      : props.color === "alt"
      ? css`
          background-color: ${RED};
        `
      : props.whiteBackground &&
        css`
          background: white;
        `}
  border: none;
`;

const HeatmapGrid: React.FC<Props> = ({
  coordinates,
  participantName,
  color
}) => {
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
    <div className={participantName} key={`${participantName}-heatmapgrid`}>
      <Grid>
        <LabelItem whiteBackground={true} />
        {COLUMNS.map(column => (
          <LabelItem key={column} color={color}>
            {column}
          </LabelItem>
        ))}
        {ROWS.map(row =>
          COLUMNS.map(column => {
            const coords = `${column}${row}`;
            const count = parseInt(coordinatesCount[coords]);
            const percentageOfMax = (count / max) * 100;
            const percentageOfTotal = (count / total) * 100;
            return (
              <Fragment key={coords}>
                {column === "A" && <LabelItem color={color}>{row}</LabelItem>}
                <GridItem
                  color={color}
                  transparency={Math.max(percentageOfMax, 1) / 100}
                >
                  <strong>{count}</strong>
                  <br />
                  {`${percentageOfTotal.toFixed(2)}%`}
                </GridItem>
              </Fragment>
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
