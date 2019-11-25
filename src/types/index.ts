export interface LineObject {
  coordinatesArray: string[];
  coordinatesString: string;
  lineNumber: number;
  lineString: string;
  participantName: "p1" | "p2" | "p3" | "p4";
}

export type LineData = LineObject[];

export interface DataByParticipant {
  p1: string[];
  p2: string[];
  p3: string[];
  p4: string[];
  all: string[];
}
