// import { createCoordinate } from "../helpers";

// const exampleData = [
//   {
//     lineNumber: 3,
//     coords: [
//       { column: "A", row: 5 },
//       { column: "B", row: 2 },
//       { column: "D", row: 4 },
//       { column: "F", row: 3 }
//     ]
//   }
// ];
// max

// max column is J, max row is 6
interface Position extends Object {
  column: string;
  row: number;
}

interface DataPoint extends Object {
  lineNumber: number;
  coords: Position[];
}

function groupCoordinates() {
  const coordinates: DataPoint[] = [];

  return coordinates;
}

export default groupCoordinates;
