import React from "react";
import "./App.css";
import { data as dataString } from "./data";

// interface LineData {
//   lineNumber: number;
//   lineString: string;
//   coordinatesString: string;
// }

const getData = () => {
  const data = dataString.split("\n").map((lineString, lineNumber) => {
    const lineObjects = lineString
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
        lineNumber: lineNumber || null,
        lineString: lineString || null,
        coordinatesString: coordinatesString || null
        // coordinatesArray: coordinatesString.split("-").map(coordsString => {
        //   // str could be like: `B1` or `BC1` or `B15` or `BC15`;
        //   const rows = coordsString
        //     .split("")
        //     // .filter(character => /([A-F])/gi.test(character))
        //     .filter(
        //       character =>
        //         true || ["A", "B", "C", "D", "E", "F"].includes(character)
        //     );

        //   const columns = parseInt(
        //     coordsString
        //       .split("")
        //       // .filter(character => /([1-6])/gi.test(character))
        //       .filter(
        //         character =>
        //           true || ["1", "2", "3", "4", "5", "6"].includes(character)
        //       )
        //       .toString()
        //   );
        //   return [rows, columns];
        // })
      }));
    return lineObjects.filter(
      el =>
        el.lineNumber !== null &&
        el.lineString !== null &&
        el.coordinatesString !== null
    );
  });

  return data.flat();
};

const App: React.FC = () => {
  const lines = getData();

  console.log(lines);

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
            {lines.map(line => {
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
