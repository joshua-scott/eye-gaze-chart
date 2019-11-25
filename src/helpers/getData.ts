import { data as dataString } from "../data/data";
import { LineData, DataByParticipant } from "../types";

const ROWS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
const COLUMNS = ["1", "2", "3", "4", "5", "6"];

const getParticipantName = (lineNumber: number): "p1" | "p2" | "p3" | "p4" => {
  let participantName = null;

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
  pName: "p1" | "p2" | "p3" | "p4" | "all",
  lineData: LineData
): string[] => {
  return lineData
    .filter(({ participantName }) =>
      pName === "all" ? true : participantName === pName
    )
    .map(({ coordinatesArray }) => coordinatesArray)
    .flat(1);
};

const getData = () => {
  const lineData: LineData = dataString
    .split("\n")
    .map((lineString, lineIndex) => {
      return lineString
        .split(/(\s+)/) // separate into an array of words (split by whitespace)
        .filter(s => /([A-J])/gi.test(s) === true) // coords must contain a letter A-J, remove any that don't
        .filter(s => /([1-6])/gi.test(s) === true) // coords must contain a number, remove any that don't
        .filter(s => /\d/g.test(s) === true) // coords must contain a number, remove any that don't
        .filter(s => /Arttu|Onni|Reino|Samuli/g.test(s) === false) // remove words that contain the kids' names
        .filter(s => (s.includes("(") || s.includes(")")) === false) // remove words containing brackets
        .map(s => s.replace(/-+/g, "-")) // remove duplicate "-" characters
        .map(s => s.replace(/^-+/, "")) // remove leading "-" characters
        .map((coordinatesString: string) => {
          const lineNumber: number | null = lineIndex ? lineIndex + 1 : null;
          return {
            lineNumber,
            lineString: lineString || null,
            participantName: getParticipantName(lineNumber),
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
          };
        })
        .filter(
          el =>
            el.lineNumber !== null &&
            el.lineString !== null &&
            el.coordinatesString !== null
        );
    })
    .flat();

  const dataByParticipant: DataByParticipant = {
    p1: [...getCoordsArrayByParticipant("p1", lineData)],
    p2: [...getCoordsArrayByParticipant("p2", lineData)],
    p3: [...getCoordsArrayByParticipant("p3", lineData)],
    p4: [...getCoordsArrayByParticipant("p4", lineData)],
    all: [...getCoordsArrayByParticipant("all", lineData)]
  };

  return {
    lineData,
    dataByParticipant
  };
};

export default getData;
