import { data as dataString } from "../data/data";
import {
  ParticipantName,
  ParticipantNameOrAll,
  LineData,
  DataByParticipant,
  CoordinatesArray
} from "../types";
import { ROWS, COLUMNS } from "../constants";

const getParticipantNameFromLineNumber = (
  lineNumber: number
): ParticipantName => {
  let participantName: ParticipantName = "p1";

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
  pName: ParticipantNameOrAll,
  lineData: LineData
): string[] => {
  return lineData
    .filter(({ participantName }) =>
      pName === "all" ? true : participantName === pName
    )
    .map(({ coordinatesArray }) => coordinatesArray)
    .flat(1);
};

const getTargetArrayByParticipant = (
  pName: ParticipantNameOrAll,
  lineData: LineData
): string[] => {
  return lineData
    .filter(({ participantName }) =>
      pName === "all" ? true : participantName === pName
    )
    .map(({ targetArray }) => targetArray)
    .flat(1);
};

const getCoordsArrayFromCoordsString = (
  coordsString: string
): CoordinatesArray => {
  return coordsString
    .split("-")
    .reduce((previousValue: string[], coordsString: string) => {
      // coordsString could be like: `B1` or `BC1` or `B15` or `BC15`;
      const rows = coordsString
        .split("")
        .filter(character => ROWS.includes(character));

      const columns = coordsString
        .split("")
        .filter(character => COLUMNS.includes(character));

      let coordinates: string[] = [];
      rows.forEach(row => {
        columns.forEach(column => {
          // coordinates.push({ row, column }) // if we want an object
          coordinates.push(`${column}${row}`);
        });
      });
      return [...previousValue, ...coordinates];
    }, []);
};

const getData = () => {
  const lineData: LineData = dataString
    .split("\n")
    .map((lineString, lineIndex) => {
      return lineString
        .split(/(\s+)/) // separate into an array of strings (split by whitespace)
        .filter(s => /REDACTED_NAME/g.test(s) === false) // filter out redacted names
        .filter(s => (s.includes("(") || s.includes(")")) === false) // coords don't contain parentheses
        .filter(s => /([A-J])/gi.test(s) === true) // coords contain letters A-J
        .filter(s => /([1-6])/gi.test(s) === true) // coords contain numbers 1-6
        .map(s => s.replace(/-+/g, "-")) // remove duplicate "-" characters
        .map(s => s.replace(/^-+/, "")) // remove leading "-" characters
        .map((coordinatesString: string) => {
          const lineNumber: number = lineIndex + 1;
          const participantName: ParticipantName = getParticipantNameFromLineNumber(
            lineNumber
          );
          const coordinatesArray: CoordinatesArray = getCoordsArrayFromCoordsString(
            coordinatesString
          );
          const targetString: string =
            lineString
              .split(/(\s+)/) // separate into an array of strings (split by whitespace)
              .filter(s => s.startsWith("(") && s.endsWith(")")) // target string is in parentheses
              .map(str => str.replace("(", "").replace(")", ""))
              .find(str => !!str) || "";
          const targetArray: CoordinatesArray = getCoordsArrayFromCoordsString(
            targetString
          );

          console.log(`TARGET STRING: `, targetString);
          console.log(`TARGET ARRAY: `, targetArray);

          return {
            targetString,
            targetArray,
            coordinatesArray,
            coordinatesString,
            lineNumber,
            lineString,
            participantName
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
    p1Target: [...getTargetArrayByParticipant("p1", lineData)],
    p2: [...getCoordsArrayByParticipant("p2", lineData)],
    p2Target: [...getTargetArrayByParticipant("p2", lineData)],
    p3: [...getCoordsArrayByParticipant("p3", lineData)],
    p3Target: [...getTargetArrayByParticipant("p3", lineData)],
    p4: [...getCoordsArrayByParticipant("p4", lineData)],
    p4Target: [...getTargetArrayByParticipant("p4", lineData)],
    all: [...getCoordsArrayByParticipant("all", lineData)],
    allTarget: [...getTargetArrayByParticipant("all", lineData)]
  };

  return {
    lineData,
    dataByParticipant
  };
};

export default getData;
