export type ParticipantName = "p1" | "p2" | "p3" | "p4";
export type ParticipantNameOrAll = ParticipantName | "all";
export type CoordinatesArray = string[];

export interface LineObject {
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
}
