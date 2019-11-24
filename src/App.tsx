import React from "react";
import "./App.css";
import getData from "./helpers/getData";
import RawDataTable from "./components/RawDataTable";

const tableCellStyles = {
  textAlign: "left",
  borderLeft: "2px solid #333",
  borderRight: "2px solid #333"
};

const App: React.FC = () => {
  const {
    lineData,
    coordinateData,
    coordinateDataByParticipant,
    everyString
  } = getData();
  console.log({
    lineData,
    coordinateData,
    coordinateDataByParticipant,
    everyString
  });

  return (
    <div className="App">
      <main>
        {/* Grid of all coordinates, where the transparency varies on frequency (each one's transparency is a function of the % of total grid views) */}

        <RawDataTable lineData={lineData} />
        {/* Table of data */}
        {/* <table>
          <thead>
            <tr>
              <th style={tableCellStyles}>lineNumber</th>
              <th style={tableCellStyles}>lineString</th>
              <th style={tableCellStyles}>coordinatesString</th>
              <th style={tableCellStyles}>coordinatesArray</th>
            </tr>
          </thead>
          <tbody>
            {lineData.map(line => {
              return (
                <tr key={line.lineNumber}>
                  <td style={tableCellStyles}>{line.lineNumber}</td>
                  <td style={tableCellStyles}>{line.lineString}</td>
                  <td style={tableCellStyles}>{line.coordinatesString}</td>
                  <td style={tableCellStyles}>{line.coordinatesArray}</td>
                </tr>
              );
            })}
          </tbody>
        </table> */}
      </main>
    </div>
  );
};

export default App;
