import React from "react";
import "./App.css";
import { data as dataString } from "./data";

// interface LineData {
//   lineNumber: number;
//   lineString: string;
//   coordinatesString: string;
// }

const ROWS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
const COLUMNS = ["1", "2", "3", "4", "5", "6"];

const getParticipantName = lineNumber => {
  let participantName = "";

  // P2: 1 - 93, P4: 94 - 215, P3: 216 - 623, P1: 624 - 796
  if (lineNumber >= 0 && lineNumber < 94) {
    participantName = "p2";
  } else if (lineNumber >= 94 && lineNumber < 216) {
    participantName = "p4";
  } else if (lineNumber >= 216 && lineNumber < 624) {
    participantName = "p3";
  } else if (lineNumber >= 624 && lineNumber < 796) {
    participantName = "p1";
  } else {
    new Error(`lineNumber: ${lineNumber} not in range.`);
  }

  return participantName;
};

const getCoordsArrayByParticipant = (
  participantName: string,
  allCoordsData: object[]
) => {
  return allCoordsData
    .filter(({ participant }) => participant === participantName)
    .map(({ coordinatesArray }) => coordinatesArray)
    .flat(1);
};

const App: React.FC = () => {
  const lineData = dataString
    .split("\n")
    .map((lineString, lineIndex) => {
      return lineString
        .split(/(\s+)/) // separate into an array of words (split by whitespace)
        .filter(s => /([A-J])/gi.test(s) === true) // coords must contain a letter A-J, remove any that don't
        .filter(s => /([1-6])/gi.test(s) === true) // coords must contain a number, remove any that don't
        .filter(s => /\d/g.test(s) === true) // coords must contain a number, remove any that don't
        .filter(s => /Arttu|Onni|Reino|Samuli/g.test(s) === false) // remove words that contain the kids' names
        .filter(s => (s.includes("(") || s.includes(")")) === false) // remove words containing brackets
        .filter(s => /\d/g.test(s) === true) // coords must contain a number, remove any that don't
        .map(s => s.replace(/-+/g, "-")) // remove duplicate "-" characters
        .map(s => s.replace(/^-+/, "")) // remove leading "-" characters
        .map(coordinatesString => ({
          lineNumber: lineIndex ? lineIndex + 1 : null,
          lineString: lineString || null,
          coordinatesString: coordinatesString || null,
          coordinatesArray: coordinatesString
            .split("-")
            .reduce((previousValue, coordsString) => {
              // coordsString could be like: `B1` or `BC1` or `B15` or `BC15`;
              const rows = coordsString
                .split("")
                .filter(character => ROWS.includes(character));

              const columns = coordsString
                .split("")
                .filter(character => COLUMNS.includes(character));

              let coordinates = [];
              rows.forEach(row => {
                columns.forEach(column => {
                  // coordinates.push({ row, column }) // if we want an object
                  coordinates.push(`${row}${column}`);
                });
              });
              return [...previousValue, ...coordinates];
            }, [])
        }))
        .filter(
          el =>
            el.lineNumber !== null &&
            el.lineString !== null &&
            el.coordinatesString !== null
        );
    })
    .flat();

  const coordinateData: [] = lineData.reduce((previousValue, currentValue) => {
    const res: object[] = [
      ...previousValue,
      {
        coordinatesArray: [...currentValue.coordinatesArray],
        lineNumber: currentValue.lineNumber,
        participant: getParticipantName(currentValue.lineNumber)
      }
    ];
    return res;
  }, []);

  const coordinateDataByParticipant = {
    p1: getCoordsArrayByParticipant("p1", coordinateData),
    p2: getCoordsArrayByParticipant("p2", coordinateData),
    p3: getCoordsArrayByParticipant("p3", coordinateData),
    p4: getCoordsArrayByParticipant("p4", coordinateData)
  };

  const everyString = [
    ...coordinateDataByParticipant.p1,
    ...coordinateDataByParticipant.p2,
    ...coordinateDataByParticipant.p3,
    ...coordinateDataByParticipant.p4
  ];

  console.log(everyString);

  return (
    <div className="App">
      <main>
        <table>
          <thead>
            <tr>
              <th>lineNumber</th>
              <th>lineString</th>
              <th>coordinatesString</th>
              {/* <th>coordinatesArray</th> */}
            </tr>
          </thead>
          <tbody>
            {lineData.map(line => {
              return (
                <tr key={line.lineNumber}>
                  <td>{line.lineNumber}</td>
                  <td>{line.lineString}</td>
                  <td>{line.coordinatesString}</td>
                  {/* <td>{line.coordinatesArray}</td> */}
                </tr>
              );
            })}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default App;
