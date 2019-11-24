import React from "react";

const RawDataTable: React.FC = ({ lineData }) => {
  console.log(`raw data table!`);
  console.log(lineData);
  return (
    <table>
      <thead>
        <tr>
          <th>lineNumber</th>
          <th>lineString</th>
          <th>coordinatesString</th>
          <th>coordinatesArray</th>
        </tr>
      </thead>
      <tbody>
        {lineData.map(line => {
          return (
            <tr key={line.lineNumber}>
              <td>{line.lineNumber}</td>
              <td>{line.lineString}</td>
              <td>{line.coordinatesString}</td>
              <td>{line.coordinatesArray.join(",")}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default RawDataTable;
