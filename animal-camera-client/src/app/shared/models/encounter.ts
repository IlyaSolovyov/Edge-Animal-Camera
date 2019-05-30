import { Detection } from './detection';

export class Encounter {
  id: number;
  timestamp: Date;
  detections: Detection[];
  resultImageBase64: string;

  constructor(id: number, timestamp: Date, detections: Detection[], resultImageBase64: string = "") {
    this.id = id;
    this.timestamp = timestamp;
    this.detections = detections;
    this.resultImageBase64 = resultImageBase64;
  }
}
