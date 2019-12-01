export type ParticipantName = "p1" | "p2" | "p3" | "p4";
export type ParticipantNameOrAll = ParticipantName | "all";
export type CoordinatesArray = string[];

export interface LineObject {
  targetString: string;
  targetArray: CoordinatesArray;
  coordinatesArray: CoordinatesArray;
  coordinatesString: string;
  lineNumber: number;
  lineString: string;
  participantName: ParticipantName;
}

export type LineData = LineObject[];

export interface DataByParticipant {
  p1: string[];
  p2: string[];
  p3: string[];
  p4: string[];
  all: string[];
  p1Target: string[];
  p2Target: string[];
  p3Target: string[];
  p4Target: string[];
  allTarget: string[];
}

export interface CoordinatesFrequencyCount {
  A1: number;
  A2: number;
  A3: number;
  A4: number;
  A5: number;
  A6: number;
  B1: number;
  B2: number;
  B3: number;
  B4: number;
  B5: number;
  B6: number;
  C1: number;
  C2: number;
  C3: number;
  C4: number;
  C5: number;
  C6: number;
  D1: number;
  D2: number;
  D3: number;
  D4: number;
  D5: number;
  D6: number;
  E1: number;
  E2: number;
  E3: number;
  E4: number;
  E5: number;
  E6: number;
  F1: number;
  F2: number;
  F3: number;
  F4: number;
  F5: number;
  F6: number;
  G1: number;
  G2: number;
  G3: number;
  G4: number;
  G5: number;
  G6: number;
  H1: number;
  H2: number;
  H3: number;
  H4: number;
  H5: number;
  H6: number;
  I1: number;
  I2: number;
  I3: number;
  I4: number;
  I5: number;
  I6: number;
  J1: number;
  J2: number;
  J3: number;
  J4: number;
  J5: number;
  J6: number;
}
